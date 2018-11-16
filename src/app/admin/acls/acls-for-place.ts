import { Acl } from '../common.interfaces';
import { AclType } from './acls.service';

export class AclsForPlace {
  allow: Acl;
  disallow: Acl;

  constructor() {}

  add(acl: Acl) {
    if (acl.type === AclType.Allow) {
      this.allow = acl;
    } else {
      this.disallow = acl;
    }
  }
  remove(id: number) {
    if (this.allow && id === this.allow.id) {
      this.allow = null;
    }
    if (this.disallow && id === this.disallow.id) {
      this.disallow = null;
    }
  }
}
