import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(req: Request) => {
        // Extract the token from the 'token' cookie
        return req?.cookies?.token || null;
      }]),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY, // Ensure this is stored securely
    });
  }

  async validate(payload: any) {
    // The payload can be customized based on the token contents
    return { userId: payload.sub, email: payload.email }; // Attach user data to the request
  }
}
