import { render, screen } from "@testing-library/react"
import NewDoctorPage from "./page"
import { BrowserRouter as Router } from "react-router-dom"

describe("NewDoctorPage", () => {
  it("renders the page with the correct heading", () => {
    render(
      <Router>
        <NewDoctorPage />
      </Router>
    )

    expect(screen.getByText("Ajouter un nouveau médecin")).toBeInTheDocument()
    expect(screen.getByText("Retour à la liste")).toBeInTheDocument()
  })
})