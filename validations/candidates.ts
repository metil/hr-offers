import * as yup from "yup";

export const candidateValidation = yup.object({
  name: yup.string().required('Name is required').max(30),
  email: yup.string().email().required('Email is required'),
  specialization: yup.string().required('Specialisation is required'),
  status: yup.string().required('Status is required'),
})
