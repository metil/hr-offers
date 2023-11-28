import { useAuth } from "@/ui/contexts/AuthContext";
import { Candidate, useGetCandidatesQuery } from "@/__generated__/graphql";
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
} from "@mui/material";
import Add from "@mui/icons-material/Add";
import { useRouter } from "next/router";

export const CandidatesTable = () => {
  const { user } = useAuth()
  const router = useRouter()
  const { data, loading } = useGetCandidatesQuery({
    skip: !user?.id,
    fetchPolicy: 'cache-and-network'
  })
  if (loading) return <CircularProgress />

  const candidates = data?.candidates as Candidate[];

  if (!candidates) return null;

  return (
    <Box sx={{ maxWidth: '1440px', p:5 }}>
      <Box display='flex' alignItems='end' justifyContent='flex-end' width={'100%'}>
        <Button
          variant={'contained'}
          startIcon={<Add/>}
          onClick={()=>router.push('/candidates/create')}
        >Create</Button>
      </Box>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Candidates
      </Typography>
      <Table size="medium" >
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Profile</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {candidates.map((row: Candidate) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>{row.specialization}</TableCell>
              <TableCell>
                <Button variant={'outlined'}>View</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  )
}
