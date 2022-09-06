import { ListMoviesModel } from "./list-movies"

test("can be created", () => {
  const instance = ListMoviesModel.create({})

  expect(instance).toBeTruthy()
})
