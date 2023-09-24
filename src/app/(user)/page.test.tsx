import { render, screen } from '@testing-library/react'
import Home from '@/app/(user)/page'
import { it } from 'node:test'

it(`should have 'groq' query`, () => {
  render(<Home />) //Arrange

  const myEll = screen.getByText('TESTING') //Act

  expect(myEll).toBeInTheDocument()
})