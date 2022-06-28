import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Product } from '@prisma/client';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductsDto } from './dto/find-products.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';
// import { File } from './types/file';

/** Exposes product CRUD endpoints */
@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: 'Admin creates a new product' })
  @Post()
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  @ApiOperation({ summary: 'Returns all products' })
  @Get()
  findAll(@Query() findAllProductsDto: FindProductsDto): Promise<Product[]> {
    return this.productService.findAll(findAllProductsDto);
  }

  @ApiOperation({ summary: 'Admin gets product by ID' })
  @Get('/id/:id')
  findOneById(@Param('id') id: string): Promise<Product> {
    return this.productService.findOneById(id);
  }

  @ApiOperation({ summary: 'Gets product by urlName' })
  @Get(':urlName')
  findOneByUrlName(@Param('urlName') urlName: string): Promise<Product> {
    return this.productService.findOneByUrlName(urlName);
  }

  // @ApiOperation({ summary: 'Admin uploads a new product picture' })
  // @Patch('picture/:id')
  // uploadPhoto(
  //   @Param('id') id: string,
  //   @UploadedFile() file: File,
  // ): Promise<Product> {
  //   return this.productService.uploadPicture(id, file);
  // }

  @ApiOperation({ summary: 'Admin updates product' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.update(id, updateProductDto);
  }

  @ApiOperation({ summary: 'Admin deletes product' })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.productService.remove(id);
  }
}
