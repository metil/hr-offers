import { useAuth } from '@/ui/contexts/AuthContext'

import {
  Box,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import { Offer, useGetUserOffersQuery } from '@/__generated__/graphql'
import { timestampToDateString } from '@/ui/utils'
import { enqueueSnackbar } from 'notistack'
import Add from '@mui/icons-material/Add'
import { useRouter } from 'next/router'

export default function OffersTable() {
  const { user } = useAuth()
  const router = useRouter()
  const { data, loading, error } = useGetUserOffersQuery({
    variables: {
      id: user?.id || ''
    },
    skip: !user?.id,
    fetchPolicy: 'cache-and-network'
  })
  if (loading) return <CircularProgress/>

  const offers = data?.user?.offers as Offer[]

  if(error) enqueueSnackbar(error.message, { variant: 'error' })

  if (!offers) return null
  return (
    <Box sx={{ maxWidth: '1440px', p: 5 }}>
      <Box display='flex' alignItems='end' justifyContent='flex-end' width={'100%'}>
        <Button
          variant={'contained'}
          startIcon={<Add/>}
          onClick={()=>router.push('/offers/create')}
        >Create</Button>
      </Box>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Recent Offers
      </Typography>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell>Send At</TableCell>
            <TableCell>Candidate Name</TableCell>
            <TableCell>Candidate Email</TableCell>
            <TableCell>Offer Status</TableCell>
            <TableCell>Job title</TableCell>
            <TableCell>Offer PIN</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {offers.map((row: Offer) => (
            <TableRow key={row.offerId}>
              <TableCell>
                {timestampToDateString(row.offerCreatedAt as string)}
              </TableCell>
              <TableCell>{row.candidateName}</TableCell>
              <TableCell>{row.candidateEmail}</TableCell>
              <TableCell>{row.offerStatus}</TableCell>
              <TableCell>{row.jobTitle}</TableCell>
              <TableCell>{row.offerPin}</TableCell>
              <TableCell>
                <Button variant={'outlined'}
                  onClick={
                    ()=> navigator.clipboard
                      .writeText(`http://localhost:3000/candidates/${row.candidateId}/offer/${row.offerId}`)
                  }
                >Copy Link</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  )
}
