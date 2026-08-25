import {Role} from '../../shared/enums/role.enum';

export interface User {

  id: string;
  username: string;
  role: Role;
}
