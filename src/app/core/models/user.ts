import {Role} from '../../shared/enums/role.enum';


export interface User {

  username: string;
  restaurantName: string;
  role: Role;
}
