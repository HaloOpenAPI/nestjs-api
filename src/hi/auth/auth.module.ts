/* eslint-disable prettier/prettier */
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { HaloWaypointAuthenticate } from 'src/utils/auth';
import { XboxService } from '../xbox/xbox.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [HttpModule],
  controllers: [AuthController],
  providers: [AuthService, HaloWaypointAuthenticate, XboxService],
  exports: [AuthModule]
})
export class AuthModule {}
