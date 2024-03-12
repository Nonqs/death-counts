import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User, authUser } from './dto/auth.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post("register")
    registerUser(@Body() newUser: authUser) {

        return this.authService.createUser(newUser)

    }

    @Post("login")
    loginUser(@Body() user: User, @Res({ passthrough: true }) res: Response) {

        return this.authService.loginUser(user, res)

    }

}