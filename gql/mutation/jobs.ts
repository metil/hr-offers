import { gql } from "graphql-tag";

export const CREATE_JOB = gql`
    mutation CreateJob($job: JobInput!) {
        createJob(job: $job) {
            id
        }
    }
`
