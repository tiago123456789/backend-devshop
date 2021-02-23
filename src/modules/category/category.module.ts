import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommonModule } from "../common/common.module";
import Category from "./category.entity";
import CategoryResolver from "./category.resolver";
import CategoryService from "./category.service";

@Module({
    imports: [CommonModule, TypeOrmModule.forFeature([Category])],
    controllers: [],
    providers: [CategoryService, CategoryResolver],
  })
  export class CategoryModule {}