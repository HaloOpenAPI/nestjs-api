/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import 'dotenv/config';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class AuthService {  
    constructor(
        private readonly httpService: HttpService
    ) {}

    GenerateAuthUrl(clientId: string, redirectUrl: string, scopes: string[] = null, state = ""){
        const url = new URL('https://login.live.com/oauth20_authorize.srf');

        url.searchParams.append('client_id', clientId);
        url.searchParams.append('response_type', 'code');
        url.searchParams.append('approval_prompt', 'auto');

        if (scopes != null && scopes.length > 0)
        { 
            url.searchParams.append("scope", scopes.join(" "));
        }
        else
        {
            url.searchParams.append("scope", "Xboxlive.signin Xboxlive.offline_access");
        }

        url.searchParams.append("redirect_uri", redirectUrl);

        if (!state)
        {
            url.searchParams.append("state", state);
        }

        return url.toString();
    }

    async RequestOAuthToken(clientId: string, authorizationCode: string, redirectUrl: string, clientSecret = "", scopes: string[] = null){
        const url = new URL('https://login.live.com/oauth20_token.srf');
        const formData = new URLSearchParams();

        formData.append("grant_type", "authorization_code");
        formData.append("code", authorizationCode);
        formData.append("approval_prompt", "auto");

        if (scopes != null && scopes.length > 0)
        {
            formData.append("scope", scopes.join(" "));
        }
        else
        {
            formData.append("scope", "Xboxlive.signin Xboxlive.offline_access");
        }

        formData.append("redirect_uri", redirectUrl);
        formData.append("client_id", clientId);
        formData.append("client_secret", clientSecret);

        return await lastValueFrom(this.httpService.post<any>(url.toString(), formData.toString(), {
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .pipe(map(res =>  {
           return res.data;
        })));
    }

    async RequestUserToken(accessToken: string): Promise<any>{
        const url = new URL('https://user.auth.xboxlive.com/user/authenticate');

        return await lastValueFrom(this.httpService.post<any>(url.toString(), {
            "Properties": {
                "AuthMethod": "RPS",
                "RpsTicket": `d=${accessToken}`,
                "SiteName": "user.auth.xboxlive.com"
            },
            "RelyingParty": "http://auth.xboxlive.com",
            "TokenType": "JWT"
        }, {
            headers: {
                "x-xbl-contract-version": '1'
            }
        }).pipe(map(res =>  {
            return res.data;
         })));
    }

    async RequestXstsToken(userToken: string, useHaloRelyingParty = true){
        const url = new URL('https://xsts.auth.xboxlive.com/xsts/authorize');

        const body = {
            "Properties": {
                "SandboxId": "RETAIL",
                "UserTokens": [
                    userToken
                ]
            },
            "RelyingParty": useHaloRelyingParty ? "https://prod.xsts.halowaypoint.com/" : 'http://xboxlive.com',
            "TokenType": "JWT"
        }

        return await lastValueFrom(this.httpService.post<any>(url.toString(), body, {
            headers: {
                "x-xbl-contract-version": '1'
            }
        }).pipe(map(res =>  {
            return res.data;
         })));
    }

    async GetSpartanToken(xstsToken: string){
        const url = new URL('https://settings.svc.halowaypoint.com/spartan-token');
        const body = {
            "Audience": "urn:343:s3:services",
            "MinVersion": "4",
            "Proof": [
                {
                    "Token": xstsToken,
                    "TokenType": "Xbox_XSTSv3"
                }
            ]
        }

        return await lastValueFrom(this.httpService.post<any>(url.toString(), body, {
            headers: {
                "User-Agent": 'HaloWaypoint/2021112313511900 CFNetwork/1327.0.4 Darwin/21.2.0'
            }
        }).pipe(map(res =>  {
            return res.data;
         })));
    }

    //TODO: Make a post with XUID
    async GetClearance(spartanToken: string){
        const url = new URL('https://settings.svc.halowaypoint.com/oban/flight-configurations/titles/hi/audiences/RETAIL/players/xuid(2535450000519548)/active?sandbox=UNUSED&build=210921.22.01.10.1706-0');

        return await lastValueFrom(this.httpService.get<any>(url.toString(), {
            headers: {
                "x-343-authorization-spartan": spartanToken
            }
        }).pipe(map(res =>  {
            return res.data;
         })));
    }

    async WaypointUser(spartanToken: string){
        const url = new URL(`https://wpcomms.svc.halowaypoint.com/users/me`);
        
        return await lastValueFrom(this.httpService.get<any>(url.toString(), {
            headers: {
                "x-343-authorization-spartan": spartanToken
            }
        }).pipe(map(res =>  {
            return res.data;
         })));
    }
}