import {describe, expect, it, vi, beforeEach} from 'vitest'
import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'
import AccountHeader from '@/components/auth/AccountHeader.tsx'
import {MemoryRouter} from 'react-router-dom'
import {ContextProvider, useStateContext} from '@/contexts/contextProvider.tsx'
import userEvent from '@testing-library/user-event'

vi.mock('@/contexts/contextProvider.tsx', async (importOriginal) => {
  const actual = (await importOriginal()) as any // Import the actual module
  return {
    ...actual,
    useStateContext: vi.fn(),
  }
})

beforeEach(() => {
  vi.clearAllMocks()
})

function renderAccountHeader() {
  render(
    <MemoryRouter>
      <ContextProvider>
        <AccountHeader />
      </ContextProvider>
    </MemoryRouter>
  )
}

async function navigateToLoginOptions() {
  const loginBtn = screen.getByText('Login')
  const user = userEvent.setup()
  await user.click(loginBtn)
  return user
}

describe('AccountHeader Component', () => {
  it('should have sign in button present for not signed in users', () => {
    // @ts-ignore
    useStateContext.mockReturnValue({
      token: null,
      user: null,
    })
    renderAccountHeader()
    expect(screen.getByText('Login')).toBeInTheDocument()
  })

  it('should have account button present for signed in users', () => {
    // @ts-ignore
    useStateContext.mockReturnValue({
      token: '123',
      user: {username: 'John', id: 36},
    })
    renderAccountHeader()

    expect(screen.getByText('Account')).toBeInTheDocument()
  })
  it('should provide sign in and sign-up options when clicked on Login', async () => {
    // @ts-ignore
    useStateContext.mockReturnValue({token: null, user: null})
    renderAccountHeader()
    await navigateToLoginOptions()
    expect(screen.getByText('Sign In')).toBeInTheDocument()
    expect(screen.getByText('Sign Up')).toBeInTheDocument()
  })
  it('should provide login component when clicking sign in', async () => {
    // @ts-ignore
    useStateContext.mockReturnValue({token: null, user: null})
    renderAccountHeader()
    const user = await navigateToLoginOptions()
    const signInBtn = screen.getByText('Sign In')
    await user.click(signInBtn)
    expect(screen.queryByText(/create your account/i)).not.toBeInTheDocument()
    expect(screen.getByText(/log in to your account/i)).toBeInTheDocument()
  })
  it('should provide sign up component when clicking sign up', async () => {
    // @ts-ignore
    useStateContext.mockReturnValue({token: null, user: null})
    renderAccountHeader()
    const user = await navigateToLoginOptions()
    const signUpBtn = screen.getByText('Sign Up')
    await user.click(signUpBtn)
    expect(screen.getAllByText(/create your account/i)).length > 0
    expect(screen.getByText(/confirm password/i)).toBeInTheDocument()
    expect(
      screen.queryByText(/log in to your account/i)
    ).not.toBeInTheDocument()
  })
})
