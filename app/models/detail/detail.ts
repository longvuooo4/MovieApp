import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const DetailModel = types
  .model("Detail")
  .props({
    id: types.maybe(types.number),
    title: types.maybe(types.string),
    release_date: types.maybe(types.string),
    backdrop_path: types.maybe(types.string),
    product_contries: types.maybe(types.string),
    overview: types.maybe(types.string),
    vote_average: types.maybe(types.number),
    key: types.maybe(types.string),
    type: types.maybe(types.string),

  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Detail extends Instance<typeof DetailModel> {}
export interface DetailSnapshotOut extends SnapshotOut<typeof DetailModel> {}
export interface DetailSnapshotIn extends SnapshotIn<typeof DetailModel> {}
export const createDetailDefaultModel = () => types.optional(DetailModel, {})
