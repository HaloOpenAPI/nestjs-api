/* eslint-disable prettier/prettier */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';
import { MatchDetails, MatchSkill } from '../../models/matches';

@Injectable()
export class MatchesService {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  // async getMatchDetails(id: string): Promise<MatchDetails> {
  //   return await lastValueFrom(this.httpService.get<MatchDetails>(`https://halostats.svc.halowaypoint.com/hi/matches/${id}/stats`, { headers: this.hwAuth.headers })
  //    .pipe(map(res =>  {
  //       return res.data;
  //   })));
  // }

//   async getMatchSkill(id: string, players: string[]): Promise<MatchSkill> {
//     const url = new URL(`https://skill.svc.halowaypoint.com/hi/matches/${id}/skill`);
//     url.searchParams.append('players', players.toString());

//     return await lastValueFrom(this.httpService.get<MatchSkill>(url.toString(), { headers: this.hwAuth.headers})
//      .pipe(map(res =>  {
//         return res.data;
//     })))
// }

}