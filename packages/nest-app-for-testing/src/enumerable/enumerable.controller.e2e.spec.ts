import superTest from 'supertest'
import type { INestApplication } from '@nestjs/common'
import { EnumerableController } from '@/enumerable/enumerable.controller'
import { getAppWithSwagger } from '@/testing-utils/get-app-with-swagger'
import { executeMultipleTimes } from '@/testing-utils/execute-multiple-times'

describe('EnumerableController', () => {
  let app: INestApplication

  beforeAll(async () => {
    app = await getAppWithSwagger(EnumerableController)
  })

  afterAll(async () => {
    await app.close()
  })

  describe('root', () => {
    it('GET /enum should return enum A or B', () =>
      executeMultipleTimes(() =>
        superTest(app.getHttpServer())
          .get('/enumerable/enum')
          .expect(200)
          .then((res) => {
            expect(res.body.data).toMatch(/[AB]/)
          }),
      ))

    it('GET /example should return example string', () =>
      executeMultipleTimes(
        () =>
          superTest(app.getHttpServer())
            .get('/enumerable/example')
            .expect(200)
            .then((res) => {
              expect(res.body.data).toBe('example string')
            }),
        1,
      ))

    it('GET /default should return default string', () =>
      executeMultipleTimes(
        () =>
          superTest(app.getHttpServer())
            .get('/enumerable/default')
            .expect(200)
            .then((res) => {
              expect(res.body.data).toBe('default string')
            }),
        1,
      ))

    it('GET /examples should return example1 string or example2 string', () =>
      executeMultipleTimes(() =>
        superTest(app.getHttpServer())
          .get('/enumerable/examples')
          .expect(200)
          .then((res) => {
            expect(res.body.data).toMatch(/example[12] string/)
          }),
      ))
  })
})
