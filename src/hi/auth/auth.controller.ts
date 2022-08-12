/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Query, Response } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserToken } from '../../models/auth';
import { AuthService } from './auth.service';
import * as express from 'express';
import { XboxService } from '../xbox/xbox.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
      private readonly authService: AuthService,
      private readonly xboxService: XboxService
    ) {}
    
    @Get('GenerateAuthUrl')
    GenerateAuthUrl():any {
      return this.authService.GenerateAuthUrl(process.env.CLIENT_ID, process.env.REDIRECT_URL, null, "0")
    }

    @Get('GenerateAuthUrl/:redirectUrl')
    GenerateAuthUrlCustom(@Param('redirectUrl') redirectUrl: string):any {
      return this.authService.GenerateAuthUrl(process.env.CLIENT_ID, redirectUrl, null, "0")
    }

    // This is the redirect for your frontend to handle the Callback, it goes in tandem with CallbackRedirect.
    @Get('CallbackUrl')
    async CallbackUrl(@Query('code') code: string, @Response() response: express.Response): Promise<any> {
      const url = new URL(process.env.CALLBACK_REDIRECT);
      url.searchParams.append('code', code)
      response.redirect(303, url.toString());
    }

    @Get('CallbackRedirect/:code')
    async CallbackRedirect(@Param('code') code: string): Promise<any> {
      const OAuthToken = await this.authService.RequestOAuthToken(process.env.CLIENT_ID, code, process.env.REDIRECT_URL, process.env.CLIENT_SECRET)
      const UserToken = await this.authService.RequestUserToken(OAuthToken.access_token);
      const XstsTokenWaypoint = await this.authService.RequestXstsToken(UserToken.Token);

      const [XstsTokenXbox, SpartanToken] = await Promise.all([
        this.authService.RequestXstsToken(UserToken.Token, false),
        this.authService.GetSpartanToken(XstsTokenWaypoint.Token)
      ])

      const XUID = await this.authService.WaypointUser(SpartanToken.SpartanToken);

      const [Clearance, XboxProfile] = await Promise.all([
        this.authService.GetClearance(SpartanToken.SpartanToken),
        this.xboxService.getProfile({
          "authorization": this.GetXboxLiveV3Token(XstsTokenXbox),
          "x-xbl-contract-version": 2,
          "content-type": 'application/json'
        }, XUID.xuid)
      ])

      return {...SpartanToken,
        XboxToken: this.GetXboxLiveV3Token(XstsTokenXbox), XboxProfile: XboxProfile.profileUsers[0], Clearance: Clearance
      };
    }

    @Get('RequestOAuthToken/:code')
    RequestOAuthToken(@Param('code') code: string):any {
      return this.authService.RequestOAuthToken(process.env.CLIENT_ID, code, process.env.REDIRECT_URL, process.env.CLIENT_SECRET)
    }

    @Get('RequestUserToken/:accessToken')
    RequestUserToken(@Param('accessToken') accessToken: string): Promise<UserToken> {
      return this.authService.RequestUserToken(accessToken)
    }

    @Get('RequestXstsToken/:userToken')
    RequestXstsToken(@Param('userToken') userToken: string):any {
      return this.authService.RequestXstsToken(userToken)
    }
    
    @Get('GetSpartanToken/:xstsToken')
    GetSpartanToken(@Param('xstsToken') xstsToken: string):any {
      return this.authService.GetSpartanToken(xstsToken)
    }

    @Get('GetClearance/:spartanToken')
    GetClearance(@Param('spartanToken') spartanToken: string):any {
      return this.authService.GetClearance(spartanToken)
    }

    @Get('GetWaypointUser/:spartanToken')
    GetWaypointUser(@Param('spartanToken') spartanToken: string):any {
      if(spartanToken.substring(0,3) === '"v4'){
        spartanToken = spartanToken.slice(0, -1).slice(1);
      }
      return this.authService.WaypointUser(spartanToken);
    }

    @Post('GetXboxLiveV3Token')
    GetXboxLiveV3Token(@Body('userToken') userToken: any):any {
      return `XBL3.0 x=${userToken.DisplayClaims.xui[0].uhs};${userToken.Token}`;
    }
}