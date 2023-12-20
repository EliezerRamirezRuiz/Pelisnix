// Modules
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { MovieModule } from './movie/movie.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { GenderModule } from './gender/gender.module';
// Guard
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common/guards';
import { AuthorController } from './author/author.controller';
import { AuthorService } from './author/author.service';
import { AuthorModule } from './author/author.module';


@Module({
  imports: [
    AuthModule,
    PrismaModule,
    MovieModule,
    UserModule,
    CategoryModule,
    GenderModule,
    AuthorModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    AuthorService,
  ],
  controllers: [AuthorController],

})
export class AppModule { }
