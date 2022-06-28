import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
// import * as redisStore from 'cache-manager-redis-store';
// import { APP_GUARD } from '@nestjs/core';
// import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    CacheModule.register({
      // store: redisStore,
      // socket: {
      //   host: 'localhost',
      //   port: 6379,
      // },
    }),
    ProductModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
