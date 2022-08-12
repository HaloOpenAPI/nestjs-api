/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Query, Headers } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { PlaylistService } from './playlist.service';

@ApiTags('Playlist')
@Controller('playlist')
export class PlaylistController {
    constructor(
      private readonly playlistService: PlaylistService
    ) {}

    @Get(':playlistId/csrs')
    getPlaylistCSR(@Headers() headers, @Param('playlistId') playlistId: string, @Query('players') players: string[]): any {
        return this.playlistService.getPlaylistCSR(playlistId, players);
    }

}