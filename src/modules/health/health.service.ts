import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  public get() {
    return { uptime: process.uptime() };
  }
}
