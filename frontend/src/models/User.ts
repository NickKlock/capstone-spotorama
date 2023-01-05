export type NewUserRequest = {
    username: string;
    password: string;
    author: Author;
}

export type Author = {
    nickname: string;
    firstName: string;
    lastName: string;
    createdSpots: string[];
}

export type UserSpot = {
    id: string;
    username: string;
    author: Author;
}

export type UserLoginRequest = {
    username: string,
    password: string
}