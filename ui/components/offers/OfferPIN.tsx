import { Box, Button, Container, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'

const validationSchema = yup.object({
  pin: yup.number().required('RequiredField')
    .min(1000, 'PIN must be 4 digits')
    .max(9999, 'PIN must be 4 digits')
})

type OfferPINProps = {
  submit: (values: { pin: number }) => void
}

export const OfferPIN = ({ submit }:OfferPINProps) => {

  const formik = useFormik<{pin:number}>({
    initialValues: {
      pin: 0
    },
    onSubmit: submit,
    validationSchema
  })

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
          <Typography component="h1" variant="h5">
            Enter Offer PIN
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            name="pin"
            label="PIN"
            type="number"
            id="pin"
            value={formik.values.pin}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.pin && Boolean(formik.errors.pin)}
            helperText={Boolean(formik.errors.pin) ? formik.errors.pin : ''}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={formik.isSubmitting || !formik.isValid}
          >
            Proceed
          </Button>
        </Box>
      </Box>
    </Container>
  )
}
