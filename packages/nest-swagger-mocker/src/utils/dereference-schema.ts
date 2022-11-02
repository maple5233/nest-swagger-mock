import type { OpenAPIObject } from '@nestjs/swagger'
import type {
  ReferenceObject,
  SchemaObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface'

/**
 * convert SchemaObject | ReferenceObject to SchemaObject
 * @param document swagger document
 * @param schema SchemaObject | ReferenceObject
 * @param recursionDepth max dereference try times
 */
export function dereferenceSchema(
  document: OpenAPIObject,
  schema: SchemaObject | ReferenceObject,
  recursionDepth = 0,
): SchemaObject | undefined {
  if (recursionDepth > 5) {
    return
  }

  if ('$ref' in schema) {
    const ref = schema.$ref
    const refClassName = ref.split('/').pop()
    if (!refClassName) {
      return
    }
    const refSchema = document.components?.schemas?.[refClassName]
    if (!refSchema) {
      return
    }
    return dereferenceSchema(document, refSchema, recursionDepth + 1)
  }

  return schema
}
