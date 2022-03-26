import { maybe, string } from "../index"

describe("withDefault", () => {
  it("should not effect non-nullable values", () => {
    const result = string.withDefault("DEF").validate("IN")

    expect(result).toBe("IN")
  })

  it("should not effect existing values", () => {
    const result = maybe(string).withDefault("DEF").validate("IN")

    expect(result).toBe("IN")
  })

  it("should defaul null values", () => {
    const result = maybe(string).withDefault("DEF").validate(null)

    expect(result).toBe("DEF")
  })

  it("should defaul undefined values", () => {
    const result = maybe(string).withDefault("DEF").validate(undefined)

    expect(result).toBe("DEF")
  })
})
