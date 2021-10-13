import { IUsersRepository } from "../../repositories/users/IUsersRepository";

export class GetUserByAuthToken {
    constructor(private usersRepository: IUsersRepository) {}

    public async execute(authToken: string) {
        const user = await this.usersRepository.getUserByToken(authToken);
        return user;
    }
}