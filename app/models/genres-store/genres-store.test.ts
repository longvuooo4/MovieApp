import { GenresStoreModel } from "./genres-store"

test("can be created", () => {
  const instance = GenresStoreModel.create({})

  expect(instance).toBeTruthy()
})
