import { render, screen } from '@testing-library/react'
import Home from '@/app/(user)/page'

it(`should have groq query`, async () => {
  // render(<Home />) //Arrange
  render(await Home())

  const myEll = screen.getByText(/TESTING/i) //Act

  expect(myEll).toBeInTheDocument() //Assert
})