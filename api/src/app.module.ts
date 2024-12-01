import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SongsModule } from './songs/songs.module';
import { ArtistsModule } from './artists/artists.module';
import { AuthModule } from './auth/auth.module';
import { PgModule } from './pg/pg.module';
import { EnvironmentConfigModule } from './environment-config/environment-config.module';

@Module({
  imports: [
    UsersModule,
    SongsModule,
    ArtistsModule,
    AuthModule,
    PgModule,
    EnvironmentConfigModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
