import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedditModule } from './reddit/reddit.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.rgnap.mongodb.net/${process.env.MONGO_COLLECTION}`),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    RedditModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
