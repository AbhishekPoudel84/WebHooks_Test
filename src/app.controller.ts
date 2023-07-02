import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/git-webhook')
  handleWebhook(@Body() body: any): string {
    console.log(body);
    return 'Received!';
  }
}
