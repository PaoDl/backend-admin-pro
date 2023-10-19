import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Biome } from '../entities/biome.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBiomeDto } from '../dto';
import { MyResponse } from 'src/core';
import { Repository } from 'typeorm';
import { handleDBErrors } from 'src/core';

@Injectable()
export class BiomeService {
  constructor(
    @InjectRepository(Biome)
    private readonly biomeRepository: Repository<Biome>,
  ) {}

  async create(createBiomeDto: CreateBiomeDto): Promise<MyResponse<Biome>> {
    const { name, image_url } = createBiomeDto;

    const biomeVerification = await this.biomeRepository.findOne({
      where: { name },
    });

    if (biomeVerification)
      throw new BadRequestException(`El Bioma ${name} ya existe`);

    try {
      const biome = this.biomeRepository.create({
        name,
        image_url,
      });

      await this.biomeRepository.save(biome);

      const response: MyResponse<Biome> = {
        statusCode: 201,
        status: 'Created',
        message: `El Bioma ${name} fue creada exitosamente`,
        reply: biome,
      };

      return response;
    } catch (error) {
      console.log(error);
      handleDBErrors(error);
    }
  }
  async getBiome(biome_id: string): Promise<MyResponse<Biome>> {
    const biome = await this.biomeRepository.findOne({
      where: { biome_id },
      relations: ['species'],
    });

    if (!biome) throw new NotFoundException(`El Bioma #${biome_id} no existe`);

    const response: MyResponse<Biome> = {
      statusCode: 200,
      status: 'OK',
      message: `El Bioma #${biome_id} fue encontrado exitosamente`,
      reply: biome,
    };

    return response;
  }

  async findAll() {
    const biomes: Biome[] = await this.biomeRepository.find({});
    const response: MyResponse<Biome[]> = {
      statusCode: 200,
      status: 'OK',
      message: 'Lista de Biomas',
      reply: biomes,
    };
    return response;
  }
  catch(error) {
    handleDBErrors(error);
  }
}
