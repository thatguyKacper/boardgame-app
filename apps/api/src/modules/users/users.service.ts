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
  private readonly logger = new Logger(UsersService.name);
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

  async findOneById(id: number) {
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

  async findOneByEmail(email: string): Promise<Users | undefined> {
    const user = await this.usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      this.logger.debug(`User with email: ${email} not found!`);
      throw new UnauthorizedException();
    }

    return user;
  }

  async create(email: string, password: string) {
    const user = this.usersRepository.create({ email, password });

    return this.usersRepository.save(user);
  }

  async update(id: number, attrs: Partial<Users>) {
    const user = await this.findOneById(id);

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    Object.assign(user, attrs);

    return this.usersRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOneById(id);

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return this.usersRepository.remove(user);
  }
}
