import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import CategoryService from "./category.service";
import CategoryWrapper from "./category.mapper";
import Category from "./dto/category";
import CategoryInput from "./dto/category.input";

@Resolver(() => Category)
export default class CategoryResolver {

    constructor(private readonly categoryService: CategoryService) { }

    // @ts-ignore
    @Query(returns => [Category], { name: 'getAllCategories' })
    async getAllCategories(): Promise<Category[]> {
        const categories = await this.categoryService.findAll();
        return categories.map(item => {
            const category = new Category();
            category.id = item._id;
            category.name = item.name;
            category.slug = item.slug;
            return category;
        });
    }

    @Query(returns => Category, { name: 'getCategoryById' })
    async getCategoryById(@Args("id") id: string): Promise<Category> {
        const category = await this.categoryService.findById(id);
        return {
            id: category.id, name: category.name, slug: category.slug
        };
    }


      @Mutation(returns => Boolean, { name: 'deleteCategory' })
      async deleteCategory(@Args('id') id: string): Promise<Boolean> {
        await this.categoryService.remove(id);
        return true;
      }

      @Mutation(returns => Boolean, { name: 'createCategory' })
      async createCategory(@Args('input') input: CategoryInput): Promise<Boolean> {
        await this.categoryService.create(new CategoryWrapper().toEntity(input));
        return true;
      }

      @Mutation(returns => Boolean, { name: 'updateCategory' })
      async updateCategory(@Args('id') id: string, @Args('input') input: CategoryInput): Promise<Boolean> {
        const datasModified = new CategoryWrapper().toEntity(input);
        // @ts-ignore
        await this.categoryService.update(id, datasModified);
        return true;
      }
}
