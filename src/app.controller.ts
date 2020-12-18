import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  iamlive(): string {
    return '<h1>Nest is living...</h1>';
  }
}
