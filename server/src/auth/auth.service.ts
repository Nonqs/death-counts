import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User, authUser } from './dto/auth.dto';
import { hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { compareHash } from './utils/handleBcrypt';

@Injectable()
export class AuthService {

  constructor(private prisma: PrismaService, private jwtService: JwtService) { }

  async createUser(newUser: authUser) {

    const { email, password } = newUser

    const findUser = await this.prisma.user.findMany({
      where: {
        email
      }
    })

    if (findUser.length >= 1) {
      throw new HttpException("Email already register", 400)
    }

    const passwordHash = await hash(password, 10)

    newUser = { ...newUser, password: passwordHash }

    await this.prisma.user.create({
      data: {
        email: newUser.email,
        password: newUser.password,
        username: newUser.password
      }
    })

    const user = await this.prisma.user.findFirst({
      where: {
        email
      }
    })

    const payload = { id: user.id, name: user.username }
    const token = this.jwtService.sign(payload)

    const data = {
      user: user,
      token
    }

    return data

  }

  async loginUser(user: User) {

    const { email, password } = user

    const findUser = await this.prisma.user.findFirst({
      where: {
        email
      }
    })

    if (!findUser) {
      throw new HttpException("Email not register", 400)
    }

    const isCheck = await compareHash(password, findUser.password);

    if (!isCheck)
      throw new HttpException('PASSWORD_INVALID', 404);

      const payload = { id: findUser.id, name: findUser.username }
      const token = this.jwtService.sign(payload)
  
      const data = {
        user: findUser,
        token
      }

    return data;

  }
}
