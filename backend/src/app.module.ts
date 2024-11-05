import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './features/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FmsModule } from './features/fms/fms.module';
import databaseConfig from './core/db/config';


@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    UsersModule,
    FmsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
