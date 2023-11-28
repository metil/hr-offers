import { useFormik } from "formik";
import { JobInput, useCreateJobMutation } from "@/__generated__/graphql";
import { Container } from "@mui/system";
import { Box, Button, TextField, Typography } from "@mui/material";
import { jobValidation as validationSchema } from "@/validations/jobs";
import Main from "@/ui/layouts/Main";
import { FormikConfig } from "formik/dist/types";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/router";


const CreateJobPage = () => {
  const [createJob] = useCreateJobMutation()
  const router = useRouter();
  const submit: FormikConfig<JobInput>['onSubmit'] = async (values: JobInput, { setSubmitting }) => {
    setSubmitting(true)
    await createJob({
      variables: {
        job: {
          ...values
        }
      }
    }).then((res) => {
      if (res.data?.createJob?.id) {
        enqueueSnackbar('Job Position Created', { variant: 'success' })
        router.push('/jobs')
      }
      setSubmitting(false)
    }).catch((error) => {
      enqueueSnackbar(error.message, { variant: 'error' })
    })
  }

  const formik = useFormik<JobInput>({
    initialValues: {
      description: '',
      openPositions: 0,
      title: ''
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
            Create Open Position
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={Boolean(formik.errors.title) ? formik.errors.title : ''}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="description"
              label="Description"
              rows={4}
              multiline
              id="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={Boolean(formik.errors.description) ? formik.errors.description : ''}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="openPositions"
              label="Number of Open Positions"
              type="number"
              id="openPositions"
              value={formik.values.openPositions}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.openPositions && Boolean(formik.errors.openPositions)}
              helperText={Boolean(formik.errors.openPositions) ? formik.errors.openPositions : ''}
            />
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
    </Main>);
};


export default CreateJobPage;
