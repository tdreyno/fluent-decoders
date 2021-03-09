import { object, string, number } from "../index"

describe("refine", () => {
  it("should default to identity refinement", () => {
    type Person = {
      name: string
    }

    const test: Person = object({ name: string }).refine<Person>().validate({
      name: "Test",
    })

    expect(test.name).toBe("Test")
  })

  it("should refinement types based on predicate", () => {
    type PositiveNumber = number
    const positiveNumberDecoder = number.refine(
      (num: number): num is PositiveNumber => num >= 0,
      "Must be positive number",
    )

    const test: PositiveNumber = positiveNumberDecoder.validate(5)
    expect(test).toBe(5)

    expect(() => positiveNumberDecoder.validate(-5)).toThrow()
  })
})
