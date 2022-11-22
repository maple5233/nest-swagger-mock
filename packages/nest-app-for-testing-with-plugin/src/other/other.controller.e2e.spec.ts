import superTest from 'supertest'
import type { INestApplication } from '@nestjs/common'
import { getAppWithSwagger } from '@/testing-utils/get-app-with-swagger'
import { executeMultipleTimes } from '@/testing-utils/execute-multiple-times'
import { OtherController } from '@/other/other.controller'

describe('OtherController', () => {
  let app: INestApplication

  beforeAll(async () => {
    app = await getAppWithSwagger(OtherController)
  })

  afterAll(async () => {
    await app.close()
  })

  describe('root', () => {
    it('GET /other/optional should return property which may be undefined', async () => {
      const results = await executeMultipleTimes(
        () =>
          superTest(app.getHttpServer())
            .get('/other/optional')
            .expect(200)
            .then((res) => ({
              optional: res.body.message === undefined,
              required: res.body.requiredMessage !== undefined,
            })),
        30,
      )
      expect(results.map((result) => result.optional)).toContain(true)
      expect(results.every((result) => result.required)).toBe(true)
    })

    it('GET /other/fake-optional should return property which may be undefined', async () => {
      const results = await executeMultipleTimes(
        () =>
          superTest(app.getHttpServer())
            .get('/other/fake-optional')
            .expect(200)
            .then((res) => res.body.unlucky !== undefined),
        30,
      )
      expect(results).toContain(true)
      // true ≈ 10% of the time, false ≈ 90% of the time
      expect(results.filter((result) => result).length).toBeLessThan(
        results.filter((result) => !result).length,
      )
    })

    it('GET /other/hooked should return property which is hooked', () =>
      executeMultipleTimes(
        () =>
          superTest(app.getHttpServer())
            .get('/other/hooked')
            .expect(200)
            .then((res) => {
              expect(res.body.message).toBe('hooked')
            }),
        1,
      ))
  })
})
