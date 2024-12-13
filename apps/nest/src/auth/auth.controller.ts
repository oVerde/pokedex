import { Controller, Post, Body } from '@nestjs/common'
import { AuthService } from './auth.service'

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth/login')
  async login(@Body() body): Promise<any> {
    const { username, password } = body
    const user = await this.authService.validateUser(username, password)
    if (user) {
      return { success: true, user }
    } else {
      return { success: false, message: 'Invalid credentials' }
    }
  }
}
