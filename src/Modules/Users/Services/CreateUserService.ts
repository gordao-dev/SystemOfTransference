import { injectable, inject } from "tsyringe";

import IHashProvider from "../../../Shared/Containers/HashProvider/Models/IHashProvider";
import AppError from "../../../Shared/Errors/AppError";
import User from "../Infra/TypeORM/Entities/User";
import ICreateUserDTO from "../DTOs/ICreateUserDTO";
import IUsersRepository from "../Repositories/IUsersRepository";

@injectable()
class CreateUserService {
  constructor(
    @inject("UsersRepositoroy")
    private usersRepository: IUsersRepository,

    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {}

  public async execute({ email, password }: ICreateUserDTO): Promise<User> {
    const parsedEmail = email.toLocaleLowerCase();

    const userExists = await this.usersRepository.findByEmail(parsedEmail);

    if (userExists) {
      throw new AppError("This email is already in use", 401);
    }

    const hashedPassword = await this.hashProvider.encrypt(password);

    const user = await this.usersRepository.create({
      email: parsedEmail,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
