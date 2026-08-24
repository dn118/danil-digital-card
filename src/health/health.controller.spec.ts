import { HealthController } from './health.controller';

describe('HealthController', () => {
  it('reports that the service is available', () => {
    const result = new HealthController().check();
    expect(result.status).toBe('ok');
    expect(Date.parse(result.timestamp)).not.toBeNaN();
  });
});
