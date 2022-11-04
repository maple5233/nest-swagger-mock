import { MockInterceptor } from '@/core/mock-interceptor'
import type { ICreateMockInterceptorOptions } from '@/typings'

export class MockInterceptorFactory {
  static create(options: ICreateMockInterceptorOptions) {
    return new MockInterceptor(options)
  }
}
