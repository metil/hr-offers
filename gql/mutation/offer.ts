import { gql } from "graphql-tag";

export const CREATE_OFFER = gql`
    mutation createOffer($offer: OfferInput!) {
        createOffer(offer: $offer) {
            id
        }
    }`
