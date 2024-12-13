import { Injectable } from '@nestjs/common'

@Injectable()
export class AuthService {
  private readonly user = { id: 1, username: 'test@rainapp.com', password: 'rainapp' }

  async validateUser(username: string, password: string): Promise<any> {
    if (username === this.user.username && password === this.user.password) {
      const { password, ...result } = this.user
      return result
    }
    return null
  }
}
