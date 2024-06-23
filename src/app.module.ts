import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksModule } from './modules/Book/book.module';

@Module({
  imports: [MongooseModule.forRoot(process.env.DATABASE_URL),
    BooksModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
