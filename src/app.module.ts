import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'mysql',
      url: process.env.DATABASE_URL,
      entities: [],
      synchronize: process.env.NODE_ENV === 'development' ? true : false,
    }),
  imports: [],
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
