import { InvalidUuidError, Uuid } from '../uuid.vo'

describe('Uuid Unit Tests', () => {
  const validateSpy = jest.spyOn(Uuid.prototype as any, 'validate')

  it('should throw error when uuid is invalid', () => {
    expect(() => {
      new Uuid('Invalid uuid')
    }).toThrow(new InvalidUuidError())
    expect(validateSpy).toHaveBeenCalledTimes(1)
  })

  it('should create a valid uuid', () => {
    const uuid = new Uuid()

    expect(uuid.id).toBeDefined()
    expect(validateSpy).toHaveBeenCalledTimes(1)
  })

  it('should accept a valid uuid', () => {
    const uuid = new Uuid('e3b0c442-68ce-11e9-a8b3-2d2ae2dbcce4')

    expect(uuid.id).toBe('e3b0c442-68ce-11e9-a8b3-2d2ae2dbcce4')
    expect(validateSpy).toHaveBeenCalledTimes(1)
  })
})
