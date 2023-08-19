import { JwtPayload } from "./jwtPayload";

export type RefreshPayload = JwtPayload & {refreshToken: string}