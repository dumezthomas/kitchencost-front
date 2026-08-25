import {UUID} from '../types/uuid';
import {Role} from '../../shared/enums/role.enum';


export interface User {

  id: UUID;
  username: string;
  role: Role;
}
