import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
    controllers: [ MovieController ],
    providers: [ MovieService ],
})
export class MovieModule { };