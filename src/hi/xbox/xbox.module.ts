/* eslint-disable prettier/prettier */
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
// import { HaloWaypointAuthenticate } from '../../utils/auth';
import { XboxController } from './xbox.controller';
import { XboxService } from './xbox.service';

@Module({
  imports: [HttpModule],
  controllers: [XboxController],
  // providers: [XboxService, HaloWaypointAuthenticate],
  providers: [XboxService],
  exports: [XboxModule]
})
export class XboxModule {}
