import { Entity } from '../../../../shared/domain/entity'
import { SearchParams } from '../../../../shared/domain/repository/search-params'
import { SearchResult } from '../../../../shared/domain/repository/search-result'
import { Uuid } from '../../../../shared/domain/value-objects/uuid.vo'
import { Category } from '../../../domain/category.entity'
import { ICategoryRepository } from '../../../domain/category.repository'
import { CategoryModel } from './category.model'

export class CategorySequelizeRepository implements ICategoryRepository {
  sortableFields: string[] = ['name', 'created_at']

  constructor(private categoryModel: typeof CategoryModel) {}

  async insert(entity: Category): Promise<void> {
    await this.categoryModel.create({
      category_id: entity.category_id.id,
      name: entity.name,
      description: entity.description,
      is_active: entity.is_active,
      created_at: entity.created_at
    })
  }

  async bulkInsert(entities: Category[]): Promise<void> {
    await this.categoryModel.bulkCreate(
      entities.map((item) => ({
        category_id: item.category_id.id,
        name: item.name,
        description: item.description,
        is_active: item.is_active,
        created_at: item.created_at
      }))
    )
  }

  async update(entity: Category): Promise<void> {}

  async delete(entity_id: Uuid): Promise<void> {}

  async findById(entity_id: Uuid): Promise<Category | null> {
    const model = await this.categoryModel.findByPk(entity_id.id)

    return new Category({
      category_id: entity_id,
      name: model.name,
      description: model.description,
      is_active: model.is_active,
      created_at: model.created_at
    })
  }

  async findAll(): Promise<Category[]> {
    const models = await this.categoryModel.findAll()

    return models.map((model) => {
      return new Category({
        category_id: new Uuid(model.category_id),
        name: model.name,
        description: model.description,
        is_active: model.is_active,
        created_at: model.created_at
      })
    })
  }

  getEntity(): new (...args: any[]) => Category {
    return Category
  }

  search(props: SearchParams<string>): Promise<SearchResult<Entity>> {}
}
