import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request, Response } from 'express';
import { responseSuccess } from '../../common/helpers/response.helpers';
import { Public } from '../../common/decorators/public.decorator';
import { ValidationPipe } from '../../common/pipes/validation.pipe';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const created = await this.usersService.create(createUserDto);
    return responseSuccess(res, created, 'User created', 201);
  }

  @Public()
  @Get()
  async findAll(@Req() req: Request, @Res() res: Response) {
    const users = await this.usersService.findAll();
    if (users.length === 0) {
      return res.status(404).send({ message: 'No users found' });
    }
    return responseSuccess(res, users, 'Users found');
  }

  @Get(':id')
  async findOne(
    @Param('id', new ValidationPipe()) id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const findOne = await this.usersService.findOne(+id);
    return responseSuccess(res, findOne, 'User found');
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const updated = await this.usersService.update(+id, updateUserDto);
    return responseSuccess(res, updated, 'User updated');
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const deleted = await this.usersService.remove(+id);
    return responseSuccess(res, deleted, 'User deleted');
  }

  @Get('insert-sample-data')
  insertSampleData() {
    return this.usersService.insertSampleData();
  }

  // get all users
  @Get()
  async getUsers(@Req() req: Request, @Res() res: Response) {
    const users = await this.usersService.findAll();
    return responseSuccess(res, users, 'Users found');
  }
}
