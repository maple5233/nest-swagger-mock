import { main } from '@/index'

describe('testing index.ts', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should print 1', () => {
    jest.spyOn(console, 'log').mockImplementation(() => null)
    main()
    expect(console.log).toHaveBeenCalledWith('1')
    expect(console.log).toHaveBeenCalledTimes(1)
  })
})
