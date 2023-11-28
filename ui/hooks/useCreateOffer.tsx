import { OfferInput, useCreateOfferMutation, useGetOfferIngredientsQuery, User } from "@/__generated__/graphql";
import { useRouter } from "next/router";
import { FormikConfig } from "formik/dist/types";
import { enqueueSnackbar } from "notistack";
import { useEffect } from "react";

export const useCreateOffer = (user: Partial<User> | null) => {
  const [createOffer] = useCreateOfferMutation();
  const router = useRouter()
  const submit: FormikConfig<OfferInput>['onSubmit'] = async (values: OfferInput, { setSubmitting }) => {
    setSubmitting(true)
    await createOffer({
      variables: {
        offer: {
          ...values
        }
      }
    }).then((res) => {
      if (res.data?.createOffer?.id) {
        enqueueSnackbar('Offer sent with instructions to candidate', { variant: 'success' })
        router.push('/offers')
      }
      setSubmitting(false)
    }).catch((error: Error) => {
      enqueueSnackbar(error.message, { variant: 'error' })
    })
  }
  const { data, loading, error, called } = useGetOfferIngredientsQuery({
    skip: !user,
    fetchPolicy: "cache-and-network",
  })
  useEffect(() => {
    if(called && !data?.jobs?.length){
      enqueueSnackbar("No jobs found", { variant: "error" })
    }
    if(called && !data?.candidates?.length){
      enqueueSnackbar("No candidates found", { variant: "error" })
    }
  }, [data, called]);

  useEffect(() => {
    if(error){
      enqueueSnackbar(error.message, { variant: "error" })
    }
  }, [error]);
  const candidates = data?.candidates || []
  const positions = data?.jobs || []

  return {
    submit,
    loading,
    candidates,
    positions
  }
}
