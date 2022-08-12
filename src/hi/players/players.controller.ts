/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MatchesCountModel, MatchesModel, MatchesPrivacy, MatchesQuery } from '../../models/players';
import { PlayersService } from './players.service';

@ApiTags('Players')
@Controller('players')
export class PlayersController {
    constructor(private readonly playersService: PlayersService) {}

    @Get(':gamertag/matches-privacy')
    getMatchesPrivacy(@Param('gamertag') gamertag: string): Promise<MatchesPrivacy> {
        return this.playersService.getMatchesPrivacy(gamertag);
    }

    @Get(':gamertag/matches')
    getMatches(@Param('gamertag') gamertag: string, @Query() query: MatchesQuery): Promise<MatchesModel[]> {
        return this.playersService.getMatches(gamertag, query.count, query.start);
    }

    @Get(':gamertag/matches/count')
    getMatchesCount(@Param('gamertag') gamertag: string): Promise<MatchesCountModel> {
        return this.playersService.getMatchesCount(gamertag);
    }
}
