/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import 'dotenv/config';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';

const _isXUID = (entry: string | number) => /^([0-9]+)$/g.test(entry.toString());

@Injectable()
export class XboxService {  
    constructor(
        private readonly httpService: HttpService
    ) {}
    

    async BulkResolveXuid(headers: any, xuids: string[]): Promise<any>{
        const url = new URL('https://profile.xboxlive.com/users/batch/profile/settings');
        const body = {
            "userIds": xuids,
            "settings":[
               "GameDisplayName",
               "GameDisplayPicRaw",
               "Gamerscore",
               "Gamertag"
            ]
        }

        return await lastValueFrom(this.httpService.post<any>(url.toString(), body, { headers }).pipe(map(res =>  {
            return res.data;
        })));
    }

    async getProfile(headers: any, gamertagOrXUID){
        const player = _isXUID(gamertagOrXUID) ? `xuid(${gamertagOrXUID})` : `gt(${gamertagOrXUID})`;
        const url = new URL(`https://profile.xboxlive.com/users/${player}/settings`);
        url.searchParams.append('settings', 'GameDisplayName,GameDisplayPicRaw,Gamerscore,Gamertag')

        return await lastValueFrom(this.httpService.get<any>(url.toString(), { headers }).pipe(map(res =>  {
            return res.data;
        })));
    }
}