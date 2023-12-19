// Modules
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { MovieModule } from './movie/movie.module';
import { UserModule } from './user/user.module';
// Guard
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common/guards';
import { CategoryController } from './category/category.controller';
import { CategoryService } from './category/category.service';
import { CategoryModule } from './category/category.module';


@Module({
  imports: [
    AuthModule,
    PrismaModule,
    MovieModule,
    UserModule,
    CategoryModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    CategoryService,
  ],
  controllers: [CategoryController],
})
export class AppModule { }
