export type UserAuth = {
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