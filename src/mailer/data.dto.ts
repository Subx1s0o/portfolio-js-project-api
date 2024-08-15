import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class IEmailData {
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email should not be empty' })
  email: string;

  @IsNotEmpty({ message: 'Message should not be empty' })
  @IsString({ message: 'Message Should be a string' })
  message: string;
}
