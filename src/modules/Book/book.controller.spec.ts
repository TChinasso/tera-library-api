import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './book.controller';
import { BooksService } from './book.service';
import { getModelToken } from '@nestjs/mongoose';
import { Book, BooksSchema } from './book.schema';
import { Connection, connect, Model } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

describe('BookController', () => {
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let booksController: BooksController;
  let booksService: BooksService;
  let bookModel: Model<Book>;
  const BookDTOStub: Book = {
    name: 'Vagabond',
    author: 'Takehiko Inoue',
    description:
      "Vagabond is a Japanese epic martial arts manga series written and illustrated by Takehiko Inoue. It portrays a fictionalized account of the life of Japanese swordsman Musashi Miyamoto, based on Eiji Yoshikawa's novel Musashi. It has been serialized in Kodansha's seinen manga magazine Weekly Morning since September 1998, with its chapters collected into 37 tankōbon volumes as of July 2014. Viz Media licensed the series for English release in North America and has published 37 volumes as of April 2015. The series is currently in an extended hiatus, with the latest chapter released in May 2015. Vagabond won a 2000 Kodansha Manga Award and the 2002 Tezuka Osamu Cultural Prize, and has sold more than 82 million copies worldwide, making it one of the best-selling manga series.",
    cover_picture:
      'https://upload.wikimedia.org/wikipedia/en/thumb/c/cf/Vagabond21.jpg/220px-Vagabond21.jpg',
    category: 'Manga',
    stock: '3',
    users_who_liked: ['Julio', 'Paula'],
  };

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    bookModel = mongoConnection.model(Book.name, BooksSchema);
    const app = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        BooksService,
        { provide: getModelToken('Book'), useValue: bookModel },
      ],
    }).compile();

    booksController = app.get<BooksController>(BooksController);
    booksService = app.get<BooksService>(BooksService);
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  });

  afterEach(async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  describe('createBook', () => {
    it('should return the saved book and be equals the stub', async () => {
      const createdBook = await booksService.createBook(BookDTOStub);
      expect(createdBook.name).toBe(BookDTOStub.name);
    });
  });

  describe('getBooks', () => {
    it('should return the list of books', async () => {
      await new bookModel(BookDTOStub).save();
      const { data: listOfBooks } = await booksService.findBooks({
        limit: 1000,
        page: 1,
      });
      const CreatedBookStub = listOfBooks.find(
        (book) => book.name == BookDTOStub.name,
      );
      expect(CreatedBookStub.name).toBe(BookDTOStub.name);
    });
  });

  describe('getBookById', () => {
    it('should return a book by id', async () => {
      const createdBook = await new bookModel(BookDTOStub).save();
      const book = await booksService.findBookById(createdBook.id);
      expect(book.name).toBe(BookDTOStub.name);
    });
  });

  describe('deleteBookById', () => {
    it('should delete a book by id', async () => {
      const createdBook = await new bookModel(BookDTOStub).save();
      const deleted = await booksService.deleteBook(createdBook.id);
      expect(deleted.name).toBe(createdBook.name);
    });
  });

  describe('updateBook', () => {
    it('should delete a book by id', async () => {
      const createdBook = await new bookModel(BookDTOStub).save();
      const newBookData: Book = { ...BookDTOStub, ...{ name: 'new' } };
      const updatedBook = await booksService.updateBook(
        createdBook.id,
        newBookData,
      );
      expect(updatedBook.name).toBe('new');
    });
  });
});
