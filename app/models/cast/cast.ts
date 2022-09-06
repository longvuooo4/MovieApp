import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const CastModel = types
  .model("Cast")
  .props({
    id: types.maybe(types.number),
    profile_path: types.maybeNull(types.string),
    name: types.maybe(types.string),
    character: types.maybe(types.string)
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Cast extends Instance<typeof CastModel> {}
export interface CastSnapshotOut extends SnapshotOut<typeof CastModel> {}
export interface CastSnapshotIn extends SnapshotIn<typeof CastModel> {}
export const createCastDefaultModel = () => types.optional(CastModel, {})
