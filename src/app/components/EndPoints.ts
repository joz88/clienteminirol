export class EndPoint{
    //public static endpoint:string ='';
    public static endpoint:string ='http://rolmovil.grupomb.mx:8090';
    //public static endpoint:string ='http://localhost:8090';
    
      //AUTORIZACION DE ACCESO
      public static noAutorizado(e,r):boolean{
        if(e.status == 401 || e.status == 403){
          r.navigate(['/login']);
      return true;
        }
      return false;
      }
    }
    