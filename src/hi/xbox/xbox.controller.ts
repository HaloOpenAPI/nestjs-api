/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Query, Headers } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { XboxService } from './xbox.service';

@ApiHeader({
  name: 'xboxToken',
})
@ApiTags('Xbox')
@Controller('xbox')
export class XboxController {
    constructor(
      private readonly xboxService: XboxService
    ) {}

    @Get('Profile/:gamertagOrXUID')
    GetProfile(@Headers() headers, @Param('gamertagOrXUID') gamertagOrXUID: string):any {
      console.log(headers);
      
      const requestHeaders = {
        "authorization": headers['xboxtoken'],
        "x-xbl-contract-version": 2,
        "content-type": 'application/json'
      };
      return this.xboxService.getProfile(requestHeaders, gamertagOrXUID)
    }

    @Get('BulkResolveXUID')
    BulkResolveXuid(@Headers() headers, @Query('xuids') xuids: string[]):any {
      const requestHeaders = {
        "authorization": headers['xboxtoken'],
        "x-xbl-contract-version": 2,
        "content-type": 'application/json'
      };
      return this.xboxService.BulkResolveXuid(requestHeaders, xuids)
    }
}