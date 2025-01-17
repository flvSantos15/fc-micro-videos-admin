import { ValueObject } from '../value-object'

class StringValueObject extends ValueObject {
  constructor(readonly value: string) {
    super()
  }
}

class ComplexStringValueObject extends ValueObject {
  constructor(readonly prop1: string, readonly prop2: number) {
    super()
  }
}

describe('ValueObject Unit Tests', () => {
  it('should be equals', () => {
    const valueObject1 = new StringValueObject('value')
    const valueObject2 = new StringValueObject('value')

    expect(valueObject1.equals(valueObject2)).toBeTruthy()

    const complexValueObject1 = new ComplexStringValueObject('value', 1)
    const complexValueObject2 = new ComplexStringValueObject('value', 1)

    expect(complexValueObject1.equals(complexValueObject2)).toBeTruthy()
  })
})
