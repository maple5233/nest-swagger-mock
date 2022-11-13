import superTest from 'supertest'
import type { INestApplication } from '@nestjs/common'
import { StringController } from '@/string/string.controller'
import { getAppWithSwagger } from '@/testing-utils/get-app-with-swagger'
import { executeMultipleTimes } from '@/testing-utils/execute-multiple-times'
import { getWordsWithChineseRegex, isChineseWord } from '@/testing-utils/regex'

describe('Setup Faker', () => {
  let app: INestApplication

  beforeAll(async () => {
    app = await getAppWithSwagger(StringController, (faker) => {
      faker.setLocale('zh_CN')
    })
  })

  afterAll(async () => {
    await app.close()
  })

  describe('root', () => {
    it('GET /string/words should return chinese words', async () => {
      const result = await executeMultipleTimes(
        () =>
          superTest(app.getHttpServer())
            .get('/string/words')
            .expect(200)
            .then((res) => {
              expect(res.body.message).toMatch(getWordsWithChineseRegex(5, 10))
              return (res.body.message as string).split(' ')
            }),
        30,
      )
      const flatResult = result.flat()
      // should has chinese words
      const someWordsAreChinese = flatResult.some(isChineseWord)
      expect(someWordsAreChinese).toBe(true)
    })
  })
})
