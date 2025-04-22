import { createParseMock } from "./parse-service"

describe("createParseMock", () => {
  it("creates a mock Parse object for demo mode", () => {
    const result = createParseMock()
    expect(result).toBe(true)
    expect(window.Parse).toBeDefined()
    expect(window.Parse.User).toBeDefined()
  })

  it("allows user sign-up in demo mode", async () => {
    createParseMock()
    const user = await window.Parse.User.signUp("demoUser", "password123")
    expect(user.username).toBe("demoUser")
  })
})