import { EntityValidationError } from '../../../shared/domain/validators/validation.error'
import { Uuid } from '../../../shared/domain/value-objects/uuid.vo'
import { Category } from '../category.entity'

describe('Category Unit Tests', () => {
  let validateSpy: any

  beforeEach(() => {
    validateSpy = jest.spyOn(Category, 'validate')
  })

  it('should create a category with default values', () => {
    const category = Category.create({
      name: 'Movie'
    })

    expect(category.category_id).toBeInstanceOf(Uuid)
    expect(category.name).toBe('Movie')
    expect(category.description).toBeNull()
    expect(category.is_active).toBeTruthy()
    expect(category.created_at).toBeInstanceOf(Date)
    expect(validateSpy).toHaveBeenCalledTimes(1)
  })

  it('should create a category with all values', () => {
    const category = Category.create({
      name: 'Movie',
      description: 'Movie description',
      is_active: false
    })

    expect(category.category_id).toBeInstanceOf(Uuid)
    expect(category.name).toBe('Movie')
    expect(category.description).toBe('Movie description')
    expect(category.is_active).toBe(false)
    expect(category.created_at).toBeInstanceOf(Date)
  })

  it('should create a category with name and description', () => {
    const category = Category.create({
      name: 'Movie',
      description: 'another description'
    })

    expect(category.category_id).toBeInstanceOf(Uuid)
    expect(category.name).toBe('Movie')
    expect(category.description).toBe('another description')
    expect(category.is_active).toBeTruthy()
    expect(category.created_at).toBeInstanceOf(Date)
  })

  it('should deactivate a category', () => {
    const category = Category.create({
      name: 'Movie',
      description: 'another description'
    })

    expect(category.category_id).toBeInstanceOf(Uuid)
    expect(category.name).toBe('Movie')
    expect(category.description).toBe('another description')
    expect(category.is_active).toBe(true)

    category.deactivate()

    expect(category.is_active).toBe(false)
  })

  it('should activate a category', () => {
    const category = Category.create({
      name: 'Movie',
      description: 'another description',
      is_active: false
    })

    expect(category.category_id).toBeInstanceOf(Uuid)
    expect(category.name).toBe('Movie')
    expect(category.description).toBe('another description')
    expect(category.is_active).toBe(false)

    category.activate()

    expect(category.is_active).toBe(true)
  })

  it('should change a category name', () => {
    const category = Category.create({
      name: 'Movie'
    })

    expect(category.category_id).toBeInstanceOf(Uuid)
    expect(category.name).toBe('Movie')
    expect(category.is_active).toBeTruthy()
    expect(category.created_at).toBeInstanceOf(Date)

    category.changeName('Movie 2')

    expect(category.name).toBe('Movie 2')
    expect(validateSpy).toHaveBeenCalledTimes(2)
  })
})

describe('Category validator', () => {
  describe('create command', () => {
    const arrange = []
    it('should invalid categoru with name proprety', () => {
      expect(() => Category.create({ name: null })).containsErrorMessages({
        name: [
          'name should not be empty',
          'name must be a string',
          'name must be shorter than or equal to 255 characters'
        ]
      })

      expect(() => Category.create({ name: '' })).containsErrorMessages({
        name: ['name should not be empty']
      })

      expect(() => Category.create({ name: 5 as any })).containsErrorMessages({
        name: [
          'name must be a string',
          'name must be shorter than or equal to 255 characters'
        ]
      })

      expect(() =>
        Category.create({ name: 't'.repeat(256) })
      ).containsErrorMessages({
        name: ['name must be shorter than or equal to 255 characters']
      })
    })

    it('should invalid category using description property', () => {
      expect(() =>
        Category.create({ name: 'Movie', description: 5 as any })
      ).containsErrorMessages({
        description: ['description must be a string']
      })
    })
  })
})
