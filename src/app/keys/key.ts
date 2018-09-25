import { Person } from '../personnel/person'
export interface Key {
  id: number
  name: string
  accessKey: string
  person: Person
}
