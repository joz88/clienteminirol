//usaurio para hacer login en rol movil diferencias usuario -> USuario solo en enabled-> activo, roles->no existe
export class Usuario {
    id:number;
    username:string;
    password:string;
    enabled:boolean;
    nombre:string;
    apellido:string;
    email:string;
    roles: string[] = [];
  }
  