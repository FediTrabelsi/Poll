export interface User{
    _id: string;
    username: string;
    created: Date;
    role: string;
    polls: Array<any>
}