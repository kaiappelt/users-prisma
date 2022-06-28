import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindProductsDto } from '../product/dto/find-products.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { FindCategoriesDto } from './dto/find-categories.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const name = this.capitalizeOnlyFirstLetter(createCategoryDto.name);

    const category = await this.prisma.category.create({
      data: { ...createCategoryDto, name },
    });

    return category;
  }

  async findAll({
    categoryName = '',
    page = 1,
    offset = 10,
  }: FindCategoriesDto): Promise<Category[]> {
    const categoriesToSkip = (page - 1) * offset;

    return this.prisma.category.findMany({
      skip: categoriesToSkip,
      take: offset,
      where: {
        name: { contains: categoryName },
      },
      orderBy: { name: 'asc' },
    });
  }

  async findOneById(
    id: string,
    { productName = '', page = 1, offset = 10 }: FindProductsDto,
  ): Promise<Category> {
    const productsToSkip = (page - 1) * offset;

    const category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        products: {
          select: { id: true, name: true, urlName: true, picture: true },
          where: { name: { contains: productName } },
          skip: productsToSkip,
          take: offset,
        },
      },
      rejectOnNotFound: true,
    });

    return category;
  }

  async findOneByName(
    name: string,
    { productName = '', page = 1, offset = 10 }: FindProductsDto,
  ): Promise<Category> {
    const productsToSkip = (page - 1) * offset;

    name = this.capitalizeOnlyFirstLetter(name);

    const category = await this.prisma.category.findUnique({
      where: { name },
      include: {
        products: {
          select: { id: true, name: true, urlName: true, picture: true },
          where: { name: { contains: productName } },
          skip: productsToSkip,
          take: offset,
        },
      },
      rejectOnNotFound: true,
    });

    return category;
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    if (updateCategoryDto.name) {
      return this.updateCategoryAndName(id, updateCategoryDto);
    }

    const category = await this.prisma.category.update({
      where: { id },
      data: { ...updateCategoryDto },
    });

    return category;
  }

  async remove(id: string): Promise<void> {
    await this.prisma.category.delete({ where: { id } });
  }

  private capitalizeOnlyFirstLetter(name: string): string {
    return name[0].toUpperCase() + name.substring(1).toLocaleLowerCase();
  }

  private updateCategoryAndName(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const name = this.capitalizeOnlyFirstLetter(updateCategoryDto.name);

    return this.prisma.category.update({
      where: { id },
      data: { ...updateCategoryDto, name },
    });
  }
}
