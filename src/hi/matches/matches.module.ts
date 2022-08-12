/* eslint-disable prettier/prettier */
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { HaloWaypointAuthenticate } from '../../utils/auth';
import { MatchesController } from './matches.controller';
import { MatchesService } from './matches.service';

@Module({
  imports: [HttpModule],
  controllers: [MatchesController],
  providers: [MatchesService, HaloWaypointAuthenticate],
  exports: [MatchesModule]
})
export class MatchesModule {}
