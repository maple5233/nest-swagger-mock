import superTest from 'supertest'
import type { INestApplication } from '@nestjs/common'
import { ArrayController } from '@/array/array.controller'
import { getAppWithSwagger } from '@/testing-utils/get-app-with-swagger'
import { executeMultipleTimes } from '@/testing-utils/execute-multiple-times'
import { getWordsRegex } from '@/testing-utils/regex'

describe('ArrayController', () => {
  let app: INestApplication

  beforeAll(async () => {
    app = await getAppWithSwagger(ArrayController)
  })

  afterAll(async () => {
    await app.close()
  })

  describe('root', () => {
    it('GET /array should return a string array with length 3', () =>
      executeMultipleTimes(
        () =>
          superTest(app.getHttpServer())
            .get('/array')
            .expect(200)
            .then((res) => {
              expect(res.body).toEqual({
                array: expect.any(Array),
              })
              expect(res.body.array).toHaveLength(3)
              for (const item of res.body.array) {
                expect(item).toEqual(expect.any(String))
              }
            }),
        1,
      ))

    it('GET /array/count should return a string array with length 10', () =>
      executeMultipleTimes(
        () =>
          superTest(app.getHttpServer())
            .get('/array/count')
            .expect(200)
            .then((res) => {
              expect(res.body).toEqual({
                array: expect.any(Array),
              })
              expect(res.body.array).toHaveLength(10)
              for (const item of res.body.array) {
                expect(item).toEqual(expect.any(String))
              }
            }),
        1,
      ))

    it('GET /array/ruleAndCount should return an array of strings of matching rule items of length 30', () =>
      executeMultipleTimes(
        () =>
          superTest(app.getHttpServer())
            .get('/array/ruleAndCount')
            .expect(200)
            .then((res) => {
              expect(res.body).toEqual({
                array: expect.any(Array),
              })
              expect(res.body.array).toHaveLength(30)
              for (const item of res.body.array) {
                expect(item).toMatch(/^I flipped the coin and got: (heads|tails)$/)
              }
            }),
        10,
      ))

    it('GET /array/object should return an array of objects with a name property of type string', () =>
      executeMultipleTimes(
        () =>
          superTest(app.getHttpServer())
            .get('/array/object')
            .expect(200)
            .then((res) => {
              expect(res.body).toEqual({
                array: expect.any(Array),
              })
              expect(res.body.array).toHaveLength(3)
              for (const item of res.body.array) {
                expect(item).toEqual({
                  name: expect.any(String),
                })
              }
            }),
        1,
      ))

    it('GET /array/classObject should return an array of objects with a name property of type string', () =>
      executeMultipleTimes(
        () =>
          superTest(app.getHttpServer())
            .get('/array/classObject')
            .expect(200)
            .then((res) => {
              expect(res.body).toEqual({
                array: expect.any(Array),
              })
              expect(res.body.array).toHaveLength(3)
              for (const item of res.body.array) {
                expect(item).toEqual({
                  array: expect.any(Array),
                })
                expect(item.array).toHaveLength(3)
                for (const innerItem of item.array) {
                  expect(innerItem).toEqual(expect.any(String))
                }
              }
            }),
        1,
      ))

    it('GET /array/classObjectWithRuleAndCount should return an array of objects of matching rule items of length 10', () =>
      executeMultipleTimes(
        () =>
          superTest(app.getHttpServer())
            .get('/array/classObjectWithRuleAndCount')
            .expect(200)
            .then((res) => {
              expect(res.body).toEqual({
                array: expect.any(Array),
              })

              expect(res.body.array).toHaveLength(10)

              for (const item of res.body.array) {
                expect(item).toEqual({
                  array: expect.any(Array),
                })

                expect(item.array).toHaveLength(30)

                for (const innerItem of item.array) {
                  expect(innerItem).toMatch(/^I flipped the coin and got: (heads|tails)$/)
                }
              }
            }),
        10,
      ))

    it('GET /array/countRange should return an array of length specified', () =>
      executeMultipleTimes(
        () =>
          superTest(app.getHttpServer())
            .get('/array/countRange')
            .expect(200)
            .then((res) => {
              expect(res.body).toEqual({
                array: expect.any(Array),
              })

              expect(res.body.array.length).toBeGreaterThanOrEqual(10)
              expect(res.body.array.length).toBeLessThanOrEqual(20)

              for (const item of res.body.array) {
                expect(item).toMatch(getWordsRegex(1, 3))
              }
            }),
        10,
      ))
  })
})
