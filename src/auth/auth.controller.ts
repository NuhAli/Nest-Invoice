import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthenticationDto } from "./dtos";
import { Tokens } from "./types/tokens";
import { User } from "../common/decorators";
import { JwtPayload } from "./types";
import { AtGuard } from "../common/guards";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("signup")
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() authDto: AuthenticationDto): Promise<Tokens> {
    return this.authService.signUp(authDto);
  }

  @Post("signin")
  signIn(@Body() authDto:AuthenticationDto): Promise<Tokens> {
    return this.authService.signIn(authDto);
  }

  @UseGuards(AtGuard)
  @Post("signout")
  @HttpCode(HttpStatus.OK)
  signOut(@User() user:JwtPayload): Promise<void> {
    const {sub} = user
    return this.authService.signOut(sub)
  }
}
