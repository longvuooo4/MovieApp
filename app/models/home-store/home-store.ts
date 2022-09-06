import { GetTopRateResult } from "./../../services/api/api.types"
import { Home, HomeModel, HomeSnapshotOut } from "./../home/home"
import { flow, Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "./../extensions/with-environment"
import { GetMoviesResult } from "../../services/api"

/**
 * Model description here for TypeScript hints.
 */
export const HomeStoreModel = types
  .model("HomeStore")
  .props({
    home: types.optional(types.array(HomeModel), []),
    topRate: types.optional(types.array(HomeModel), []),
    upComing: types.optional(types.array(HomeModel), []),
    popular: types.optional(types.array(HomeModel), []),
    category: types.optional(types.array(HomeModel), []),
  })
  .extend(withEnvironment)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    saveMovies: (homeSnapshotOut: HomeSnapshotOut[]) => {
      const homeModels: Home[] = homeSnapshotOut.map((c) => HomeModel.create(c))
      self.home.replace(homeModels)
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    getMovies: flow(function* () {
      const result: GetMoviesResult = yield self.environment.api.getMovies()

      if (result.kind === "ok") {
        self.saveMovies(result.movies)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

  /* Top Rate */
  .actions((self) => ({
    saveTopRate: (homeSnapshotOut: HomeSnapshotOut[]) => {
      const topRateModels: Home[] = homeSnapshotOut.map((c) => HomeModel.create(c))
      self.topRate.replace(topRateModels)
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    getTopRate: flow(function* () {
      const result: GetTopRateResult = yield self.environment.api.getTopRate()

      if (result.kind === "ok") {
        self.saveTopRate(result.topRate)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

  /*Up Coming*/
  .actions((self) => ({
    saveUpComing: (homeSnapshotOut: HomeSnapshotOut[]) => {
      const upComingModels: Home[] = homeSnapshotOut.map((c) => HomeModel.create(c))
      self.upComing.replace(upComingModels)
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    getUpComing: flow(function* () {
      const result: GetMoviesResult = yield self.environment.api.getUpComing()

      if (result.kind === "ok") {
        self.saveUpComing(result.movies)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

  /*Popular Movies*/
  .actions((self) => ({
    savePopular: (homeSnapshotOut: HomeSnapshotOut[]) => {
      const popularModels: Home[] = homeSnapshotOut.map((c) => HomeModel.create(c))
      self.popular.replace(popularModels)
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    getPopular: flow(function* () {
      const result: GetMoviesResult = yield self.environment.api.getPopular()

      if (result.kind === "ok") {
        self.savePopular(result.movies)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

  /*Category*/
  .actions((self) => ({
    saveCategory: (categorySnapshotOut: HomeSnapshotOut[]) => {
      const categoryModels: Home[] = categorySnapshotOut.map((c) => HomeModel.create(c))
      self.category.replace(categoryModels)
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    getCategory: flow(function* (id) {
      const result: GetMoviesResult = yield self.environment.api.getCategory(id)

      if (result.kind === "ok") {
        self.saveCategory(result.movies)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface HomeStore extends Instance<typeof HomeStoreModel> {}
export interface HomeStoreSnapshotOut extends SnapshotOut<typeof HomeStoreModel> {}
export interface HomeStoreSnapshotIn extends SnapshotIn<typeof HomeStoreModel> {}
export const createHomeStoreDefaultModel = () => types.optional(HomeStoreModel, {})
