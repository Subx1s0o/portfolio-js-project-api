import { MailerModule as NodeMailer } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { MailerController } from './mailer.controller';
import { MailerService } from './mailer.service';
@Module({
  imports: [
    ConfigModule,
    NodeMailer.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        port: 587,
        auth: {
          user: process.env.EMAIL_SENDER,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
    }),
  ],
  controllers: [MailerController],
  providers: [MailerService],
})
export class MailerModule {}
