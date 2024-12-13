import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from './auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super() // Optionally, configure the strategy here
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password)
    if (!user) {
      throw new UnauthorizedException() // Throw an error if validation fails
    }
    return user // Passport attaches the user object to the request
  }
}
