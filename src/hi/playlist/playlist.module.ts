/* eslint-disable prettier/prettier */
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PlaylistController } from './playlist.controller';
import { PlaylistService } from './playlist.service';

@Module({
  imports: [HttpModule],
  controllers: [PlaylistController],
  providers: [PlaylistService],
  exports: [PlaylistModule]
})
export class PlaylistModule {}
