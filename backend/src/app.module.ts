import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientsModule } from './features/patients/patients.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DmsModule } from './features/dms/dms.module';
import databaseConfig from './core/db/config';


@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    PatientsModule,
    DmsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
