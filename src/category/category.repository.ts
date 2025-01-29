import { Category } from './domain/category.entity'

// A responsabilidade do repositorio e armazenar os dados
// Nao posso ter funcoes de regra de negocio
// Exemplo: changeName()
export interface CategoryRepository {
  insert(entity: Category): Promise<void>
  find(entity: Category): Promise<Category>
  findAll(): Promise<Category[]>
  update(entity: Category): Promise<void>
  delete(entity: Category): Promise<void>
}
