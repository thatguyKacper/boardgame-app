import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { UpdateUserDto } from '../users/dtos/update-user.dto';
import { RequestDto } from './dtos/request.dto';
import { UsersService } from '../users/users.service';
import { UserDto } from '../users/dtos/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  public async validateUser(userDto: UserDto): Promise<any> {
    const user = await this.usersService.getUserWithEmail(userDto.email);

    if (!user) {
      return;
    }

    const pass = await bcrypt.compare(userDto.password, user.password);

    if (!pass) {
      throw new ForbiddenException('Incorrect email or password!');
    }

    if (user && pass) {
      const { ...result } = user;
      return result;
    }

    return null;
  }

  public async signup(createUserDto: CreateUserDto): Promise<RequestDto> {
    const existingUser = await this.usersService.getUserWithEmail(
      createUserDto.email,
    );

    if (existingUser) {
      throw new BadRequestException('Email is already taken!');
    }

    const newUser = new CreateUserDto();

    newUser.email = createUserDto.email;
    newUser.password = await this.hashPassword(createUserDto.password);

    const user = await this.usersService.createUser(newUser);

    const payload = {
      email: user.generatedMaps[0].email,
      sub: user.generatedMaps[0].id,
    };

    return {
      id: payload.sub,
      token: this.jwtService.sign(payload),
    };
  }

  public async signin(userDto: UserDto): Promise<RequestDto> {
    if (!userDto) {
      throw new NotFoundException();
    }

    const payload = { email: userDto.email, sub: userDto.id };

    return {
      id: userDto.id,
      token: this.jwtService.sign(payload),
    };
  }

  public async update(
    updateUserDto: UpdateUserDto,
    user: RequestDto,
    param: number,
  ) {
    if (user.id !== param) {
      throw new UnauthorizedException();
    }

    if (updateUserDto.password !== updateUserDto.retypedPassword) {
      throw new BadRequestException('Password are not identical!');
    }

    const updatedUser = new UpdateUserDto();

    updatedUser.password = await this.hashPassword(updateUserDto.password);

    return this.usersService.updateUser(updatedUser, user.id);
  }

  async remove(userDto: UserDto, param: number) {
    if (userDto.id !== param) {
      throw new UnauthorizedException();
    }

    return this.usersService.removeUser(userDto.id);
  }
}
