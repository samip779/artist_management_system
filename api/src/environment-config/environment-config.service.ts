import { Injectable } from '@nestjs/common';
import { DatabaseConfig } from './interfaces/database.interface';
import { ConfigService } from '@nestjs/config';
import { GeneralConfig } from './interfaces/general.interface';
import { JWTConfig } from './interfaces/jwt.interface';
import { Environment } from './environment-config.validation';

@Injectable()
export class EnvironmentConfigService
  implements DatabaseConfig, GeneralConfig, JWTConfig
{
  constructor(private readonly configService: ConfigService) {}
  getJwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET');
  }
  getJwtExpirationTime(): string {
    return this.configService.get<string>('JWT_EXPIRATION_TIME');
  }
  getJwtRefreshSecret(): string {
    return this.configService.get<string>('JWT_REFRESH_SECRET');
  }
  getJwtRefreshExpirationTime(): string {
    return this.configService.get<string>('JWT_REFRESH_EXPIRATION_TIME');
  }
  getPort(): number {
    return this.configService.get<number>('PORT');
  }
  getNodeEnv(): Environment {
    return this.configService.get<Environment>('NODE_ENV');
  }

  getDatabaseHost(): string {
    return this.configService.get<string>('DATABASE_HOST');
  }
  getDatabasePort(): number {
    return this.configService.get<number>('DATABASE_PORT');
  }
  getDatabaseUser(): string {
    return this.configService.get<string>('DATABASE_USER');
  }
  getDatabasaePassword(): string {
    return this.configService.get<string>('DATABASE_PASSWORD');
  }
  getDatabaseName(): string {
    return this.configService.get<string>('DATABASE_NAME');
  }
}
