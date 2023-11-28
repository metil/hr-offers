import { useState } from "react";
import { useRouter } from "next/router";
import { CircularProgress } from "@mui/material";
import { Offer, useGetOfferWithPinLazyQuery } from "@/__generated__/graphql";
import { OfferPIN } from "@/ui/components/offers/OfferPIN";
import { OfferView } from "@/ui/components/offers/OfferView";

export const CandidateOffer = () => {
  const router = useRouter();
  const { offerId } = router.query;
  const [offerData, setOfferData] = useState<Partial<Offer> | null>(null);

  const [getOffer, { loading }] = useGetOfferWithPinLazyQuery()

  const submit = async (values: { pin:number }) => {
    await getOffer({
      variables: {
        pin: Number(values.pin),
        id: offerId as string
      }
    }).then(({ data }) => {
      if(data?.offerWithPin) {
        setOfferData({ ...data?.offerWithPin })
      }
    })
  }

  if (loading) return <CircularProgress />

  if(!offerData) {
    return (
      <OfferPIN submit={submit} />
    )
  }

  return (
    <OfferView offerData={offerData} />
  )
}
