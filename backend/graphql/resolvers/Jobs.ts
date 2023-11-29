import { GraphQL } from '@/backend/graphql/declarations'
import { Job, JobInput } from '@/__generated__/graphql'
import { jobValidation } from '@/validations/jobs'

export const jobs = {
  Query: {
    jobs: async (_: any, __: any, { db }: GraphQL.Context) => {
      return db.jobs.jobs()
    },
    job: async (_: any, { id }: any, { db }: GraphQL.Context) => {
      return db.jobs.job(id)
    },
  },
  Mutation: {
    createJob: async (_: any, { job }: {job: JobInput}, { db }: GraphQL.Context) => {
      return jobValidation
        .validate(job)
        .then((j: JobInput) => db.jobs.createJob(j))
        .then((result: Job[])=> result.pop()) 
    },
  },
}
