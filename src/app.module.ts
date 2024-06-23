import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksModule } from './modules/Book/book.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(String(process.env.MONGODB_URI)),
    BooksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
