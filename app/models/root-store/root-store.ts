import { HomeStoreModel } from './../home-store/home-store';
import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { CharacterStoreModel } from "../character-store/character-store"
import { GenresStoreModel } from '../genres-store/genres-store';
import { DetailStoreModel } from '../detail-store/detail-store';
import { CastStoreModel } from '../cast-store/cast-store';

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  characterStore: types.optional(CharacterStoreModel, {} as any),
  homeStore: types.optional(HomeStoreModel, {} as any),
  genresStore: types.optional(GenresStoreModel, {} as any),
  detailStore: types.optional(DetailStoreModel, {} as any),
  castStore: types.optional(CastStoreModel, {} as any),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
