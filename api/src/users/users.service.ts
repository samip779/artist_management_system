import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { PG_CONNECTION } from './../constants';
import { User } from './../models/user.model';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@Inject(PG_CONNECTION) private readonly dbConnection: Pool) {}

  async createUser(user: User): Promise<User> {
    const checkEmailQuery = await this.dbConnection.query(
      `
      SELECT
        id
      FROM users
      WHERE
        email = $1
      LIMIT 1;
      `,
      [user.email],
    );

    if (checkEmailQuery.rowCount > 0) {
      throw new HttpException(
        'user with email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    user.password = await hash(user.password, 10);

    const saveUserQuery = await this.dbConnection.query(
      `
      INSERT INTO users(
      first_name,
      last_name,
      email,
      password,
      phone,
      dob,
      gender,
      role,
      address)

      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *;
      `,
      [
        user.firstName,
        user.lastName,
        user.email,
        user.password,
        user.phone,
        user.dob,
        user.gender,
        user.role,
        user.address,
      ],
    );

    if (saveUserQuery.rows.length > 0) {
      const savedUser = saveUserQuery.rows[0];

      return {
        id: savedUser.id,
        firstName: savedUser.first_name,
        lastName: savedUser.last_name,
        email: savedUser.email,
        dob: savedUser.dob,
        address: savedUser.address,
        phone: savedUser.phone,
        gender: savedUser.gender,
        role: savedUser.role,
      };
    }

    throw new HttpException(
      'something went wrong',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
