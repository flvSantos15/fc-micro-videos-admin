import { IRepository } from '../../shared/domain/repository/repository-interface'
import { Uuid } from '../../shared/domain/value-objects/uuid.vo'
import { Category } from './category.entity'

// A responsabilidade do repositorio e armazenar os dados
// Nao posso ter funcoes de regra de negocio
// Exemplo: changeName()
export interface ICategoryRepository extends IRepository<Category, Uuid> {}
