//auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const result = await this.usersService.signIn(loginDto);
    if (!result) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { username: result.username, sub: result.user_id };
    const accessToken = this.jwtService.sign(payload);
    return {
      user: result,
      accessToken,
    };
  }

  async register(user: User) {
    try {
      console.log('user', user);
      const newUser = await this.usersService.create(user);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = newUser;
      return result;
    } catch (error) {
      throw new Error('Error creating new user');
    }
  }
}
