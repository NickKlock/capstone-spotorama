import {Author} from "./User";

export interface UserFormInputs {
    username: string
    password: string
    author: Author
}

export interface SpotFormInputs {
    name: string
}