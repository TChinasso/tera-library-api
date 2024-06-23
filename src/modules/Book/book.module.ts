
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksController } from './book.controller';
import { BooksService } from './book.service';
import { BooksSchema } from './book.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Book', schema: BooksSchema }])
  ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}