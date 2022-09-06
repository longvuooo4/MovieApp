import { DetailModel } from "./detail"

test("can be created", () => {
  const instance = DetailModel.create({})

  expect(instance).toBeTruthy()
})
