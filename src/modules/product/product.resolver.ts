import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import Product from './dto/product'
import ProductService from './product.service'
import ProductInput from './dto/product.input'
import ProductId from './dto/productId.dto'
import Category from '../category/dto/category'
import ProductMapper from './product.mapper'

@Resolver(of => Product)
export default class ProductResolver {
  constructor(private readonly productService: ProductService) { }

  @Query(returns => [Product], { name: 'getAll' })
  async getAll(): Promise<Product[]> {
    const products = await this.productService.findAll();
    const productsToReturn: Product[] = products.map(product => {
      const productToReturn = new Product()
      productToReturn.id = product._id;
      productToReturn.description = product.description;
      productToReturn.slug = product.slug;
      productToReturn.name = product.name;
      productToReturn.price = product.price;
      const category = product.category;
      if (category) {
        // @ts-ignore
        productToReturn.category = { id: category._id, name: category.name };
      }
      return productToReturn
    })
    return productsToReturn
  }


  @Query(returns => Product, { name: 'getById' })
  async getById(@Args('id') id: string): Promise<Product> {
    const product = await this.productService.findById(id)

    const productToReturn = new Product()
    productToReturn.id = product._id;
    productToReturn.description = product.description;
    productToReturn.slug = product.slug;
    productToReturn.name = product.name;
    productToReturn.price = product.price;
    const category = product.category;
    if (category) {
      // @ts-ignore
      productToReturn.category = { id: category._id, name: category.name };
    }
    return productToReturn;
  }

  @Mutation(returns => Boolean, { name: 'deleteProduct' })
  async delete(@Args('id') id: string): Promise<Boolean> {
    await this.productService.remove(id);
    return true;
  }

  @Mutation(returns => Boolean, { name: 'createProduct' })
  async create(@Args('input') input: ProductInput): Promise<Boolean> {
    const product = new ProductMapper().toEntity(input);
    await this.productService.create(product);
    return true;
  }

  @Mutation(returns => Boolean, { name: 'updateProduct' })
  async update(@Args('id') id: string, @Args('input') input: ProductInput): Promise<Boolean> {
    // @ts-ignore
    input.id = id;
    const product = new ProductMapper().toEntity(input);
    await this.productService.update(id, product);
    return true;
  }
}
