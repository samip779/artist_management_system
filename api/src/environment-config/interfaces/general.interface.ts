export interface GeneralConfig {
  getPort(): number;
  getNodeEnv(): 'development' | 'production';
}
