import { Cast, CastModel, CastSnapshotOut } from './../cast/cast';
import { flow, Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"
import { GetCastResult } from '../../services/api';

/**
 * Model description here for TypeScript hints.
 */
export const CastStoreModel = types
  .model("CastStore")
  .props({
    cast: types.optional(types.array(CastModel), [])
  })
  .extend(withEnvironment)

  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  /*cast*/
  .actions((self) => ({
    saveCast: (castSnapshotOut: CastSnapshotOut[]) => {
      const castModels: Cast[] = castSnapshotOut.map((c) => CastModel.create(c))
      self.cast.replace(castModels)
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    getCast: flow(function* (id) {
      const result: GetCastResult = yield self.environment.api.getCast(id)
      if (result.kind === "ok") {
        self.saveCast(result.cast)
      } else {  
        __DEV__ && console.tron.log(result.kind)
      }
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface CastStore extends Instance<typeof CastStoreModel> {}
export interface CastStoreSnapshotOut extends SnapshotOut<typeof CastStoreModel> {}
export interface CastStoreSnapshotIn extends SnapshotIn<typeof CastStoreModel> {}
export const createCastStoreDefaultModel = () => types.optional(CastStoreModel, {})
