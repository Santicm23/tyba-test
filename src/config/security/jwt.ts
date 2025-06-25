import jwt, { SignOptions } from 'jsonwebtoken';
import { instanceToPlain } from 'class-transformer';

import env from '@/config/environment';

export default class JWTAdapter {
  static generateToken(
    payload: object,
    duration: SignOptions['expiresIn'] = '4h',
  ): string {
    return jwt.sign(instanceToPlain(payload), env.JWT_SIGNING_KEY, {
      expiresIn: duration,
    });
  }

  static verifyToken<T>(token: string): T | undefined {
    try {
      return jwt.verify(token, env.JWT_SIGNING_KEY) as T;
    } catch (error) {
      console.error('JWT verification failed:', error);
    }
  }

  static decodeToken<T>(token: string): T | undefined {
    try {
      return jwt.decode(token) as T;
    } catch (error) {
      console.error('JWT decoding failed:', error);
    }
  }
}
