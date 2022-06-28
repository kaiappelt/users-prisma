import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [CategoryController],
  imports: [PrismaModule],
  providers: [CategoryService],
})
export class CategoryModule {}
