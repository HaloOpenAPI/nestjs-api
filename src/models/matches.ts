/* eslint-disable prettier/prettier */
export enum GameVariantCategory {
  MultiplayerSlayer = 15
}

export enum LifecycleMode {
    Matchmade = 3
}

export enum PlaylistExperience {
    Arena = 2
}

export interface MatchDetails {
  MatchId:   string;
  MatchInfo: MatchInfo;
  Teams:     Team[];
  Players:   Player[];
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

export interface Player {
  PlayerId:          string;
  PlayerType:        number;
  BotAttributes:     null;
  LastTeamId:        number;
  Outcome:           number;
  Rank:              number;
  ParticipationInfo: ParticipationInfo;
  PlayerTeamStats:   PlayerTeamStat[];
}

export interface ParticipationInfo {
  FirstJoinedTime:        string;
  LastLeaveTime:          null | string;
  PresentAtBeginning:     boolean;
  JoinedInProgress:       boolean;
  LeftInProgress:         boolean;
  PresentAtCompletion:    boolean;
  TimePlayed:             string;
  ConfirmedParticipation: null;
}

export interface PlayerTeamStat {
  TeamId: number;
  Stats:  Stats;
}

export interface Stats {
  CoreStats:           CoreStats;
  BombStats:           null;
  CaptureTheFlagStats: null;
  EliminationStats:    null;
  ExtractionStats:     null;
  InfectionStats:      null;
  OddballStats:        null;
  ZonesStats:          null;
  StockpileStats:      null;
}

export interface CoreStats {
  Score:                 number;
  PersonalScore:         number;
  RoundsWon:             number;
  RoundsLost:            number;
  RoundsTied:            number;
  Kills:                 number;
  Deaths:                number;
  Assists:               number;
  KDA:                   number;
  Suicides:              number;
  Betrayals:             number;
  AverageLifeDuration:   string;
  GrenadeKills:          number;
  HeadshotKills:         number;
  MeleeKills:            number;
  PowerWeaponKills:      number;
  ShotsFired:            number;
  ShotsHit:              number;
  Accuracy:              number;
  DamageDealt:           number;
  DamageTaken:           number;
  CalloutAssists:        number;
  VehicleDestroys:       number;
  DriverAssists:         number;
  Hijacks:               number;
  EmpAssists:            number;
  MaxKillingSpree:       number;
  Medals:                Medal[];
  PersonalScores:        Medal[];
  DeprecatedDamageDealt: number;
  DeprecatedDamageTaken: number;
  Spawns:                number;
}

export interface Medal {
  NameId:                    number;
  Count:                     number;
  TotalPersonalScoreAwarded: number;
}

export interface Team {
  TeamId:  number;
  Outcome: number;
  Rank:    number;
  Stats:   Stats;
}

export interface MatchSkill {
  Value: Value[];
}

export interface Value {
  Id:         string;
  ResultCode: number;
  Result:     Result;
}

export interface Result {
  TeamMmr:          number;
  RankRecap:        RankRecap;
  StatPerformances: StatPerformances;
  TeamId:           number;
  TeamMmrs:         { [key: string]: number };
  RankedRewards:    null;
  Counterfactuals:  Counterfactuals;
}

export interface Counterfactuals {
  SelfCounterfactuals: SelfCounterfactuals;
  TierCounterfactuals: TierCounterfactuals;
}

export interface SelfCounterfactuals {
  Kills:  number;
  Deaths: number;
}

export interface TierCounterfactuals {
  Bronze:   SelfCounterfactuals;
  Silver:   SelfCounterfactuals;
  Gold:     SelfCounterfactuals;
  Platinum: SelfCounterfactuals;
  Diamond:  SelfCounterfactuals;
  Onyx:     SelfCounterfactuals;
}

export interface RankRecap {
  PreMatchCsr:  MatchCsr;
  PostMatchCsr: MatchCsr;
}

export interface MatchCsr {
  Value:                       number;
  MeasurementMatchesRemaining: number;
  Tier:                        string;
  TierStart:                   number;
  SubTier:                     number;
  NextTier:                    string;
  NextTierStart:               number;
  NextSubTier:                 number;
  InitialMeasurementMatches:   number;
}

export interface StatPerformances {
  Kills:  Deaths;
  Deaths: Deaths;
}

export interface Deaths {
  Count:    number;
  Expected: number;
  StdDev:   number;
}
