import { Module } from '@nestjs/common';
import { FmsService } from './fms.service';
import { FmsController } from './fms.controller';

@Module({
  providers: [FmsService],
  controllers: [FmsController]
})
export class FmsModule {}
