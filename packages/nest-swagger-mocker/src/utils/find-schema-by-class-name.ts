import { dereferenceSchema } from '@/utils/dereference-schema'
import type { OpenAPIObject } from '@nestjs/swagger'

export function findSchemaByClassName(document: OpenAPIObject, className: string) {
  const schema = document.components?.schemas?.[className]
  if (!schema) {
    return
  }

  if ('$ref' in schema) {
    return dereferenceSchema(document, schema)
  }

  return schema
}
