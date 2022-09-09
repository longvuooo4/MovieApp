import { Config } from "react-native-config"
import { ApisauceInstance, create, ApiResponse } from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config"
import * as Types from "./api.types"
import { HomeSnapshotOut } from "../../models/home/home"
import { GenresSnapshotIn, GenresSnapshotOut } from "../../models/genres/genres"
import { DetailSnapshotIn, DetailSnapshotOut } from "../../models/detail/detail"
import { CastSnapshotIn, CastSnapshotOut } from "../../models/cast/cast"
// import { DetailSnapshotOut } from "../../models/detail/detail"

/**
 * Manages all requests to the API.
 */

const convertMovies = (raw): HomeSnapshotOut => {
  return {
    id: raw.id,
    title: raw.title,
    imgURL: raw.poster_path,
    backdropURL: raw.backdrop_path,
  }
}
export class Api {
  apisauce: ApisauceInstance

  config: ApiConfig
  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
  }

  setup() {
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
  }
  async getMovies(): Promise<Types.GetMoviesResult> {
    const response: ApiResponse<any> = await this.apisauce.get(
      `/movie/now_playing?api_key=${Config.TMDB_API_KEY}&include_adult=false&page=1`,
    )
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      const rawMovies = response.data.results

      const convertedMovies: HomeSnapshotOut[] = rawMovies.map(convertMovies)
      return { kind: "ok", movies: convertedMovies }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async getGenres(): Promise<Types.GetGenresResult> {
    const response: ApiResponse<any> = await this.apisauce.get(
      `/genre/movie/list?api_key=${Config.TMDB_API_KEY}`,
    )
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    const convertGenres = (raw): GenresSnapshotIn => {
      return {
        id: raw.id,
        name: raw.name,
      }
    }
    try {
      const rawGenres = response.data.genres
      const convertedGenres: GenresSnapshotOut[] = rawGenres.map(convertGenres)
      return { kind: "ok", genres: convertedGenres }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async getTopRate(): Promise<Types.GetTopRateResult> {
    const response: ApiResponse<any> = await this.apisauce.get(
      `/movie/top_rated?api_key=${Config.TMDB_API_KEY}&include_adult=false&page=1`,
    )

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      const rawTopRate = response.data.results
      const convertedTopRate: HomeSnapshotOut[] = rawTopRate.map(convertMovies)
      return { kind: "ok", topRate: convertedTopRate }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }
  /*Up Coming*/
  async getUpComing(): Promise<Types.GetMoviesResult> {
    const response: ApiResponse<any> = await this.apisauce.get(
      `/movie/upcoming?api_key=${Config.TMDB_API_KEY}&include_adult=false&page=1`,
    )

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      const rawMovies = response.data.results

      const convertedMovies: HomeSnapshotOut[] = rawMovies.map(convertMovies)
      return { kind: "ok", movies: convertedMovies }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }
  /*Popular*/
  async getPopular(): Promise<Types.GetMoviesResult> {
    const response: ApiResponse<any> = await this.apisauce.get(
      `/movie/popular?api_key=${Config.TMDB_API_KEY}&include_adult=false&page=1`,
    )

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      const rawMovies = response.data.results

      const convertedMovies: HomeSnapshotOut[] = rawMovies.map(convertMovies)
      return { kind: "ok", movies: convertedMovies }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }
  /*Category*/
  async getCategory(id: number): Promise<Types.GetMoviesResult> {
    const response: ApiResponse<any> = await this.apisauce.get(
      `/discover/movie?api_key=${Config.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${id}`,
    )

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      const rawMovies = response.data.results

      const convertedMovies: HomeSnapshotOut[] = rawMovies.map(convertMovies)
      return { kind: "ok", movies: convertedMovies }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }
  /*Details*/
  async getDetails(id: number): Promise<Types.GetDetailResult> {
    const response: ApiResponse<any> = await this.apisauce.get(
      `/movie/${id}?api_key=${Config.TMDB_API_KEY}&append_to_response=credits`,
    )

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    // const convertDetail = (raw: any): DetailSnapshotOut => {
    //   return {
    //     id: raw.id,
    //     name: raw.original_title,
    //     releaseDate: raw.release_date,
    //     contries: raw.name,
    //     overview: raw.overview
    //   }
    // }
    try {
      const rawDetail = response.data

      return { kind: "ok", details: rawDetail }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }
  /*Videos*/
  async getVideos(id): Promise<Types.GetVideosResult> {
    const response: ApiResponse<any> = await this.apisauce.get(
      `/movie/${id}/videos?api_key=${Config.TMDB_API_KEY}&language=en-US`,
    )

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    const convertVideos = (raw): DetailSnapshotIn => {
      return {
        type: raw.type,
        key: raw.key,
      }
    }
    try {
      const rawVideos = response.data.results

      const convertedVideos: DetailSnapshotOut[] = rawVideos.map(convertVideos)
      return { kind: "ok", videos: convertedVideos }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }
  /*Cast*/
  async getCast(id): Promise<Types.GetCastResult> {
    const response: ApiResponse<any> = await this.apisauce.get(
      `/movie/${id}/credits?api_key=${Config.TMDB_API_KEY}`,
    )

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    const convertCast = (raw): CastSnapshotIn => {
      return {
        id: raw.cast_id,
        name: raw.name,
        profile_path: raw.profile_path,
        character: raw.character,
      }
    }
    try {
      const rawCast = response.data.cast
      const convertedCasts: CastSnapshotOut[] = rawCast.map(convertCast)
      return { kind: "ok", cast: convertedCasts }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }
}
