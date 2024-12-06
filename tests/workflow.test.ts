// tests/workflow.test.ts
import request from 'supertest';
import app from '../src/index';

describe('POST /workflows', () => {
  it('should create a new workflow', async () => {
    const response = await request(app).post('/workflows').send({
      name: 'Test Workflow',
      trigger: 'time-based',
      actions: [],
    });
    expect(response.statusCode).toBe(201);
  });
});
