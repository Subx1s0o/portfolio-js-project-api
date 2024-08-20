import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { IEmailData } from './data.dto';
import { MailerService } from './mailer.service';

@Controller()
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post()
  async sendMail(@Body() data: IEmailData, @Res() res: Response) {
    try {
      await this.mailerService.sendRequestEmail(data);
      await this.mailerService.sendResponseEmail(data);
      return res.status(HttpStatus.OK).json({
        title: 'Thank you for your interest in cooperation!',
        message:
          'The manager will contact you shortly to discuss further details and opportunities for cooperation. Please stay in touch.',
      });
    } catch (error) {
      console.error('Error sending emails:', error);
      throw new HttpException(
        'Failed to send emails',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
