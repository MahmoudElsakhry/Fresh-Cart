export interface Login {
    email:string,
    password:string,

}


export interface RegisterInterface extends Login{
    name:string, 
    rePassword:string,
    phone:string

}
