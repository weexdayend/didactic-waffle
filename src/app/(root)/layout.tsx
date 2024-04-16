import Navigation from '@/components/navigation'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Navigation />
      {children}
    </main>
  )
}

export default Layout