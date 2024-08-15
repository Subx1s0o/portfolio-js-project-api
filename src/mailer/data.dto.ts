import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class IEmailData {
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email should not be empty' })
  email: string;

  @IsNotEmpty({ message: 'Comment should not be empty' })
  @IsString({ message: 'Comment Should be a string' })
  comment: string;
}
