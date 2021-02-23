import Category from "../category/category.entity";
import MapperInterface from "../common/mappers/mapper.interface";
import ProductInput from "./dto/product.input";
import { Product } from "./product.entity";

export default class ProductMapper implements MapperInterface<ProductInput, Product> {

    toEntity(input: ProductInput): Product {
        const category = new Category();
        const entity = new Product();
        // @ts-ignore
        entity._id = input.id;
        entity.description = input.description;
        entity.slug = input.slug;
        entity.price = input.price;
        entity.name = input.name;
        category.name = input.categoryName;
        category._id = input.categoryId;
        entity.category = category;
        return entity;
    }

}