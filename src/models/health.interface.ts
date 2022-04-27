export interface Health {
  status: HealthStatus;
  deails: string;
}

export enum HealthStatus {
  Healthy,
  Sick,
  TerminallyIll,
}
