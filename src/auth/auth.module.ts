import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { AccessTokenStrategy, RefreshTokenStrategy } from "./stratergy";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [JwtModule.register({}),PrismaModule],
  providers: [AuthService,AccessTokenStrategy,RefreshTokenStrategy],
  controllers: [AuthController]
})
export class AuthModule {
}
