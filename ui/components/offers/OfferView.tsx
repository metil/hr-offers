import { Box, Card, CardContent, CardHeader, Container, Typography, useTheme } from '@mui/material'
import { Offer } from '@/__generated__/graphql'
type OfferViewProps = {
  offerData: Partial<Offer> | null
}

export const OfferView = ({ offerData }: OfferViewProps) => {
  const theme = useTheme()
  if (!offerData) return null
  return (<Container maxWidth="md" component="main" sx={{ my:5 }}>
    <Card>
      <CardHeader
        title={offerData.jobTitle}
        subheader={offerData.jobDescription}
        titleTypographyProps={{ align: 'center' }}
        subheaderTypographyProps={{
          align: 'center',
        }}
        sx={{
          backgroundColor: theme.palette.grey[200]
        }}
      />
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'baseline',
            flexDirection: 'column',
            mb: 2,
          }}
        >
          <Typography variant="h6" color="text.primary">
            Dear {offerData.candidateName}, we are happy to offer you a job as a {offerData.jobTitle} in our company.
          </Typography>
          <Typography variant="body2" color="text.primary">

            {offerData.offerDescription}
          </Typography>

        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Typography component="h6" color="text.primary">
            Offer is sent by: {offerData.userName}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  </Container>)
}
