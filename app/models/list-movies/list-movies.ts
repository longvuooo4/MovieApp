import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const ListMoviesModel = types
  .model("ListMovies")
  .props({
    id: types.identifierNumber,
    title: types.maybe(types.string),
    imgURL: types.maybe(types.string)
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface ListMovies extends Instance<typeof ListMoviesModel> {}
export interface ListMoviesSnapshotOut extends SnapshotOut<typeof ListMoviesModel> {}
export interface ListMoviesSnapshotIn extends SnapshotIn<typeof ListMoviesModel> {}
export const createListMoviesDefaultModel = () => types.optional(ListMoviesModel, {})
