import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import * as bcrypt from "bcrypt";
import { AuthenticationDto } from "./dtos";
import { JwtService } from "@nestjs/jwt";
import { Tokens } from "./types/tokens";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService, private jwtService: JwtService, private configService: ConfigService) {
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async generateTokens(email: string, id: number): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync({ sub: id, email }, {
        secret: this.configService.get("JWT_SECRET"),
        expiresIn: 60 * 15
      }),
      this.jwtService.signAsync({ sub: id, email }, {
        secret: this.configService.get("JWT_REFRESH_TOKEN"),
        expiresIn: 60 * 60 * 15
      })
    ]);

    return {
      access_token: at,
      refresh_token: rt
    };
  }

  async hashRt(token: string, id: number) {
    const hashedRt = await bcrypt.hash(token, 10);
    await this.prismaService.user.update({
      where: {
        id
      },
      data: {
        hashedRt
      }
    });
  }

  async comparePassword(password: string, encryptedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, encryptedPassword);
  }

  async signUp(authDto: AuthenticationDto) {
    try {
      const hash = await this.hashPassword(authDto.password);
      const newUser = await this.prismaService.user.create({
        data: {
          email: authDto.email,
          hash
        }
      });
      const tokens = await this.generateTokens(authDto.email, newUser.id);
      await this.hashRt(tokens.refresh_token, newUser.id);
      return tokens;
    } catch (e) {
      console.log(e);
    }
  }

  async signIn(authDto: AuthenticationDto): Promise<Tokens> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          email: authDto.email
        }
      });

      if (!user) new ForbiddenException("Access Denied");

      const passwordComparison = await this.comparePassword(authDto.password, user.hash);

      if (!passwordComparison) new ForbiddenException("Access Denied");
      const tokens = await this.generateTokens(authDto.email, user.id);
      await this.hashRt(tokens.refresh_token, user.id);
      return tokens;
    } catch (e) {
      console.log(e);
    }
  }

  async signOut(userId: number) {
    await this.prismaService.user.update({
      where: {
        id: userId,
        hashedRt: {
          not: null
        }
      },
      data: {
        hashedRt: null
      }
    });
  }
}
