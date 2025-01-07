import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('/send-email')
  async sendEmail(@Body() body: { email: string }): Promise<{ msg: string }> {
    return await this.appService.sendTestEmail(body.email);
  }
}
