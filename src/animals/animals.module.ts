import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AnimalsService, SpeciesService, BiomeService } from './services';
import {
  AnimalsController,
  SpeciesController,
  BiomeController,
} from './controllers';
import { Animal, Species, Biome } from './entities';
import { MedicalRecord } from './entities/medical_record.entity';
import { MedicalRecordService } from './services/medical_record.service';
import { MedicalRecordController } from './controllers/medical_record.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Animal, Species, Biome, MedicalRecord])],
  controllers: [
    AnimalsController,
    SpeciesController,
    BiomeController,
    MedicalRecordController,
  ],
  providers: [
    AnimalsService,
    SpeciesService,
    BiomeService,
    MedicalRecordService,
  ],
})
export class AnimalsModule {}
