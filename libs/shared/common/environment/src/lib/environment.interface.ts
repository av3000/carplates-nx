export interface Environment {
  production: boolean;
  apiUrl: string;
  port: string;
  sentryDsn: string;
  sentryEnabled: boolean;
}
