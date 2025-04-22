import { render, screen } from "@testing-library/react"
import { DoctorForm } from "./doctor-form"

describe("DoctorForm", () => {
  it("renders the form with required fields", () => {
    render(<DoctorForm />)

    expect(screen.getByLabelText(/Nom du médecin/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Spécialité/i)).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /Enregistrer/i })).toBeInTheDocument()
  })
})