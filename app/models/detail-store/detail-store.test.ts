import { DetailStoreModel } from "./detail-store"

test("can be created", () => {
  const instance = DetailStoreModel.create({})

  expect(instance).toBeTruthy()
})
