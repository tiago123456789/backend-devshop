import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MongoRepository } from "typeorm";
import NotFoundException from "../common/exceptions/NotFoundException";
import { Product } from "./product.entity";

@Injectable()
export default class ProductService {

    constructor(
        @InjectRepository(Product)
        private readonly repository: MongoRepository<Product>,
    ) { }

    findAll(): Promise<any[]> {
        return this.repository.find();
    }

    async findById(id: string): Promise<any> {
        const item = await this.repository.findOne(id);
        if (!item) {
            throw new NotFoundException("Product not found.");
        }
        return item;
    }

    create(product: Product): Promise<any> {
        return this.repository.insert(product);
    }

    async remove(id: string): Promise<any> {
        const entity: Product = await this.findById(id);
        if (!entity) return;
        return this.repository.remove(entity);
    }

    async update(id: string, product: Product): Promise<any> {
        await this.findById(id);
        return this.repository.updateOne({ _id: id}, { $set: product });
    }
}