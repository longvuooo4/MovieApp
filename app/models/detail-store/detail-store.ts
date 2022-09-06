import { cast, flow, Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { GetDetailResult, GetVideosResult } from "../../services/api"
import { Detail, DetailModel, DetailSnapshotOut } from "../detail/detail"
import { withEnvironment } from "../extensions/with-environment"

/**
 * Model description here for TypeScript hints.
 */
export const DetailStoreModel = types
  .model("DetailStore")
  .props({
    details: types.optional(DetailModel, {}),
    videos: types.optional(types.array(DetailModel), []),
  })
  .extend(withEnvironment)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    saveDetail: (detailsSnapshots: DetailSnapshotOut) => {
      self.details = cast(detailsSnapshots)
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    getDetail: flow(function* (id: number) {
      const result: GetDetailResult = yield self.environment.api.getDetails(id)

      if (result.kind === "ok") {
        self.saveDetail(result.details)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    saveVideos: (videosSnapshotOut: DetailSnapshotOut[]) => {
      const videosModels: Detail[] = videosSnapshotOut.map((c) => DetailModel.create(c))
      self.videos.replace(videosModels)
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    getVideos: flow(function* (id) {
      const result: GetVideosResult = yield self.environment.api.getVideos(id)      
      if (result.kind === "ok") {
        self.saveVideos(result.videos)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars



export interface DetailStore extends Instance<typeof DetailStoreModel> {}
export interface DetailStoreSnapshotOut extends SnapshotOut<typeof DetailStoreModel> {}
export interface DetailStoreSnapshotIn extends SnapshotIn<typeof DetailStoreModel> {}
export const createDetailStoreDefaultModel = () => types.optional(DetailStoreModel, {})
