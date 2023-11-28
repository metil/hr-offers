import { gql } from "graphql-tag";

export const GET_OFFER_INGREDIENTS = gql`
    query getOfferIngredients{
        jobs {
            id
            title
        }
        candidates {
            id
            email
        }
    }`

export const GET_OFFER_WITH_PIN = gql`
    query getOfferWithPin($pin: Int!, $id: ID!) {
        offerWithPin(pin: $pin, id: $id) {
            candidateName 
            candidateEmail
            candidateSpecialization
            jobTitle
            jobDescription
            offerDescription
            userName
            userEmail
        }
    }`
