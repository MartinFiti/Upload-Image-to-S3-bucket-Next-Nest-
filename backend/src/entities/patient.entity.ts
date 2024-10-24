import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';
import { EntityWithTimestamps } from './shared/entity-with-timestamps';

@Entity('patients')
export class Patient extends EntityWithTimestamps {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('uuid', {
    comment: 'Patient UUID.',
    nullable: false,
  })
  @Generated('uuid')
  uuid: string;

  @Column('varchar', {
    length: 255,
    nullable: false,
    name: 'name',
  })
  name: string;

  @Column('varchar', {
    length: 255,
    nullable: false,
    unique: true,
    name: 'email',
  })
  email: string;

  @Column('varchar', {
    length: 255,
    nullable: false,
    name: 'address',
  })
  address: string;

  @Column('varchar', {
    length: 4,
    nullable: false,
    name: 'phone_number_country_code',
  })
  phoneNumberCountryCode: string;

  @Column('varchar', {
    length: 15,
    nullable: false,
    name: 'phone_number',
  })
  phoneNumber: string;

  @Column('text', {
    nullable: false,
    name: 'document_photo',
  })
  documentPhoto: string;
}