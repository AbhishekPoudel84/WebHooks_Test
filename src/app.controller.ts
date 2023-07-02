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
  handleWebhook(@Body() data: any): string {
    console.log(data.sender.login);
    return 'Received!';
  }
}
