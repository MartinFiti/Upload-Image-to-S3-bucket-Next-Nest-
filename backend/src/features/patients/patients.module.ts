import { Module } from '@nestjs/common';
import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from 'src/entities/patient.entity';
import { DmsService } from '../dms/dms.service';

@Module({
  imports: [TypeOrmModule.forFeature([Patient])],
  controllers: [PatientsController],
  providers: [PatientsService, DmsService]
})
export class PatientsModule {}
