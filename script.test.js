import { checkUserAuthentication } from "./script"

describe("checkUserAuthentication", () => {
  beforeEach(() => {
    // Set up the DOM structure
    document.body.innerHTML = `
      <div class="auth-buttons">
        <button class="user-menu-btn"></button>
        <div class="user-dropdown"></div>
      </div>
    `
  })

  it("adds event listeners to user menu button", () => {
    checkUserAuthentication()

    const userMenuBtn = document.querySelector(".user-menu-btn")
    const userDropdown = document.querySelector(".user-dropdown")

    // Simulate a click on the user menu button
    userMenuBtn.click()
    expect(userDropdown.classList.contains("active")).toBe(true)

    // Simulate a click outside the dropdown
    document.body.click()
    expect(userDropdown.classList.contains("active")).toBe(false)
  })
})