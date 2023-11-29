import { useRouter } from 'next/router'
import { useGetUserByEmailQuery } from '@/__generated__/graphql'
import { useAuth } from '@/ui/contexts/AuthContext'
import React, { useEffect } from 'react'
import { Box, CircularProgress, CssBaseline, IconButton, Toolbar } from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import Image from 'next/image'
import { SideNav } from '@/ui/components/main/SideNav'
import { AppToolbar } from '@/ui/components/main/AppToolbar'
import { AppBarStyled, Drawer } from '@/ui/components/main/styled'


interface DashboardType {
  children?: React.ReactNode
}

function Main({ children }: DashboardType) {
  const { auth, token, setUserData, isInitialised, user, logout } = useAuth()
  const router = useRouter()
  const { data, loading,error } = useGetUserByEmailQuery({
    variables: {
      email: auth.currentUser?.email || ''
    },
    skip: !auth.currentUser?.email || !token
  })

  useEffect(() => {
    if (data?.userByEmail) {
      setUserData(data.userByEmail)
    }
  }, [data, setUserData])

  useEffect(() => {
    if((error || !data) && !loading && isInitialised) {
      router.push('/sign-in')
    }
  }, [data, error, loading, isInitialised, router])


  const [open, setOpen] = React.useState(true)
  const toggleDrawer = () => {
    setOpen(!open)
  }

  if(loading) return <CircularProgress />

  const logoSize  = open ? 150 : 50
  return (
    <React.Fragment>
      <CssBaseline />
      <Box minHeight={'100vh'} display={'flex'}>
        <Drawer variant="permanent" open={open}>
          {/* eslint-disable-next-line react/jsx-no-undef */}
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              { open ? <ChevronLeftIcon/>
                : <ChevronRightIcon /> }
            </IconButton>
          </Toolbar>
          <Box width={logoSize} height={logoSize} position='relative' overflow='hidden' mx='auto' className='hr-offers-logo'>
            <Image
              src='/img/hr-offers-logo.png'
              alt={'Super HR'}
              fill
              style={{ maxWidth: '150px', maxHeight: '150px', objectFit: 'contain' }}
              priority
            />
          </Box>
          <SideNav/>
        </Drawer>
        <Box sx={{ maxWidth: '100%', flex: 1, flexDirection: 'column', display: 'flex' }}>
          <AppBarStyled position='sticky' elevation={0}>
            <AppToolbar user={user} logout={logout}/>
          </AppBarStyled>
          {children}
        </Box>
      </Box>
    </React.Fragment>
  )
}

export default Main
