import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async findAll() {
    const users = await this.usersRepository.find({
      relations: ['playedboardgames', 'wanttoplayboardgames'],
    });

    return users;
  }

  async findOne(id: number) {
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

  async create(email: string, password: string) {
    const user = this.usersRepository.create({ email, password });

    return this.usersRepository.save(user);
  }

  async update(id: number, attrs: Partial<Users>) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    Object.assign(user, attrs);

    return this.usersRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return this.usersRepository.remove(user);
  }
}
