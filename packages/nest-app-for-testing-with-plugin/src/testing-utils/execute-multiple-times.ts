/**
 * mocking is a random process, so we need to execute multiple times to make sure it works
 * @param fn
 * @param times
 */
export const executeMultipleTimes = async <TResultItem>(
  fn: (...args: unknown[]) => TResultItem,
  times = 10,
) => Promise.all(Array.from({ length: times }).map(() => fn()))
