import { GeneralApiProblem } from "./api-problem"
import { HomeSnapshotOut } from "../../models/home/home"
import { GenresSnapshotOut } from "../../models/genres/genres"
import { DetailSnapshotOut } from "../../models/detail/detail"
import { CastSnapshotOut } from "../../models/cast/cast"

export interface User {
  id: number
  name: string
}


export type GetMoviesResult = {kind: "ok"; movies: HomeSnapshotOut[]} | GeneralApiProblem
export type GetTopRateResult = {kind: "ok"; topRate: HomeSnapshotOut[]} | GeneralApiProblem
export type GetGenresResult = {kind: "ok"; genres: GenresSnapshotOut[]} | GeneralApiProblem
export type GetVideosResult = {kind: "ok"; videos: DetailSnapshotOut[]} | GeneralApiProblem
export type GetCastResult = {kind: "ok"; cast: CastSnapshotOut[]} | GeneralApiProblem
export type GetDetailResult = {kind: "ok"; details: DetailSnapshotOut} | GeneralApiProblem


