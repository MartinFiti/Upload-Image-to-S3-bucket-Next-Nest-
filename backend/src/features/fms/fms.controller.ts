import { Controller, Get, Query } from '@nestjs/common';
import { FmsService } from './fms.service';

@Controller('fms')
export class FmsController {
  constructor(private _fmsService: FmsService) {}

  @Get('presigned-url/upload')
  async getPreSignedURL(@Query('key') key: string, @Query('contentType') contentType: string) {
    return this._fmsService.getPreSignedURL(key, contentType);
  }

  @Get('presigned-url/view')
  async getPreSignedURLToViewObject(@Query('key') key: string) {
    return this._fmsService.getPreSignedURLToViewObject(key);
  }
}
