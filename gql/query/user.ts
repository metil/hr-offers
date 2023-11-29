import { gql } from 'graphql-tag'

export const GET_USER_BY_EMAIL = gql`
    query getUserByEmail($email: String!) {
        userByEmail(email: $email) {
            id
            email
            name
            createdAt
            updatedAt
        }
    }
    `
export const GET_USER_OFFERS = gql`
    query getUserOffers($id: ID!) {
        user(id: $id) {
            offers {
                candidateEmail
                candidateId
                candidateName
                offerStatus
                offerId
                offerPin
                offerCreatedAt
                jobTitle
                jobId
            }
        }
    }
`
