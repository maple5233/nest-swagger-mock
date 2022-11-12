import superTest from 'supertest'
import type { INestApplication } from '@nestjs/common'
import { getAppWithSwagger } from '@/testing-utils/get-app-with-swagger'
import { executeMultipleTimes } from '@/testing-utils/execute-multiple-times'
import { BoolController } from '@/boolean/bool.controller'

describe('BoolController', () => {
  let app: INestApplication

  beforeAll(async () => {
    app = await getAppWithSwagger(BoolController)
  })

  afterAll(async () => {
    await app.close()
  })

  describe('root', () => {
    it('GET /bool should return a boolean', () =>
      executeMultipleTimes(() =>
        superTest(app.getHttpServer())
          .get('/bool')
          .expect(200)
          .then((res) => {
            expect(typeof res.body.boolean).toBe('boolean')
          }),
      ))

    it('GET /bool/luckyBoolean should return a boolean', async () => {
      const result = await executeMultipleTimes(
        () =>
          superTest(app.getHttpServer())
            .get('/bool/luckyBoolean')
            .expect(200)
            .then((res) => {
              expect(typeof res.body.boolean).toBe('boolean')
              return res.body.boolean as boolean
            }),
        30,
      )
      const isLucky = result.filter((item) => item).length > result.filter((item) => !item).length
      expect(isLucky).toBe(true)
    })
  })
})
