export interface LoginResponse{

    token:string
    username:string
    id:string
    email:string
}

export interface UserInfo{

    username?:string
    email?:string
    firstname?:string
    lastname?:string
    token?:string
}