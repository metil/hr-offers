import { Offer, OfferInput, OfferRaw } from "@/__generated__/graphql";
import { GraphQL } from "@/backend/graphql/declarations";
import { offerValidation } from "@/validations/offer";

export const offers = {
  Query: {
    offerWithPin: async (_: any, { pin, id }: {pin: number, id: string}, { db }: GraphQL.Context) => {
      return db.offer.offer(id).then((offer: Offer) => {
        if(offer.offerPin !== pin) throw new Error("Invalid pin");
        return offer;
      }).then((offer: Offer) => db.offer.updateOfferStatus(offer.offerId, "VIEWED")
        .then(() => offer));
    }
  },
  Mutation: {
    createOffer: async (_: any, { offer }: {offer: OfferInput}, { db }: GraphQL.Context) => {
      return offerValidation.validate(offer)
        .then((o: OfferInput) => db.offer.createOffer( o))
        .then((result: OfferRaw[]) => result.pop())
        // .then(newOffer => db.candidate.candidate(offer.candidateId)
        //   .then(
        //     async (candidate: Candidate) => {
        //       if(!newOffer) throw new Error("Offer not created");
        //       const email = candidate.email;
        //       const subject = "New offer";
        //       const html = `
        //         <strong>You have a new offer!</strong><br>
        //         You can see it here:
        //         <a href="http://localhost:3000/candidates/${candidate.id}/offer/${newOffer.id}">link</a>
        //            <br> With the following pin: ${result.pin}
        //         `;
        //       return sendEmail(email, subject, html);
        //     }
        //   )
        //   .then(() => newOffer))
    },
  },
}
