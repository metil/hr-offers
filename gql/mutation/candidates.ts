import { gql } from "graphql-tag";

export const CREATE_CANDIDATE = gql`
    mutation CreateCandidate($candidate: CandidateInput!) {
        createCandidate(candidate: $candidate) {
            id
        }
    }
`
