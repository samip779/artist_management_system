import { Module } from '@nestjs/common';
import { EnvironmentConfigService } from './environment-config.service';
import { ConfigModule } from '@nestjs/config';
import { validate } from './environment-config.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './.env',
      ignoreEnvFile: process.env.NODE_ENV !== 'development',
      isGlobal: true,
      validate,
    }),
  ],
  providers: [EnvironmentConfigService],
  exports: [EnvironmentConfigService],
})
export class EnvironmentConfigModule {}
