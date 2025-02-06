import { Sequelize } from 'sequelize-typescript'
import { Category } from '../../../../domain/category.entity'
import { CategoryModel } from '../category.model'

describe('CategoryModel Integration Tests', () => {
  it('should create a category', async () => {
    const sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      models: [CategoryModel]
    })

    await sequelize.sync({ force: true })

    const category = Category.fake().aCategory().build()

    await CategoryModel.create({
      category_id: category.category_id.id,
      name: category.name,
      description: category.description,
      is_active: category.is_active,
      created_at: category.created_at
    })
  })
})
