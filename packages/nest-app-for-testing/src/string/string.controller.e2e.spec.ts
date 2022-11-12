import superTest from 'supertest'
import type { INestApplication } from '@nestjs/common'
import { StringController } from '@/string/string.controller'
import { getAppWithSwagger } from '@/testing-utils/get-app-with-swagger'
import { executeMultipleTimes } from '@/testing-utils/execute-multiple-times'
import { getWordsRegex, uuidRegex } from '@/testing-utils/regex'

describe('StringController', () => {
  let app: INestApplication

  beforeAll(async () => {
    app = await getAppWithSwagger(StringController)
  })

  afterAll(async () => {
    await app.close()
  })

  describe('root', () => {
    it('GET /string should return 1 ~ 3 words', () =>
      executeMultipleTimes(() =>
        superTest(app.getHttpServer())
          .get('/string')
          .expect(200)
          .then((res) => {
            expect(res.body.message).toMatch(getWordsRegex(1, 3))
          }),
      ))

    it('GET /string/uuid should return uuid', () =>
      executeMultipleTimes(() =>
        superTest(app.getHttpServer())
          .get('/string/uuid')
          .expect(200)
          .then((res) => {
            expect(res.body.message).toMatch(uuidRegex)
          }),
      ))

    it('GET /string/words should return 5 ~ 10 words', () =>
      executeMultipleTimes(() =>
        superTest(app.getHttpServer())
          .get('/string/words')
          .expect(200)
          .then((res) => {
            expect(res.body.message).toMatch(getWordsRegex(5, 10))
          }),
      ))

    it('GET /string/random should return 9 ~ 10 characters', () =>
      executeMultipleTimes(() =>
        superTest(app.getHttpServer())
          .get('/string/random')
          .expect(200)
          .then((res) => {
            expect(res.body.message).toMatch(/^.{9,10}$/)
          }),
      ))

    it('GET /string/template should return "Hello {{name.lastName}}, {{name.firstName}} {{name.suffix}}"', () =>
      executeMultipleTimes(() =>
        superTest(app.getHttpServer())
          .get('/string/template')
          .expect(200)
          .then((res) => {
            const templateRegex = /^Hello [a-zA-Z'.-]+, [a-zA-Z'.-]+ [a-zA-Z'.-]+$/
            expect(res.body.message).toMatch(templateRegex)
          }),
      ))

    it('GET /string/default should return 1 ~ 3 words', () =>
      executeMultipleTimes(() =>
        superTest(app.getHttpServer())
          .get('/string/default')
          .expect(200)
          .then((res) => {
            expect(res.body.message).toMatch(getWordsRegex(1, 3))
          }),
      ))

    it('GET /string/schema should return 1 ~ 3 words', () =>
      executeMultipleTimes(() =>
        superTest(app.getHttpServer())
          .get('/string/schema')
          .expect(200)
          .then((res) => {
            expect(res.body.message).toMatch(getWordsRegex(1, 3))
          }),
      ))
  })
})
