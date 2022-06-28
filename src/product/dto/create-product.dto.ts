// import { OmitType } from '@nestjs/mapped-types';
// import { OmitType } from '@nestjs/swagger';
import { Product } from '@prisma/client';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductDto
  implements
    Omit<
      Product,
      | 'id'
      | 'urlName'
      | 'picture'
      | 'createdAt'
      | 'discountPercentage'
      | 'stock'
      | 'description'
    >
{
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  basePrice: number;

  @IsNumber()
  @IsOptional()
  discountPercentage?: number;

  @IsInt()
  @IsOptional()
  stock?: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  @IsArray()
  categories?: string[];
}
