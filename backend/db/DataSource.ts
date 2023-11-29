import { UserDAO } from '@/backend/db/UserDAO'
import { BatchedSQLDataSourceProps } from '@nic-jennings/sql-datasource'
import { OffersDAO } from '@/backend/db/OffersDAO'
import { CandidateDAO } from '@/backend/db/CandidateDAO'
import { JobsDAO } from '@/backend/db/JobsDAO'

export class DataSource {
  user: UserDAO
  offer: OffersDAO
  candidate: CandidateDAO
  jobs: JobsDAO
  constructor(config: BatchedSQLDataSourceProps) {
    this.user = new UserDAO(config)
    this.offer = new OffersDAO(config)
    this.candidate = new CandidateDAO(config)
    this.jobs = new JobsDAO(config)
  }
}
