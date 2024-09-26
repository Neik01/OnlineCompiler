
export interface CodeRoom {
    id: string;
    name:string;
    content: string | null;
    owner: User;
}

export interface User{
  id:string;
  email:string;
  username:string;
}

