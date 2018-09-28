export interface ServiceObject {
  errorCode: number
  errorMessage: string
  nodeId: string
  validationErrors: Array<any>
  successful: boolean
  apiVersion: number
}

export interface ApiResponse<T> {
  payload: T
  service: ServiceObject
}

export interface Login {
  login: string
  password: string
}

export interface Group {
  id: number
  name: string
}
export interface User {
  id: number
  username: string
  firstName: string
  lastName: string
  email: string
  groups: Array<Group>
}

export interface Person {
  id: number
  name: string
}

export interface Place {
  id: number
  name: string
}

export interface Door {
  id: number
  name: string
  accessId: string
}

export interface Key {
  id: number
  name: string
  accessId: string
  personId: number
}

export interface Role {
  id: number
  name: string
}
export interface Controller {
  id: number
  name: string
  controllerId: string
}

export interface Acl {
  id: number
  placeId: number
  personId: number
  type: number
}

export interface DateTimePattern {
  fromTime: string
  untilTime: string
  daysOfWeek: Array<number>
  daysOfMonth: Array<number>
  months: Array<number>
}

export interface Pattern extends DateTimePattern {
  id: number
  aclId: number
}

export interface ResolvedAcl {
  key: string
  door: string
  type: number
  dateTimePattern: DateTimePattern
}
