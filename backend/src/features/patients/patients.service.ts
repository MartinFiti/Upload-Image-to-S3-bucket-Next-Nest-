import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from 'src/entities/patient.entity';
import { Repository } from 'typeorm';
import { CreatePatientDto } from './dto/create-patient.dto';
import { DmsService } from '../dms/dms.service';

@Injectable()
export class PatientsService {

  constructor(
    @InjectRepository(Patient)
    private _patientRepository : Repository<Patient>,
    private _dmsService: DmsService,
  ) {}

  getAllPatients() {
    return this._patientRepository.find();
  }

  async createPatient(patient: CreatePatientDto) {
    //first check if the patient email already exists
    const existingPatient = await this._patientRepository.findOneBy({ email: patient.email });
    if (existingPatient) {
      throw new HttpException('Patient with this email already exists', 400);
    }
    
    return this._patientRepository.save(patient);
  }

  async deletePatient(uuid: string) {
    const patient = await this._patientRepository.findOne({ where: { uuid: uuid } });
    if (!patient) {
      throw new HttpException('Patient not found', 404);
    }
    if (patient.documentPhoto) {
      await this._dmsService.deleteObject(patient.documentPhoto);
    }
    return this._patientRepository.delete(patient.id);
  }
}
