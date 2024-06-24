import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BookDocument = HydratedDocument<Book>;

@Schema()
export class Book {
  @Prop()
  name: string;

  @Prop()
  author: string;

  @Prop()
  description: string;

  @Prop()
  cover_picture: string;

  @Prop()
  category: string;

  @Prop()
  stock: number;

  @Prop()
  users_who_liked: string[];
}

export const BooksSchema = SchemaFactory.createForClass(Book);