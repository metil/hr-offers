import * as yup from 'yup'

export const offerValidation = yup.object({
  jobId: yup.string().required('Position is required'),
  status: yup.string().required('Status is required'),
  candidateId: yup.string().required('Candidate is required'),
  userId: yup.string().required('HR User is required'),
  description: yup.string().required('Description is required').max(300),
})
