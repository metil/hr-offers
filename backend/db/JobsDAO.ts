import { BatchedSQLDataSource, BatchedSQLDataSourceProps } from '@nic-jennings/sql-datasource'
import { JobInput } from '@/__generated__/graphql'

export class JobsDAO extends BatchedSQLDataSource {
  constructor(config: BatchedSQLDataSourceProps) {
    super(config)
  }
  jobs(limit: number = 10, offset: number = 0) {
    return this.db.query.select('*').from('public.Jobs').limit(limit).offset(offset)
  }
  job(id: string) {
    return this.db.query
      .select('*')
      .from('public.Jobs')
      .where('id', id)
      .first()
  }
  createJob(job: JobInput) {
    return this.db.query
      .insert(job)
      .into('public.Jobs')
      .returning('*')
  }
}
