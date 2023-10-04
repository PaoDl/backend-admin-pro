import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Species } from './species.entity';
import { capitalizeWords } from 'src/core';

@Entity('biome')
export class Biome {
  @PrimaryGeneratedColumn('uuid')
  biome_id: string;

  @Column('text', {
    unique: true,
  })
  name: string;

  @Column('text')
  image_url: string;

  @OneToMany(() => Species, (species) => species.biome)
  species: Species[];

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @BeforeInsert()
  checkFieldsBeforeInsert(): void {
    this.name = capitalizeWords(this.name);
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate(): void {
    this.checkFieldsBeforeInsert();
  }
}
