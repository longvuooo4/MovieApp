import { GenresModel } from "./genres"

test("can be created", () => {
  const instance = GenresModel.create({})

  expect(instance).toBeTruthy()
})
