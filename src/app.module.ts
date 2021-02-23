import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './modules/product/product.module';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { CategoryModule } from './modules/category/category.module';

@Module({
  imports: [ProductModule, CategoryModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MONGODB_URL,
      entities: [join(__dirname, '**/**.entity{.ts,.js}')],
      synchronize: true,
      useNewUrlParser: true,
      logging: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      formatError: (err) => {
        const replyErrorBasedTypeError = {
          "NotFoundException": {
            statusCode: 404,
            error: err.message
          },
          "BusinessException": {
            statusCode: 408,
            error: err.message
          },
          "UnAuthenticatedException": {
            statusCode: 401,
            error: err.message
          },
          "UnAuthoratizedException": {
            statusCode: 403,
            error: err.message
          }
        }

        return replyErrorBasedTypeError[err.extensions.exception.name] || err;
      }
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

