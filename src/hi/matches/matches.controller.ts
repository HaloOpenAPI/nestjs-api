/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Query, Headers  } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { MatchDetails } from '../../models/matches';
import { MatchesService } from './matches.service';

@ApiHeader({
  name: 'x-343-authorization-spartan',
})
@ApiTags('Matches')
@Controller('matches')
export class MatchesController {
    constructor(
      private readonly matchesService: MatchesService,
      ) {}

    // @Get(':id/stats')
    // getStats(@Headers() headers, @Param('id') id: string): Promise<MatchDetails> {
    //   // console.log(headers);
      
    //   // if(headers['x-343-authorization-spartan']){
    //   //   console.log("ebter");
        
    //   //   this.auth.headers['x-343-authorization-spartan'] = headers['x-343-authorization-spartan'];
    //   // }
    //   return this.matchesService.getMatchDetails(id);
    // }

    // @Get(':id/skill')
    // getSkill(@Headers() headers, @Param('id') id: string, @Query('players') players: string[]): any {
    //     return this.matchesService.getMatchSkill(id, players);
    // }
}
