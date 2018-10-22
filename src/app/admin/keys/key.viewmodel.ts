import { Key, Person } from '../common.interfaces';

export interface KeyViewModel extends Key {
  person: Person;
}
