import { Container } from '@mui/system'
import { Avatar, Box, Button, TextField, Typography } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { useFormik } from 'formik'
import { useAuth } from '@/ui/contexts/AuthContext'
import { useRouter } from 'next/router'
import { FormikConfig } from 'formik/dist/types'
import { enqueueSnackbar } from 'notistack'
import * as yup from 'yup'


type FormValues = {
  email: string
  password: string
}

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password should be of minimum 6 characters length')
    .required('Password is required'),
})

export default function SignIn() {
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit:FormikConfig<FormValues>['onSubmit'] = async (values: FormValues, { setSubmitting }) => {
    setSubmitting(true)
    await login(values.email, values.password)
      .then(()=> {
        setSubmitting(true)
        router.push('/')
      }).catch((error) => {
        enqueueSnackbar(error.message, { variant: 'error' })
      })
  }

  const formik = useFormik<FormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: handleSubmit,
    validationSchema
  })

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={Boolean(formik.errors.email) ? formik.errors.email : '' }
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={Boolean(formik.errors.password) ? formik.errors.password : '' }
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  )
}
