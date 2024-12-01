import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PgModule } from './../pg/pg.module';

@Module({
  imports: [PgModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
