import { array, maybeArray, number } from "../"

describe("maybeArray", () => {
  it("should return same outputs as array with valid inputs", () => {
    const data = [1, 2, 3]

    expect(array(number).validate(data)).toEqual(
      maybeArray(number).validate(data),
    )
  })

  it("should return failed outputs as undefined", () => {
    const data = [1, "test", 3]

    expect(maybeArray(number).validate(data)).toEqual([1, null, 3])
  })
})
