// livros.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './book.schema';
import { FindBooksSchema, PaginationResult } from './book.interfaces';

@Injectable()
export class BooksService {
  constructor(@InjectModel('Book') private readonly bookModel: Model<Book>) {}

  async createBook(book: Book): Promise<Book> {
    const newBook = new this.bookModel(book);
    return await newBook.save();
  }

  async findBooks(
    searchParams: FindBooksSchema,
  ): Promise<PaginationResult<Book> | null> {
    const { limit, page, inStock, order = 'id', search } = searchParams;
    function buildQueryParams() {
      const query: any = {};
      const skip: number = (page - 1) * limit;
      const sort: string = order
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { category: { $regex: search, $options: 'i' } },
          { author: { $regex: search, $options: 'i' } },
        ];
      }
      if (Boolean(inStock)) query.stock = { $gt: 0 };
      return { query, skip, sort };
    }
    
    console.log(buildQueryParams());
    const { query, skip, sort } = buildQueryParams();

    const [data, total] = await Promise.all([
      this.bookModel.aggregate([
        { $match: query },
        { $addFields: { likes: { $size: '$users_who_liked' } } },
        { $sort:  { [sort] : sort == 'name' ? 1 : -1}},
        { $skip: skip },
        { $limit: limit },
      ]).exec(),
      this.bookModel.countDocuments(query),
    ]);

    return {
      data: data,
      totalItems: total,
      page: page,
      limit: limit,
    };
  }

  async findBookById(id: string): Promise<Book> {
    return await this.bookModel.findById(id).exec();
  }

  async updateBook(id: string, livro: Book): Promise<Book> {
    return await this.bookModel.findByIdAndUpdate(id, livro, { new: true });
  }

  async deleteBook(id: string): Promise<Book> {
    return await this.bookModel.findByIdAndDelete(id);
  }
}
