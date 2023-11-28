import { useAuth } from "@/ui/contexts/AuthContext";

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
import { Job, useGetJobsQuery } from "@/__generated__/graphql";
import { timestampToDateString } from "@/ui/utils";
import Add from "@mui/icons-material/Add";
import { useRouter } from "next/router";

export default function JobsTable() {
  const router = useRouter()
  const { user } = useAuth()
  const { data, loading } = useGetJobsQuery({
    skip: !user?.id,
    fetchPolicy: 'cache-and-network',
  })
  if (loading) return <CircularProgress/>

  const jobs = data?.jobs as Job[];

  if (!jobs) return null;
  return (
    <Box sx={{ maxWidth: '1440px', p: 5 }}>
      <Box display='flex' alignItems='end' justifyContent='flex-end' width={'100%'}>
        <Button
          variant={'contained'}
          startIcon={<Add/>}
          onClick={()=>router.push('/jobs/create')}
        >Create</Button>
      </Box>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Open Positions
      </Typography>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell>Created At</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Open Positions</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobs.map((row: Job) => (
            <TableRow key={row.id}>
              <TableCell>
                {timestampToDateString(row.createdAt as string)}
              </TableCell>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.openPositions}</TableCell>
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
