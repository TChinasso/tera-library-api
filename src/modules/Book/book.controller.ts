import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { BooksService } from './book.service';
import { Book } from './book.schema';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  async createBook(@Body() book: Book): Promise<Book> {
    return this.booksService.createBook(book);
  }

  @Get()
  async getBooks(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search: string,
    @Query('order') order: string,
    @Query('inStock') inStock: boolean,
  ) {
    return this.booksService.findBooks({
      page: page,
      limit: Number(limit),
      search: search,
      order: order,
      inStock: inStock
    });
  }

  @Get(':id')
  async getBookById(@Param('id') id: string): Promise<Book> {
    return this.booksService.findBookById(id);
  }

  @Put(':id')
  async updateBook(@Param('id') id: string, @Body() book: Book): Promise<Book> {
    return this.booksService.updateBook(id, book);
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: string): Promise<Book> {
    return this.booksService.deleteBook(id);
  }
}
