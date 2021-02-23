import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MongoRepository } from "typeorm";
import NotFoundException from "../common/exceptions/NotFoundException";
import Category from "./category.entity";

@Injectable()
export default class CategoryService {

    constructor(
        @InjectRepository(Category)
        private readonly repository: MongoRepository<Category>,
    ) { }

    findAll(): Promise<any[]> {
        return this.repository.find();
    }

    async findById(id: string): Promise<any> {
        const item = await this.repository.findOne(id);
        if (!item) {
            throw new NotFoundException("Category not found.");
        }
        return item;
    }

    create(category: Category): Promise<any> {
        return this.repository.insert(category);
    }

    async remove(id: string): Promise<any> {
        const entity: Category = await this.findById(id);
        if (!entity) return;
        return this.repository.remove(entity);
    }

    async update(id: string, category: Category): Promise<any> {
        const entity: Category = await this.findById(id);
        if (!entity) return;
        if (category.name) entity.name = category.name;
        if (category.slug) entity.slug = category.slug;
        return this.repository.save(entity);
    }
}