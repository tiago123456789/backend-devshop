import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../common/common.module';
import { Product } from './product.entity';
import ProductResolver from './product.resolver';
import ProductService from './product.service';

@Module({
    imports: [CommonModule, TypeOrmModule.forFeature([Product])],
    providers: [ProductResolver, ProductService],
  })
  export class ProductModule {}