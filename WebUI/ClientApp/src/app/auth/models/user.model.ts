export interface IUser {
    id: number,
    login: string,
    role: UserRole
}

export enum UserRole{
    Admin = 10,
    Manager = 20
}