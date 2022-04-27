import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/animals')
  findAll(): string {
    return 'This action returns all animals';
  }
  getAnimal(): string {
    return this.appService.getHello();
  }
}