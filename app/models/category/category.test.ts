import { CategoryModel } from "./category"

test("can be created", () => {
  const instance = CategoryModel.create({})

  expect(instance).toBeTruthy()
})
