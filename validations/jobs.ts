import * as yup from "yup";

export const jobValidation = yup.object({
  title: yup.string().required('Title is required').max(30),
  description: yup.string().required('Description is required').max(300),
  openPositions: yup.number().required('Open Positions is required').min(1, 'Open Positions must be greater than 0')
})
