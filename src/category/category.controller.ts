import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Category } from '@prisma/client';
import { FindProductsDto } from '../product/dto/find-products.dto';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { FindCategoriesDto } from './dto/find-categories.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

/** Exposes category CRUD endpoints */
@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: 'Admin creates a new category' })
  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.create(createCategoryDto);
  }

  @ApiOperation({ summary: 'Returns all categories' })
  @Get()
  async findAll(
    @Query() findCategoriesDto: FindCategoriesDto,
  ): Promise<Category[]> {
    return this.categoryService.findAll(findCategoriesDto);
  }

  @ApiOperation({ summary: 'Admin gets category by ID and its products' })
  @Get('/id/:id')
  async findOneById(
    @Param('id') id: string,
    @Query() findProductsDto: FindProductsDto,
  ): Promise<Category> {
    return this.categoryService.findOneById(id, findProductsDto);
  }

  @ApiOperation({ summary: 'Returns category by name and its products' })
  @Get(':name')
  async findOneByName(
    @Param('name') name: string,
    @Query() findProductsDto: FindProductsDto,
  ): Promise<Category> {
    return this.categoryService.findOneByName(name, findProductsDto);
  }

  @ApiOperation({ summary: 'Admin updates category' })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    return await this.categoryService.update(id, updateCategoryDto);
  }

  @ApiOperation({ summary: 'Admin deletes category' })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.categoryService.remove(id);
  }
}
