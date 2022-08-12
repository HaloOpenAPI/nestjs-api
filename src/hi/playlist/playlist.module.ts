/* eslint-disable prettier/prettier */
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { HaloWaypointAuthenticate } from 'src/utils/auth';
import { PlaylistController } from './playlist.controller';
import { PlaylistService } from './playlist.service';

@Module({
  imports: [HttpModule],
  controllers: [PlaylistController],
  providers: [PlaylistService, HaloWaypointAuthenticate],
  exports: [PlaylistModule]
})
export class PlaylistModule {}
