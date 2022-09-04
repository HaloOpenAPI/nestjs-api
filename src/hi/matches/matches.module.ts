/* eslint-disable prettier/prettier */
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MatchesController } from './matches.controller';
import { MatchesService } from './matches.service';

@Module({
  imports: [HttpModule],
  controllers: [MatchesController],
  providers: [MatchesService],
  exports: [MatchesModule]
})
export class MatchesModule {}
