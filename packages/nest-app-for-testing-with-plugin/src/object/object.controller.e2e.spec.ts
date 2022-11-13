import superTest from 'supertest'
import type { INestApplication } from '@nestjs/common'
import { ObjectController } from '@/object/object.controller'
import { getAppWithSwagger } from '@/testing-utils/get-app-with-swagger'
import { executeMultipleTimes } from '@/testing-utils/execute-multiple-times'
import { getWordsRegex, uuidRegex } from '@/testing-utils/regex'

const checkObject = (data: any) => {
  const isFoo = typeof data.uuid === 'string' && uuidRegex.test(data.uuid)
  const isBaz = typeof data.number === 'number' && data.number >= 11 && data.number <= 20
  const isString = typeof data === 'string' && getWordsRegex(1, 3).test(data)
  const isPlainObject =
    typeof data === 'object' && typeof data.name === 'string' && getWordsRegex(1, 3).test(data.name)
  return {
    isFoo,
    isBaz,
    isString,
    isPlainObject,
  }
}

describe('ObjectController', () => {
  let app: INestApplication

  beforeAll(async () => {
    app = await getAppWithSwagger(ObjectController)
  })

  afterAll(async () => {
    await app.close()
  })

  describe('root', () => {
    it('GET /object should return a object', () =>
      executeMultipleTimes(
        () =>
          superTest(app.getHttpServer())
            .get('/object')
            .expect(200)
            .then((res) => {
              expect(typeof res.body.data).toBe('object')
              expect(typeof res.body.data.name).toBe('string')
              expect(typeof res.body.data.key).toBe('number')
            }),
        10,
      ))

    it('GET /object/class should return a object', () =>
      executeMultipleTimes(
        () =>
          superTest(app.getHttpServer())
            .get('/object/class')
            .expect(200)
            .then((res) => {
              const data = res.body.data
              expect(typeof data).toBe('object')
              expect(typeof data.status).toBe('number')
              expect(data.status).toBeGreaterThanOrEqual(400)
              expect(data.status).toBeLessThanOrEqual(404)
              expect(data.message).toMatch(getWordsRegex(5, 10))

              const innerData = data.data
              expect(typeof innerData).toBe('object')
              expect(innerData.uuid).toMatch(uuidRegex)

              const innerData2 = data.data2
              expect(typeof innerData2).toBe('object')
              expect(innerData2.uuid).toMatch(uuidRegex)

              const dataList = data.dataList
              expect(Array.isArray(dataList)).toBe(true)
              expect(dataList).toHaveLength(2)
              dataList.forEach((item: Record<string, unknown>) => {
                expect(typeof item).toBe('object')
                expect(item.uuid).toMatch(uuidRegex)
              })
            }),
        10,
      ))

    it('GET /object/oneOf should return a matched object', () =>
      executeMultipleTimes(
        () =>
          superTest(app.getHttpServer())
            .get('/object/oneOf')
            .expect(200)
            .then((res) => {
              const { isFoo, isBaz, isString, isPlainObject } = checkObject(res.body.data)
              expect([isFoo, isBaz, isString, isPlainObject].filter((one) => one)).toHaveLength(1)
            }),
        10,
      ))

    it('GET /object/anyOf should return a matched object', () =>
      executeMultipleTimes(() =>
        superTest(app.getHttpServer())
          .get('/object/anyOf')
          .expect(200)
          .then((res) => {
            const { isFoo, isBaz, isPlainObject } = checkObject(res.body.data)
            expect([isFoo, isBaz, isPlainObject]).toContain(true)
          }),
      ))

    it('GET /object/allOf should return a matched object', () =>
      executeMultipleTimes(() =>
        superTest(app.getHttpServer())
          .get('/object/allOf')
          .expect(200)
          .then((res) => {
            const { isFoo, isBaz, isPlainObject } = checkObject(res.body.data)
            expect(isFoo).toBe(true)
            expect(isBaz).toBe(true)
            expect(isPlainObject).toBe(true)
          }),
      ))
  })
})
