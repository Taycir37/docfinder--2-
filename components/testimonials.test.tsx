import { render, screen } from "@testing-library/react"
import { Testimonials } from "./testimonials"

describe("Testimonials", () => {
  it("renders testimonials with correct data", () => {
    render(<Testimonials />)

    expect(screen.getByText("Sophie Dupont")).toBeInTheDocument()
    expect(screen.getByText("Marc Lambert")).toBeInTheDocument()
    expect(screen.getByText("Julie Moreau")).toBeInTheDocument()
  })
})