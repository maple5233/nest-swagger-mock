import { FAKE_RESPONSE_AFTER_HOOK_METADATA_KEY } from '@/decorators/constants'

export const AfterHook = <TResponse = Record<string, unknown>>(
  hook: (response: TResponse) => unknown,
): ClassDecorator => Reflect.metadata(FAKE_RESPONSE_AFTER_HOOK_METADATA_KEY, hook)

export const getAfterHook = (
  target: any,
): ((response: Record<string, unknown>) => Record<string, unknown>) | undefined =>
  Reflect.getMetadata(FAKE_RESPONSE_AFTER_HOOK_METADATA_KEY, target)
