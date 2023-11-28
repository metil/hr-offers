import { OfferInput } from "@/__generated__/graphql";
import { useEffect } from "react";
import { useFormik } from "formik";
import { offerValidation as validationSchema } from "@/validations/offer";
import { Box, Button, CircularProgress, MenuItem, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useAuth } from "@/ui/contexts/AuthContext";
import { useCreateOffer } from "@/ui/hooks/useCreateOffer";

export const OffersForm = () => {
  const { user }  = useAuth()

  const { candidates, positions, loading, submit } = useCreateOffer(user);


  const formik = useFormik<OfferInput>({
    initialValues: {
      userId: user?.id || '',
      candidateId: '',
      description: '',
      jobId: '',
      status: 'NEW',
    },
    onSubmit: submit,
    validationSchema
  })

  useEffect(() => {
    if(user){
      formik.setFieldValue('userId', user?.id || '')
    }
  }, [user, formik]);

  if(loading) return <CircularProgress />


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
        <Typography component="h1" variant="h5">
          Create Offer
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            label="Candidate"
            id="candidateId"
            name="candidateId"
            select
            value={formik.values.candidateId}
            onChange={formik.handleChange}
            fullWidth
            required
            onBlur={formik.handleBlur}
            error={formik.touched.candidateId && Boolean(formik.errors.candidateId)}
            helperText={Boolean(formik.errors.candidateId) ? formik.errors.candidateId : ''}
          >
            { candidates.map((c) => (
              <MenuItem value={c.id} key={c.id}>{c.email}</MenuItem>
            ))}
          </TextField>
          <TextField
            margin="normal"
            label="Position"
            id="jobId"
            name="jobId"
            select
            value={formik.values.jobId}
            onChange={formik.handleChange}
            fullWidth
            required
            onBlur={formik.handleBlur}
            error={formik.touched.jobId && Boolean(formik.errors.jobId)}
            helperText={Boolean(formik.errors.jobId) ? formik.errors.jobId : ''}
          >
            { positions.map((p) => (
              <MenuItem value={p.id} key={p.id}>{p.title}</MenuItem>
            ))}
          </TextField>
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
  );
}
