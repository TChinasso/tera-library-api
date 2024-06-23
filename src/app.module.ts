import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksModule } from './modules/Book/book.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://admin:S8YpRUJCeIEduR8M@tera-library.7uq3vw4.mongodb.net/?retryWrites=true&w=majority&appName=tera-library'),
    BooksModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
