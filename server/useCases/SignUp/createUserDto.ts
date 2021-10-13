import { UserRole } from "../../entities/User";

export interface CreateUserDto {
    name: string;
    password: string;
    email: string;
    imgFileName?: string;
    id?: number;
    role?: UserRole;
}