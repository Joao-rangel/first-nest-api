import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      message: 'Hello! Check the api docs.',
      link: 'https://joao-rangel.github.io/ts-nest-api',
    };
  }
}
