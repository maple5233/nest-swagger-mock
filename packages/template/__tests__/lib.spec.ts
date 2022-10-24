import { foo } from '@/lib'

describe('testing lib.ts', () => {
  it('foo should be 1', () => {
    expect(foo).toBe('1')
  })
})
