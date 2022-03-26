import { allowMapping, disallowMapping, string } from "../index"

describe("disallowMapping", () => {
  beforeEach(() => {
    disallowMapping()
  })

  afterEach(() => {
    allowMapping()
  })

  it("should throw when mapping is disabled", () => {
    expect(() =>
      string.map(s => s.toUpperCase()).isValid("lower"),
    ).toThrowError()
  })
})
