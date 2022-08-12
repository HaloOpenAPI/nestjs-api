/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import 'dotenv/config';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';
import { HaloWaypointAuthenticate } from '../../utils/auth';

@Injectable()
export class PlaylistService {  
    constructor(
        private readonly httpService: HttpService,
        private hwAuth: HaloWaypointAuthenticate
    ) {}

    async getPlaylistCSR(playlistId: string, players: string[]): Promise<any> {
        const url = new URL(`https://skill.svc.halowaypoint.com/hi/playlist/${playlistId}/csrs`);
        url.searchParams.append('players', players.toString());

        console.log(url.toString());
        
    
        return await lastValueFrom(this.httpService.get<any>(url.toString(), { headers: this.hwAuth.headers})
         .pipe(map(res =>  {
            return res.data;
    })))}

}