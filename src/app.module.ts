import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { MatchesModule } from './hi/matches/matches.module';
import { PlayersModule } from './hi/players/players.module';
import { AuthModule } from './hi/auth/auth.module';
import { XboxModule } from './hi/xbox/xbox.module';
import { PlaylistModule } from './hi/playlist/playlist.module';

@Module({
  imports: [HttpModule, AuthModule, PlayersModule, MatchesModule, PlaylistModule, XboxModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
