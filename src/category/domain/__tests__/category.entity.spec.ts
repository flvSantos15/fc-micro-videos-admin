import { Uuid } from '../../../shared/domain/value-objects/uuid.vo'
import { Category } from '../category.entity'

describe('Category Unit Tests', () => {
  it('should create a category with default values', () => {
    const category = new Category({
      name: 'Movie'
    })

    expect(category.category_id).toBeInstanceOf(Uuid)
    expect(category.name).toBe('Movie')
    expect(category.description).toBeNull()
    expect(category.is_active).toBeTruthy()
    expect(category.created_at).toBeInstanceOf(Date)
  })

  it('should create a category with all values', () => {
    const category_id = new Uuid()
    const created_at = new Date()

    const category = new Category({
      category_id,
      name: 'Movie',
      description: 'Movie description',
      is_active: false,
      created_at
    })

    expect(category.category_id).toBe(category_id)
    expect(category.name).toBe('Movie')
    expect(category.description).toBe('Movie description')
    expect(category.is_active).toBe(false)
    expect(category.created_at).toBe(created_at)
  })

  it('should create a category with name and description', () => {
    const category = new Category({
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
    const category = new Category({
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
    const category = new Category({
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
    const category = new Category({
      name: 'Movie',
      description: 'another description'
    })

    expect(category.category_id).toBeInstanceOf(Uuid)
    expect(category.name).toBe('Movie')
    expect(category.description).toBe('another description')
    expect(category.is_active).toBeTruthy()
    expect(category.created_at).toBeInstanceOf(Date)

    category.changeName('Movie 2')

    expect(category.name).toBe('Movie 2')
  })
})
