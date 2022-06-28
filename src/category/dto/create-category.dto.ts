import { Category } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto implements Omit<Category, 'id'> {
  @IsString()
  @IsNotEmpty()
  name: string;
}
