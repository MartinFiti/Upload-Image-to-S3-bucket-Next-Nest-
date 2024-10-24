import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Patient } from 'src/entities/patient.entity';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { DeleteResult } from 'typeorm';

@Controller('patients')
export class PatientsController {

  constructor(private _patientsService : PatientsService ) {}

  @Get()
  async findAll(): Promise<Patient[]> {
    return this._patientsService.getAllPatients();
  }

  @Post('')
  async createPatient(
    @Body() newPatient: CreatePatientDto
  ): Promise<Patient> {
    return this._patientsService.createPatient(newPatient);
  }

  @Delete(':uuid')
  async deletePatient(
    @Param('uuid') uuid: string
  ): Promise<DeleteResult> {
    return this._patientsService.deletePatient(uuid);
  }
}
