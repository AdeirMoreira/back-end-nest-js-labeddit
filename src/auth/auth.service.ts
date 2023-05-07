import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, senhaUsuario: string) {
    const user: Partial<User> | null = await this.userService.findByEmail(
      email,
    );

    if (!user) {
      throw new NotFoundException();
    }

    if (user?.senha !== senhaUsuario) {
      throw new UnauthorizedException();
    }

    const payload = { username: user.userName, sub: user.idUser };

    const token = await this.jwtService.signAsync(payload);

    user && delete user.senha;

    return { user, token };
  }
}
