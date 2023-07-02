import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('github')
  handleWebHookdeafult(@Body() body) {
    console.log('Hello World');
    console.log(body);
    return body;
  }
  // @Controller('webhook')
  // export class WebhookController {
  //   @Post()
  //   handleWebhookEvent(@Req() req: Request, @Res() res: Response): void {
  //     const event = req.headers['x-github-event'];
  //     if (event === 'push') {
  //       const payload = req.body;
  //       // Process the payload as per your requirements
  //       const repository = payload.repository.name;
  //       const commits = payload.commits;
  //       commits.forEach((commit: any) => {
  //         const sha = commit.id;
  //         const message = commit.message;
  //         // Do something with the commit information, e.g., update your website
  //       });

  //       // Respond with a success status
  //       res.status(200).json({ message: 'Webhook received successfully' });
  //     } else {
  //       // Ignore other events
  //       res.status(200).json({ message: 'Ignored' });
  //     }
  //   }
  // }
}
