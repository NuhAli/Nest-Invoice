import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";
import { RefreshPayload } from "../types";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, "jwt-refresh") {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
      passReqToCallback: true,
      secretOrKey: configService.get("JWT_REFRESH_TOKEN")
    });
  }

  validate(req: Request, payload: RefreshPayload): RefreshPayload {
    const refreshToken = req.get("authorization").replace("Bearer", "").trim();
    return { ...payload, refreshToken };
  }
}