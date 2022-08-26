/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import axios, { AxiosError } from 'axios';
import { live, LivePreAuthOptions } from '@xboxreplay/xboxlive-auth';
import { stringify } from 'querystring';
import config from './config';
import 'dotenv/config';

export type HWAUthenticateResponse = {
    cookies: {
        WPAuth: string;
        spartanToken: string;
        '343-clearance': string;
    };
    expires_on: string;
};

@Injectable()
export class HaloWaypointAuthenticate {
    headers = {
        'accept': 'application/json',
        'x-343-authorization-spartan': null
    }
      
    constructor() {
        // this.authenticate(process.env.HALOWAYPOINT_EMAIL, process.env.HALOWAYPOINT_PASSWORD).then(res => {
        //     this.headers['x-343-authorization-spartan'] = res.cookies.spartanToken;
        // });
    }

    private static readonly PRE_AUTH_OPTIONS: LivePreAuthOptions = {
        clientId: '000000004C0BD2F1',
        scope: 'xbox.basic xbox.offline_access',
        responseType: 'code',
        redirectUri: 'https://www.halowaypoint.com/sign-in/callback',
    };

    public async authenticate(email: string, password: string): Promise<HWAUthenticateResponse> {
        const preAuthResponse = await live.preAuth(
            HaloWaypointAuthenticate.PRE_AUTH_OPTIONS
        );

        const HWCallbackUrl = await axios({
            url:
                preAuthResponse.matches.urlPost +
                '&' +
                stringify({
                    locale: 'en-us',
                    display: 'touch',
                    state: '/',
                }),
            method: 'POST',
            headers: {
                ...config.request.WWWBaseHeaders,
                Cookie: preAuthResponse.cookie,
            },
            data: stringify({
                login: email,
                loginfmt: email,
                passwd: password,
                PPFT: preAuthResponse.matches.PPFT,
                type: 11,
                NewUser: 1,
                LoginOptions: 3,
            }),
            maxRedirects: 0,
            validateStatus: status => status === 302 || status === 200,
        })
        .then(res => res.headers.location)
        .catch((err: AxiosError) => {
            console.log(err);
        });

        const cookies = await axios({
            method: 'GET',
            url: HWCallbackUrl,
            headers: { ...config.request.WWWBaseHeaders },
            maxRedirects: 0,
            validateStatus: status => status === 302 || status === 200,
        }).then(res =>
            (res.headers['set-cookie'] || []).map(
                (c: string) => c.split(';')[0]
            )
        );

        const cookiesObject = cookies.reduce((a, b) => {
            const [key, value] = b.split('=');
            a[key] = decodeURIComponent(value);
            return a;
        }, {} as Record<string, string>);

        const date = new Date();
        date.setHours(date.getHours() + 3); // 3 hours

        return {
            cookies: {
                WPAuth: cookiesObject.wpauth,
                spartanToken: cookiesObject['343-spartan-token'],
                '343-clearance': null

            },
            expires_on: date.toISOString(),
        };
    }
}