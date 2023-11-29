import { gql } from 'graphql-tag'

export const GET_JOBS = gql`
    query GetJobs {
        jobs {
            id
            title
            description
            openPositions
            createdAt
            updatedAt
        }
    }`
