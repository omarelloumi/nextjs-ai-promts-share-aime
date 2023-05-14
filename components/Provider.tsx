"use client"

import { SessionProvider } from 'next-auth/react'

type Props = {
    children: React.ReactNode
}

const Provider = (props: Props) => {
  return (
    <SessionProvider>
        {props.children}
    </SessionProvider>
  )
}

export default Provider
