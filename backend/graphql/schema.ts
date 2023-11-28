import { gql } from "graphql-tag";

export const typeDefs = gql`
directive @authorised on FIELD_DEFINITION
    
type User {
    id: ID!
    name: String
    email: String!
    createdAt: String
    updatedAt: String
    offers: [Offer]
}
input UserInput {
    name: String
    email: String!
}

type Candidate {
    id: ID!
    name: String
    email: String!
    specialization: String
    status: String!
    createdAt: String
    updatedAt: String
}

input CandidateInput {
    name: String
    email: String!
    specialization: String
    status: String!
}

type Job {
    id: ID!
    title: String!
    description: String!
    openPositions: Int!
    createdAt: String
    updatedAt: String
}

input JobInput {
    title: String!
    description: String!
    openPositions: Int!
}

type Offer {
    candidateId : ID!
    candidateName: String,
    candidateEmail: String!,
    candidateSpecialization: String
    candidateStatus: String!
    jobId: ID!
    jobTitle: String!
    jobDescription: String!
    jobOpenPositions: Int!
    offerId: ID!
    offerStatus: String!
    offerDescription: String!
    offerCreatedAt: String!
    offerPin: Int!
    userId: ID!
    userName: String!
    userEmail: String!
}

input OfferInput {
    candidateId : ID!
    jobId: ID!
    status: String!
    description: String!
    userId: ID!
}

type OfferRaw { 
    id: ID!
    candidateId : ID!
    jobId: ID!
    status: String!
    description: String!
    userId: ID!
    pin: Int
}

type Query {
    user(id: ID!): User @authorised
    userByEmail(email: String!): User @authorised
    candidate(id: ID!): Candidate @authorised
    candidates: [Candidate!] @authorised
    jobs: [Job!] @authorised
    job(id: ID!): Job @authorised
    offerWithPin(pin: Int!, id: ID!): Offer
    hello: String
}
type Mutation {
    createUser(user: UserInput): User @authorised
    createCandidate(candidate: CandidateInput): Candidate @authorised
    createJob(job: JobInput): Job @authorised
    createOffer(offer: OfferInput): OfferRaw @authorised
}
`
