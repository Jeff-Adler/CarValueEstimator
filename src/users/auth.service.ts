import { BadRequestException, Injectable } from '@nestjs/common';
import { randomBytes, scryptSync } from 'crypto';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    // See if email is in use
    const users = await this.usersService.find(email);
    if (users.length) {
      throw new BadRequestException('email in use');
    }

    // Hash the user's password
    // Generate a salt
    const salt = randomBytes(8).toString('hex');

    // Hash the salt and the password together
    const hash = scryptSync(password, salt, 32);

    // Join the hashed result and the salt together
    const result = salt + '.' + hash.toString('hex');

    // Create a new user and save it
    // return the user
  }

  // Bad function name. Really should be something like 'authenticate', maybe?
  signin() {}
}
