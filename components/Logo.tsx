import React from 'react'

import { Darumadrop_One } from 'next/font/google';

const logo_font = Darumadrop_One({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-logo',
  });

type Props = {
    size?: string
    slogan?: boolean
}

const Logo = (props: Props) => {
    let size,slogan: string
    switch (props.size) {
        case 'small':
            size = 'text-3xl'
            slogan = 'text-sm'
            break;
        case 'medium':
            size = 'text-5xl'
            slogan = 'text-md'
            break;
        case 'large':
            size = 'text-7xl'
            slogan = 'text-lg'
            break;
        default:
            size = 'text-5xl'
            slogan = 'text-md'
            break;
    }

    console.log(typeof props.slogan)


  return (
    <div className="flex flex-col items-center gap-0 w-fit logo">
        <h1 className={`${logo_font.variable}  ${size} font-logo`}>AI.me</h1>
        {props.slogan && <span className={`${slogan} font-small`}>Share your AI prompts</span>}
    </div>
  )
}

export default Logo
