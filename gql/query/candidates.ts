import { gql } from "graphql-tag";

export const GET_CANDIDATES = gql`
    query GetCandidates {
        candidates {
            id
            name
            email
            specialization
            status
            createdAt
            updatedAt
        }
    }
`
