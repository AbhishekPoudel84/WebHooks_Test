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
  // async handleWebhookEvent(
  //   @Req() req: Request,
  //   @Res() res: Response,
  // ): Promise<void> {
  handleWebhook(@Body() data: any, @Req() req: Request): string {
    // console.log(
    //   `The changes were made by ${data.sender.login} and the user url is ${data.sender.url}.`,
    // );
    // try {
    //   const event = req.headers['x-github-event'];
    //   if (event === 'push') {
    //     const payload = req.body;
    //     console.log(payload.sender.login)
    // }
    // catch (e) {
    //   return {
    //     message: 'An error occured'
    //   }
    // }
    // console.log(data);
    try {
      const event = req.headers['x-github-event'];
      console.log(
        '🚀 ~ file: app.controller.ts:36 ~ handleWebhook ~ req:',
        req.headers,
      );
      // const hasKey = data.hasOwnProperty('issue');

      if (event === 'issues') {
        const action = data.action;
        const repoName = data.repository.name;
        const title = data.issue.title;
        const assignee = data.issue.assignee;
        const url = data.issue.html_url;
        console.log(
          `The issue was ${action} in the repository ${repoName}. The issue is ${title} ${url} and assigneed to ${assignee}.`,
        );
      } else if (event === 'create') {
        const ref = data.ref;
        const ref_type = data.ref_type;
        const master_branch = data.master_branch;
        const description = data.description;
        const repo_name = data.repository.name;
        const url = data.repository.html_url;
        const created_at = data.repository.created_at;
        const sender = data.sender.login;
        const senderUrl = data.sender.html_url;

        console.log(
          `${ref} was created by ${sender} ${senderUrl} at ${created_at} under ${master_branch} with the description ${description}. The ${ref_type} can be found in repository ${repo_name} ${url}`,
        );
      } else if (event === 'delete') {
        //console.log(data);
        const ref = data.ref;
        const ref_type = data.ref_type;
        const repo_name = data.repository.name;
        const repoUrl = data.repository.html_url;
        console.log(
          `The ${ref_type} : ${ref} was deleted from repository ${repo_name} ${repoUrl}`,
        );
      } else if (event === 'push') {
        console.log(data);
      }
    } catch (e) {}
    return 'Received!';
  }
}
