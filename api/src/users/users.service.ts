import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { PG_CONNECTION } from './../constants';

@Injectable()
export class UsersService {
  constructor(@Inject(PG_CONNECTION) private readonly dbConnection: Pool) {}
}
