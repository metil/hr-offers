import { useFormik } from 'formik'
import { CandidateInput, useCreateCandidateMutation } from '@/__generated__/graphql'
import { candidateValidation as validationSchema } from '@/validations/candidates'
import { Container } from '@mui/system'
import { Box, Button, MenuItem, TextField, Typography } from '@mui/material'
import Main from '@/ui/layouts/Main'
import { FormikConfig } from 'formik/dist/types'
import { enqueueSnackbar } from 'notistack'
import { useRouter } from 'next/router'

const SPECIALIZATIONS = [
  'Frontend',
  'Backend',
  'Fullstack',
  'DevOps',
  'QA',
  'UX/UI',
  'Project Manager',
  'Product Manager',
  'Business Analyst',
  'Sales',
  'HR',
  'Other'
]


const CandidateCreatePage = () => {

  const [createCandidate] = useCreateCandidateMutation()
  const router = useRouter()
  const submit: FormikConfig<CandidateInput>['onSubmit'] = async (values: CandidateInput, { setSubmitting }) => {
    setSubmitting(true)
    await createCandidate({
      variables: {
        candidate: {
          ...values
        }
      }
    }).then((res) => {
      if (res.data?.createCandidate?.id) {
        enqueueSnackbar('Candidate Created', { variant: 'success' })
        router.push('/candidates')
      }
      setSubmitting(false)
    }).catch((error) => {
      enqueueSnackbar(error.message, { variant: 'error' })
    })
  }

  const formik = useFormik<CandidateInput>({
    initialValues: {
      name: '',
      specialization: '',
      email: '',
      status: 'NEW'
    },
    onSubmit: submit,
    validationSchema
  })

  return (
    <Main>
      <Container maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Create Candidate
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={Boolean(formik.errors.name) ? formik.errors.name : ''}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="email"
              label="Email"
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={Boolean(formik.errors.email) ? formik.errors.email : ''}
            />
            <TextField
              label="Specialization"
              id="specialization"
              name="specialization"
              select
              value={formik.values.specialization}
              onChange={formik.handleChange}
              fullWidth
              required
              onBlur={formik.handleBlur}
              error={formik.touched.specialization && Boolean(formik.errors.specialization)}
              helperText={Boolean(formik.errors.specialization) ? formik.errors.specialization : ''}
            >
              { SPECIALIZATIONS.map((s) => (
                <MenuItem value={s} key={s}>{s}</MenuItem>
              ))}
            </TextField>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={formik.isSubmitting || !formik.isValid}
            >
              Create
            </Button>
          </Box>
        </Box>
      </Container>
    </Main>
  )
}

export default CandidateCreatePage
