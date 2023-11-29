import React from 'react'
import { Box, CssBaseline, Toolbar } from '@mui/material'
import Image from 'next/image'
import { AppBarStyled, Drawer } from '@/ui/components/main/styled'


interface DashboardType {
  children?: React.ReactNode
}

function Anonymous({ children }: DashboardType) {
  return (
    <React.Fragment>
      <CssBaseline />
      <Box minHeight={'100vh'} display={'flex'}>
        <Drawer variant="permanent" open={true}>
          {/* eslint-disable-next-line react/jsx-no-undef */}
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
          </Toolbar>
          <Box width={150} height={150} position='relative' overflow='hidden' mx='auto' className='hr-offers-logo'>
            <Image
              src='/img/hr-offers-logo.png'
              alt={'Super HR'}
              fill
              style={{ maxWidth: '150px', maxHeight: '150px', objectFit: 'contain' }}
              priority
            />
          </Box>
        </Drawer>
        <Box sx={{ maxWidth: '100%', flex: 1, flexDirection: 'column', display: 'flex' }}>
          <AppBarStyled position='sticky' elevation={0} />
          {children}
        </Box>
      </Box>
    </React.Fragment>
  )
}

export default Anonymous
