import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import AuthenticationModal from '../app/components/auth/index'

vi.mock('../app/components/hooks/useGlobals', () => ({
  useGlobals: () => ({ setAuthMember: vi.fn() }),
}))

vi.mock('../app/services/MemberService', () => ({
  default: vi.fn().mockImplementation(() => ({
    login: vi.fn().mockResolvedValue({}),
    signup: vi.fn().mockResolvedValue({}),
  })),
}))

vi.mock('sonner', () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}))

const defaultProps = {
  signupOpen: false,
  loginOpen: false,
  handleSignupClose: vi.fn(),
  handleLoginClose: vi.fn(),
}

describe('AuthenticationModal', () => {
  beforeEach(() => vi.clearAllMocks())

  it('renders login modal with correct fields', () => {
    render(<AuthenticationModal {...defaultProps} loginOpen={true} />)
    expect(screen.getByLabelText('Username')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(screen.getByText('Sign In')).toBeInTheDocument()
  })

  it('renders signup modal with correct fields', () => {
    render(<AuthenticationModal {...defaultProps} signupOpen={true} />)
    expect(screen.getByLabelText('Username')).toBeInTheDocument()
    expect(screen.getByLabelText('Phone Number')).toBeInTheDocument()
    expect(screen.getByText('Sign Up')).toBeInTheDocument()
  })

  it('updates login username input on change', () => {
    render(<AuthenticationModal {...defaultProps} loginOpen={true} />)
    const input = screen.getByLabelText('Username')
    fireEvent.change(input, { target: { value: 'xushnudbek' } })
    expect(input).toHaveValue('xushnudbek')
  })

  it('calls handleLoginClose when close button clicked', () => {
    const handleLoginClose = vi.fn()
    render(<AuthenticationModal {...defaultProps} loginOpen={true} handleLoginClose={handleLoginClose} />)
    fireEvent.click(screen.getByTestId('CloseIcon').closest('button')!)
    expect(handleLoginClose).toHaveBeenCalledOnce()
  })
})