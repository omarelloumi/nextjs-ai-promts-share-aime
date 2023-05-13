"use client"

import { SessionProvider } from 'next-auth/react'

type Props = {
    children: React.ReactNode,
    session?: any,
}

const Provider = (props: Props) => {
  return (
    <SessionProvider session={props.session}>
        {props.children}
    </SessionProvider>
  )
}

export default Provider
