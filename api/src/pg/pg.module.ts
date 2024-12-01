import { Module, Provider } from '@nestjs/common';
import { PG_CONNECTION } from './../constants';
import { Pool, PoolConfig } from 'pg';
import { EnvironmentConfigService } from './../environment-config/environment-config.service';
import { EnvironmentConfigModule } from './../environment-config/environment-config.module';

export const pgConnection = (config: EnvironmentConfigService): Pool => {
  const pgConfig: PoolConfig = {
    host: config.getDatabaseHost(),
    port: config.getDatabasePort(),
    database: config.getDatabaseName(),
    user: config.getDatabaseUser(),
    password: config.getDatabasaePassword(),
    max: 10,
  };
  return new Pool(pgConfig);
};

const dbProvider: Provider = {
  provide: PG_CONNECTION,
  useFactory: pgConnection,
  inject: [EnvironmentConfigService],
};

@Module({
  providers: [dbProvider],
  exports: [PG_CONNECTION],
  imports: [EnvironmentConfigModule],
})
export class PgModule {}
