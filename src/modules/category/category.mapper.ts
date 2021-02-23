import WrapperInterface from "../common/mappers/mapper.interface";
import CategoryEntity from './category.entity';
import CategoryInput from "./dto/category.input";

export default class CategoryMapper 
implements WrapperInterface<CategoryInput, CategoryEntity> {

    toEntity(input: CategoryInput): CategoryEntity {
        const entity: CategoryEntity = new CategoryEntity();
        entity.name = input.name;
        entity.slug = input.slug;
        return entity;
    }

}