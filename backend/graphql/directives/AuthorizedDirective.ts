import { defaultFieldResolver, GraphQLSchema } from 'graphql'
import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils'

export const authorizedDirectiveTransformer = (schema: GraphQLSchema, directiveName: string) => {
  return mapSchema(schema, {

    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const authorizedDirective = getDirective(schema, fieldConfig, directiveName)?.[0]
      if (authorizedDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig
        // Replace the original resolver with a function that *first* calls
        fieldConfig.resolve = async function (source, args, context, info) {
          if (!context.isAuthenticated) {
            throw new Error('Not authorized')
          }
          return await resolve(source, args, context, info)
        }
        return fieldConfig
      }
    },
  })
}

