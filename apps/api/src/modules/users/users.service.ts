import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  public async findAll(): Promise<Users[] | undefined> {
    const users = await this.usersRepository.find({
      relations: ['playedboardgames', 'wanttoplayboardgames'],
    });

    return users;
  }

  public async findOneById(id: number): Promise<Users | undefined> {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
      relations: ['playedboardgames', 'wanttoplayboardgames'],
    });

    if (!id || !user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return user;
  }

  public async findOneByEmail(email: string): Promise<Users | undefined> {
    const user = await this.usersRepository.findOne({
      where: { email },
      relations: ['playedboardgames', 'wanttoplayboardgames'],
    });

    if (!user) {
      throw new NotFoundException(`User #${email} not found`);
    }

    return user;
  }
}
