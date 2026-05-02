import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

describe('Vitest Setup', () => {
  it('should work correctly', () => {
    expect(1 + 1).toBe(2)
  })

  it('renders a basic element', () => {
    render(<div>X-Laptop</div>)
    expect(screen.getByText('X-Laptop')).toBeInTheDocument()
  })
})