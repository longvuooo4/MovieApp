import { CastModel } from "./cast"

test("can be created", () => {
  const instance = CastModel.create({})

  expect(instance).toBeTruthy()
})
