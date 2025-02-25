import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/preact'
import Random from '../src/components/Random'

describe('Random Component', () => {
  it('renders correctly', () => {
    render(<Random />)
    screen.debug() // Logs the DOM structure
    const element = screen.getByText('Random Component')
    expect(element).toBeDefined()
  })
})