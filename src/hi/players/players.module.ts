/* eslint-disable prettier/prettier */
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { HaloWaypointAuthenticate } from '../../utils/auth';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';


@Module({
  imports: [HttpModule],
  controllers: [PlayersController],
  providers: [PlayersService, HaloWaypointAuthenticate],
  exports: [PlayersModule]
})
export class PlayersModule {}
