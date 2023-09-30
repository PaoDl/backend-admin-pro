import { Module } from '@nestjs/common';
import { AnimalsService } from './services/animals.service';
import { AnimalsController } from './controllers/animals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Animal } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Animal])],
  controllers: [AnimalsController],
  providers: [AnimalsService],
})
export class AnimalsModule {}
