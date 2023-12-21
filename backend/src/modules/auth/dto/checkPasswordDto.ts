import { IsNotEmpty, IsString } from 'class-validator';

export class CheckPasswordDTO {
  @IsNotEmpty()
  @IsString()
  password: string;
}
