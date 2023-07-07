import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { UpdateUserDto } from '../users/dtos/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../users/entities/users.entity';
import { Repository } from 'typeorm';
import { RequestDto } from './dtos/request.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    private readonly jwtService: JwtService,
  ) {}

  public async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersRepository.findOneBy({ email: email });
    const pass = await bcrypt.compare(password, user.password);

    if (user && pass) {
      const { ...result } = user;
      return result;
    }

    return null;
  }

  public async signup(createUserDto: CreateUserDto): Promise<any> {
    let user = new CreateUserDto();

    const existingUser = await this.usersRepository.findOneBy({
      email: createUserDto.email,
    });

    if (existingUser) {
      throw new BadRequestException('Email is already taken!');
    }

    user.email = createUserDto.email;
    user.password = await this.hashPassword(createUserDto.password);

    user = await this.usersRepository.save(user);

    const request = new RequestDto(user);

    const payload = { email: request.email, sub: request.id };

    return new RequestDto({
      id: request.id,
      token: this.jwtService.sign(payload),
    });
  }

  public async signin(user: RequestDto) {
    const payload = { email: user.email, sub: user.id };

    // return {
    //   token: this.jwtService.sign(payload),
    // };

    return new RequestDto({
      id: user.id,
      token: this.jwtService.sign(payload),
    });
  }

  public async get(req: any): Promise<any> {
    const user = await this.usersRepository.findOneBy({ id: req.userId });

    return user;
  }

  public async update(updateUserDto: UpdateUserDto, req: any): Promise<any> {
    const updatedUser = new UpdateUserDto();

    const user = await this.usersRepository.findOneBy({ id: req.userId });

    // if (updateUserDto.email !== user.email) {
    //   updatedUser.email = updateUserDto.email;
    // }

    if (updateUserDto.password !== updateUserDto.retypedPassword) {
      throw new BadRequestException();
    }

    updatedUser.password = await this.hashPassword(updateUserDto.password);

    Object.assign(user, updatedUser);

    return await this.usersRepository.save(user);
  }

  async signout(req: any) {
    const user = await this.usersRepository.findOneBy({ id: req.userId });

    if (!user) {
      throw new BadRequestException();
    }

    return;
  }

  async remove(req: any) {
    const user = await this.usersRepository.findOneBy({ id: req.userId });

    if (!user) {
      throw new BadRequestException();
    }

    return this.usersRepository.remove(user);
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
}
