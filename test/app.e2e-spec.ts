import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {

  let app: INestApplication;
  let access_token: string = '';

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('signin with invalid data', async () => {
    await request(app.getHttpServer())
      .post('/auth/signin')
      .expect(400);
  });

  it('signin with existing data', async () => {
    await request(app.getHttpServer())
      .post('/auth/signin')
      .send({username: 'testing', password: 'testing', email: 'testing@testing.com'})
      .expect(409);
  });

  it('login with invalid credentials', async () => {
    await request(app.getHttpServer())
      .post('/auth/login')
      .expect(401);
  });

  it('login with valid credentials', async () => {
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({username: 'testing', password: 'testing'})
      .expect(201)
      .then(res => access_token = res.body.access_token);
  });

  it('auth user profile', async () => {
    await request(app.getHttpServer())
      .get('/auth')
      .set({'Authorization': `Bearer ${access_token}`})
      .expect(200);
  })
});
