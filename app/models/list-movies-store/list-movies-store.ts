import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const ListMoviesStoreModel = types
  .model("ListMoviesStore")
  .props({})
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface ListMoviesStore extends Instance<typeof ListMoviesStoreModel> {}
export interface ListMoviesStoreSnapshotOut extends SnapshotOut<typeof ListMoviesStoreModel> {}
export interface ListMoviesStoreSnapshotIn extends SnapshotIn<typeof ListMoviesStoreModel> {}
export const createListMoviesStoreDefaultModel = () => types.optional(ListMoviesStoreModel, {})
