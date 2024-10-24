import { Controller, Get, Query } from '@nestjs/common';
import { DmsService } from './dms.service';

@Controller('dms')
export class DmsController {
  constructor(private _dmsService: DmsService) {}

  @Get('presigned-url/upload')
  async getPreSignedURL(@Query('key') key: string, @Query('contentType') contentType: string) {
    return this._dmsService.getPreSignedURL(key, contentType);
  }

  @Get('presigned-url/view')
  async getPreSignedURLToViewObject(@Query('key') key: string) {
    return this._dmsService.getPreSignedURLToViewObject(key);
  }
}
