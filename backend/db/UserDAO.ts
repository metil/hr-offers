import { BatchedSQLDataSource, BatchedSQLDataSourceProps } from '@nic-jennings/sql-datasource'
import { User, UserInput } from '@/__generated__/graphql'

export class UserDAO extends BatchedSQLDataSource {
  constructor(config: BatchedSQLDataSourceProps) {
    super(config)
  }

  user(id: string): Promise<User[]> {
    return this.db.query
      .select('*')
      .from('public.User')
      .where('id', id)
      .first()
  }

  userByEmail(email: string): Promise<User[]> {
    return this.db.query
      .select('*')
      .from('public.User')
      .where('email', email)
      .first()
  }

  createUser(user: UserInput): Promise<User> {
    return this.db.query
      .insert(user)
      .into('public.User')
      .returning('*')
      .first()
  }
}
