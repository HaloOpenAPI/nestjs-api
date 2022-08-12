/* eslint-disable prettier/prettier */
import { ApiPropertyOptional } from "@nestjs/swagger";

/* eslint-disable prettier/prettier */
export class MatchesQuery {
    @ApiPropertyOptional()
    count: number;

    @ApiPropertyOptional()
    start: number;
  }

export interface MatchesModel {
    MatchId:             string;
    MatchInfo:           MatchInfo;
    LastTeamId:          number;
    Outcome:             number;
    Rank:                number;
    PresentAtEndOfMatch: boolean;
}

export interface MatchInfo {
    StartTime:           string;
    EndTime:             string;
    Duration:            string;
    LifecycleMode:       number;
    GameVariantCategory: number;
    LevelId:             string;
    MapVariant:          MapVariant;
    UgcGameVariant:      MapVariant;
    ClearanceId:         string;
    Playlist:            MapVariant;
    PlaylistExperience:  number;
    PlaylistMapModePair: MapVariant;
    SeasonId:            string;
    PlayableDuration:    string;
    TeamsEnabled:        boolean;
    TeamScoringEnabled:  boolean;
}

export interface MapVariant {
    AssetKind: number;
    AssetId:   string;
    VersionId: string;
}

export interface MatchesCountModel {
    CustomMatchesPlayedCount:    number;
    MatchesPlayedCount:          number;
    MatchmadeMatchesPlayedCount: number;
    LocalMatchesPlayedCount:     number;
}

export interface MatchesPrivacy {
    MatchmadeGames: Privacy;
    OtherGames:     Privacy;
}

enum Privacy {
    Shared = 1,
    Private = 2
}
