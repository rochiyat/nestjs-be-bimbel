export class CreateUserDto {
  username: string;
  email: string;
  password: string;
  full_name?: string;
  gender?: string;
  birth_date?: Date;
  address?: string;
  phone_number?: string;
}
