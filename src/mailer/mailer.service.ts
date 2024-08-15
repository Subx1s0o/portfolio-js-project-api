import { MailerService as NodeMailer } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as process from 'process';
import { renderMjmlFileToHtml } from '../../utils/mjml';

interface IData {
  email: string;
  message: string;
}

@Injectable()
export class MailerService {
  constructor(private readonly mailerService: NodeMailer) {}

  async sendRequestEmail(data: IData) {
    const mjmlFilePath = path.resolve(
      process.cwd(),
      'templates',
      'request.mjml',
    );

    const htmlContent = renderMjmlFileToHtml(mjmlFilePath, {
      email: data.email,
      message: data.message,
    });

    try {
      await this.mailerService.sendMail({
        to: process.env.BOSS_EMAIL,
        from: process.env.EMAIL_SENDER,
        subject: 'Request Received',
        html: htmlContent,
      });
    } catch (error) {
      console.error('Error sending request email:', error);
      throw new BadRequestException('Cant send Request Email, try later');
    }
  }

  async sendResponseEmail(data: IData) {
    const mjmlFilePath = path.resolve(
      process.cwd(),
      'templates',
      'response.mjml',
    );

    const htmlContent = renderMjmlFileToHtml(mjmlFilePath, {
      email: data.email,
      message: data.message,
    });

    try {
      await this.mailerService.sendMail({
        to: data.email,
        from: process.env.EMAIL_SENDER,
        subject: 'Request Received',
        html: htmlContent,
      });
    } catch (error) {
      console.error('Error sending response email:', error);
      throw new BadRequestException('Cant send Response Email, try later');
    }
  }
}