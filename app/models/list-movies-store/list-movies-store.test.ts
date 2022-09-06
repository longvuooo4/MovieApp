import { ListMoviesStoreModel } from "./list-movies-store"

test("can be created", () => {
  const instance = ListMoviesStoreModel.create({})

  expect(instance).toBeTruthy()
})
