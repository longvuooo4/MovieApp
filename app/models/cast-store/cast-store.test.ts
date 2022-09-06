import { CastStoreModel } from "./cast-store"

test("can be created", () => {
  const instance = CastStoreModel.create({})

  expect(instance).toBeTruthy()
})
