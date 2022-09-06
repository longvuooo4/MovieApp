import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const GenresModel = types
  .model("Genres")
  .props({
    id: types.identifierNumber,
    name: types.maybe(types.string),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Genres extends Instance<typeof GenresModel> {}
export interface GenresSnapshotOut extends SnapshotOut<typeof GenresModel> {}
export interface GenresSnapshotIn extends SnapshotIn<typeof GenresModel> {}
export const createGenresDefaultModel = () => types.optional(GenresModel, {})
