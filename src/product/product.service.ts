import { Injectable } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductsDto } from './dto/find-products.dto';
import { UpdateProductDto } from './dto/update-product.dto';
// import { File } from './types/file';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const urlName = this.formatUrlName(createProductDto.name);

    const categories = this.connectCategoriesById(createProductDto.categories);

    const product = await this.prisma.product.create({
      data: {
        ...createProductDto,
        urlName,
        categories,
      },
      include: { categories: { select: { name: true } } },
    });

    return product;
  }

  // async uploadPicture(id: string, file: File): Promise<Product> {
  //   return this.prisma.product.update({
  //     where: { id },
  //     data: { picture: file.filename },
  //   });
  // }

  async findAll({
    productName = '',
    page = 1,
    offset = 10,
  }: FindProductsDto): Promise<Product[]> {
    const productsToSkip = (page - 1) * offset;

    return this.prisma.product.findMany({
      skip: productsToSkip,
      take: offset,
      where: {
        name: { contains: productName },
      },
      orderBy: { name: 'asc' },
      include: { categories: { select: { name: true } } },
    });
  }

  async findOneById(id: string): Promise<Product> {
    return this.prisma.product.findUnique({
      where: { id },
      include: { categories: { select: { name: true } } },
      rejectOnNotFound: true,
    });
  }

  async findOneByUrlName(urlName: string): Promise<Product> {
    return this.prisma.product.findUnique({
      where: { urlName },
      include: { categories: { select: { name: true } } },
      rejectOnNotFound: true,
    });
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    if (updateProductDto.name) {
      return this.updateProductAndUrlName(id, updateProductDto);
    }

    return this.prisma.product.update({
      where: { id },
      data: { ...updateProductDto },
    });
  }

  async remove(id: string): Promise<void> {
    await this.prisma.product.delete({ where: { id } });
  }
  private formatUrlName(name: string): string {
    const lowerCaseUrlName = name.toLocaleLowerCase();
    const trimmedUrlName = lowerCaseUrlName.trim();
    const singleSpaceUrlName = trimmedUrlName.replace(/\s\s+/g, ' ');
    const spaceToHyphenUrlName = singleSpaceUrlName.split(' ').join('-');

    return spaceToHyphenUrlName;
  }
  private updateProductAndUrlName(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const urlName = this.formatUrlName(updateProductDto.name);

    return this.prisma.product.update({
      where: { id },
      data: { ...updateProductDto, urlName },
    });
  }

  private connectCategoriesById(
    categories: string[],
  ): Prisma.CategoryUncheckedCreateNestedManyWithoutProductsInput {
    let categoriesConnection = { connect: [] };

    if (categories) {
      categoriesConnection = {
        connect: categories.map((category) => {
          return { id: category };
        }),
      };
    }

    return categoriesConnection;
  }
}
