import { demoStorage, hasDemoData } from "./demo-storage"

describe("demoStorage", () => {
  it("stores and retrieves data correctly", () => {
    demoStorage.setItem("testKey", "testValue")
    expect(demoStorage.getItem("testKey")).toBe("testValue")
  })

  it("checks if demo data exists", () => {
    demoStorage.setItem("demoData", JSON.stringify({ key: "value" }))
    expect(hasDemoData()).toBe(true)
  })
})