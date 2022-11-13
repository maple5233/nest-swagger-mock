import superTest from 'supertest'
import type { INestApplication } from '@nestjs/common'
import { NumberController } from '@/number/number.controller'
import { getAppWithSwagger } from '@/testing-utils/get-app-with-swagger'
import { executeMultipleTimes } from '@/testing-utils/execute-multiple-times'

describe('NumberController', () => {
  let app: INestApplication

  beforeAll(async () => {
    app = await getAppWithSwagger(NumberController)
  })

  afterAll(async () => {
    await app.close()
  })

  describe('root', () => {
    it('GET /number should return a number', () =>
      executeMultipleTimes(() =>
        superTest(app.getHttpServer())
          .get('/number')
          .expect(200)
          .then((res) => {
            expect(typeof res.body.number).toBe('number')
          }),
      ))

    it('GET /number/integer should return an integer', () =>
      executeMultipleTimes(() =>
        superTest(app.getHttpServer())
          .get('/number/integer')
          .expect(200)
          .then((res) => {
            expect(Number.isInteger(res.body.number)).toBe(true)
            expect(res.body.number).toBeGreaterThanOrEqual(1)
            expect(res.body.number).toBeLessThanOrEqual(10)
          }),
      ))

    it('GET /number/float should return a float', () =>
      executeMultipleTimes(() =>
        superTest(app.getHttpServer())
          .get('/number/float')
          .expect(200)
          .then((res) => {
            expect(Number.isInteger(res.body.number)).toBe(false)
            // min: 10, max: 123
            expect(res.body.number).toBeGreaterThanOrEqual(10)
            expect(res.body.number).toBeLessThanOrEqual(123)
            // precision is 0.001
            expect(String(res.body.number).split('.')[1].length).toBeLessThanOrEqual(3)
          }),
      ))
  })
})
