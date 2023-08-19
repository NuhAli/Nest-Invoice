import { PassportStrategy } from "@nestjs/passport";
import {Strategy, ExtractJwt} from "passport-jwt";
import { JwtPayload } from "../types";
import { ConfigService } from "@nestjs/config";

export class AccessTokenStrategy extends PassportStrategy(Strategy,'jwt'){
  constructor(configService: ConfigService) {
    super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
          secretOrKey: configService.get('JWT_SECRET')
      });
  }

  validate(payload: JwtPayload){
    return payload
  }
}