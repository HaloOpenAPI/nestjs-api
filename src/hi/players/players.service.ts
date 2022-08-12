/* eslint-disable prettier/prettier */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';
import { MatchesCountModel, MatchesModel, MatchesPrivacy } from 'src/models/players';
import { HaloWaypointAuthenticate } from 'src/utils/auth';

@Injectable()
export class PlayersService {

  constructor(
    private readonly httpService: HttpService,
    private hwAuth: HaloWaypointAuthenticate
  ) {}

  async getMatchesPrivacy(gamertag: string): Promise<MatchesPrivacy> {
    const url = new URL(`https://halostats.svc.halowaypoint.com/hi/players/${gamertag}/matches-privacy`);

    return await lastValueFrom(this.httpService.get<MatchesPrivacy>(url.toString(), { headers: this.hwAuth.headers})
    .pipe(map(res =>  {
        return res.data;
    })))
  }

  async getMatches(gamertag: string, count = 25, start = 0 ): Promise<MatchesModel[]> {
    const url = new URL(`https://halostats.svc.halowaypoint.com/hi/players/${gamertag}/matches`);
    url.searchParams.append('include-times', 'true');
    url.searchParams.append('count', count.toString()); 
    url.searchParams.append('start', start.toString());

    return await lastValueFrom(this.httpService.get<MatchesModel[]>(url.toString(), { headers: this.hwAuth.headers})
    .pipe(map(res =>  {
        return res.data;
    })))
  }

  async getMatchesCount(gamertag: string): Promise<MatchesCountModel> {
    const url = new URL(`https://halostats.svc.halowaypoint.com/hi/players/${gamertag}/matches/count`);

    return await lastValueFrom(this.httpService.get<MatchesCountModel>(url.toString(), { headers: this.hwAuth.headers})
    .pipe(map(res =>  {
        return res.data;
    })))
  }

}