import {vi} from 'vitest'

export function mockUser() {
  vi.mock('@/contexts/contextProvider', async (importOriginal) => {
    const actual: typeof importOriginal = await importOriginal()
    return {
      ...actual,
      useStateContext: vi.fn().mockReturnValue({
        user: {username: 'mockUsername', id: 123},
        token: 'mockToken',
      }),
    }
  })
}
