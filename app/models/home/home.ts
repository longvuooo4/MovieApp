import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const HomeModel = types
  .model("Home")
  .props({
    id: types.identifierNumber,
    title: types.maybe(types.string),
    imgURL: types.maybe(types.string),
    backdropURL: types.maybe(types.string)
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Home extends Instance<typeof HomeModel> {}
export interface HomeSnapshotOut extends SnapshotOut<typeof HomeModel> {}
export interface HomeSnapshotIn extends SnapshotIn<typeof HomeModel> {}
export const createHomeDefaultModel = () => types.optional(HomeModel, {})
