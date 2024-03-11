import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User, authUser } from './dto/auth.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post("register")
    registerUser(@Body() newUser: authUser) {

        return this.authService.createUser(newUser)

    }

    @Post("login")
    loginUser(@Body() user: User) {

        return this.authService.loginUser(user)

    }
}