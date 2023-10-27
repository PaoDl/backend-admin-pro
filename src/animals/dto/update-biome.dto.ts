import { PartialType } from '@nestjs/mapped-types';
import { CreateBiomeDto } from './create-biome.dto';

export class UpdateBiomeDto extends PartialType(CreateBiomeDto) {}
