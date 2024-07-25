//auth.controller.ts
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { User } from '../users/entities/user.entity';
import {
  responseNonSuccess,
  responseSuccess,
} from '../../common/helpers/response.helpers';
import { Request, Response } from 'express';
import { AuthGuard } from './auth.guard';
import { Profile } from "../../common/decorators/profile.decorator";
import { AuthenticatedRequest } from "../../common/interfaces/profile.interface";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Req() Req: Request,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const login = await this.authService.login(loginDto);
      return responseSuccess(res, login, 'User Logged In', 200);
    } catch (e) {
      return responseNonSuccess(res, e.message, 500);
    }
  }

  @Post('register')
  async register(
    @Body() user: User,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const created = await this.authService.register(user);
      return responseSuccess(res, created, 'User Registered', 200);
    } catch (e) {
      return responseNonSuccess(res, e.message, 500);
    }
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async profile(@Profile() profile: AuthenticatedRequest['profile'], @Res() res: Response) {
    return responseSuccess(res, profile, 'User Profile', 200);
  }
}
