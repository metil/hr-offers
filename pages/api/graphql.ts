import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { DataSource } from "@/backend/db/DataSource";
import { BatchedSQLDataSourceProps } from "@nic-jennings/sql-datasource";
import { typeDefs } from "@/backend/graphql/schema";
import { mergeDeep } from "@graphql-tools/utils";
import { user } from "@/backend/graphql/resolvers/User";
import { GraphQL } from "@/backend/graphql/declarations";
import { makeExecutableSchema } from "graphql-tools";
import { authorizedDirectiveTransformer } from "@/backend/graphql/directives/AuthorizedDirective";
import * as admin from 'firebase-admin'
import { FirebaseAuthentication } from "@/backend/middlewares/Firebase";
import { GraphQLError } from "graphql/error";
import { candidates } from "@/backend/graphql/resolvers/Candidates";
import { jobs } from "@/backend/graphql/resolvers/Jobs";
import { offers } from "@/backend/graphql/resolvers/Offers";

const connectionConfig: BatchedSQLDataSourceProps = {
  knexConfig: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
}

const resolvers = {
  Query: {
    hello: () => 'world',
  },
};

let schema = makeExecutableSchema({
  resolvers: mergeDeep([resolvers, user, candidates, jobs, offers]),
  typeDefs,
})

schema = authorizedDirectiveTransformer(schema, 'authorised')

const server = new ApolloServer<GraphQL.Context>({
  schema
});

// Initialize Firebase
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_FILE || '')
admin.apps.length === 0 &&
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
})

const fbAuth = new FirebaseAuthentication()

export default startServerAndCreateNextHandler(server, {
  context: async (req, res) => {
    if(fbAuth.isCircuitOpen()){
      throw new GraphQLError('Firebase service in not available at the moment.', {
        extensions: {
          code: 'SERVICE_UNAVAILABLE',
        },
      })
    }

    const isAuthenticated = await fbAuth.isAuthorized(req)

    return {
      req,
      res,
      db: new DataSource(connectionConfig),
      isAuthenticated: isAuthenticated
    }
  }
})
;
