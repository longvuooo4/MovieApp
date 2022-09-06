import { Genres, GenresModel, GenresSnapshotOut } from './../genres/genres';
import { flow, Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"
import { GetGenresResult } from '../../services/api';

/**
 * Model description here for TypeScript hints.
 */
export const GenresStoreModel = types
  .model("GenresStore")
  .props({
    genres: types.optional(types.array(GenresModel), []),
  })
  .extend(withEnvironment)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    saveGenres: (genresSnapshotOut: GenresSnapshotOut[]) => {      
      const genresModels: Genres[] = genresSnapshotOut.map(c => GenresModel.create(c))
      self.genres.replace(genresModels)
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    getGenres: flow(function * (){
      const result: GetGenresResult = yield self.environment.api.getGenres()
      if (result.kind === "ok") {
        self.saveGenres(result.genres)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    })
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface GenresStore extends Instance<typeof GenresStoreModel> {}
export interface GenresStoreSnapshotOut extends SnapshotOut<typeof GenresStoreModel> {}
export interface GenresStoreSnapshotIn extends SnapshotIn<typeof GenresStoreModel> {}
export const createGenresStoreDefaultModel = () => types.optional(GenresStoreModel, {})
