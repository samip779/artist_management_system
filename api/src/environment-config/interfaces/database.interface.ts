export interface DatabaseConfig {
  getDatabaseHost(): string;
  getDatabasePort(): number;
  getDatabaseUser(): string;
  getDatabasaePassword(): string;
  getDatabaseName(): string;
}
