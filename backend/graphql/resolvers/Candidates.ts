import { GraphQL } from '@/backend/graphql/declarations'
import { Candidate, CandidateInput } from '@/__generated__/graphql'
import { candidateValidation } from '@/validations/candidates'

export const candidates = {
  Query: {
    candidates: async (_: any, __ : any, { db }: GraphQL.Context) => {
      return db.candidate.candidates()
    },
    candidate: async (_: any, { id } : any, { db }: GraphQL.Context) => {
      return db.candidate.candidate(id)
    },
  },
  Mutation: {
    createCandidate: async (_: any, { candidate } : {candidate: CandidateInput}, { db }: GraphQL.Context) => {
      return candidateValidation.validate(candidate)
        .then(c=> db.candidate.createCandidate(c))
        .then((result: Candidate[] )=> result.pop())
    }
  }
}

