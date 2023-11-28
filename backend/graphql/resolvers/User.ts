import { UserInput } from "@/__generated__/graphql";
import { GraphQL } from "@/backend/graphql/declarations";

export const user = {
  User:{
    offers: async ({ id }: any, _: any, { db }: GraphQL.Context) => {
      return await db.offer.offersByUserId(id);
    }
  },
  Query: {
    user: async (_: any, { id } : any, { db }: GraphQL.Context) => {
      return await db.user.user(id)
    },
    userByEmail: async (_: any, { email } : any, { db }: GraphQL.Context) => {
      return await db.user.userByEmail(email)
    }
  },
  Mutation: {
    createUser: async (_: any ,{ user } : {user: UserInput}, { db }: GraphQL.Context) => {
      return await db.user.createUser(user);
    }
  }
}
