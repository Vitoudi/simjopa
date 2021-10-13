export interface IPasswordEncryptor {
    encrypt: (password: string) => Promise<string>;
    compare: (password: string, hashPassword: string) => Promise<boolean>; 
}