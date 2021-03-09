import { nonEmptyArray, string } from "../index"

describe("nonEmptyArray", () => {
  it("should not allow empty arrays", () => {
    expect(() => nonEmptyArray(string).validate([])).toThrow()
  })

  it("should allow non-empty arrays", () => {
    expect(() => nonEmptyArray(string).validate(["test"])).not.toThrow()
  })
})
