import { iso8601String } from "../index"

describe("iso8601String", () => {
  it("should invalidate other strings", () => {
    expect(() => {
      iso8601String.validate("test")
    }).toThrow()
  })

  it("should validate a iso8601 string", () => {
    const dateStr = "2011-10-05T14:48:00.000Z"

    expect(() => {
      const result = iso8601String.validate(dateStr)
      expect(result).toBe(dateStr)
    }).not.toThrow()
  })
})
