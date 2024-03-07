import { adjustHue, hsla, toHex} from 'color2k'
import React from 'react'
type Props = {
    Name: string
}

export default function Avatar({Name}: Props) {
    // const color = toHex(hsla((Name.charCodeAt(0)*12)%360, (Name.charCodeAt(0)%26)/26, 0.5, 1));
    // const color2 = toHex(adjustHue(color, 180)); Was a nice idea, but TWCSS doesn't respond to computed values. 
  return (
    <div className={` w-6 h-6 rounded-full bg-gradient-to-br from-pink-500 to-gray-900 text-center text-white font-bold`}>{Name.charAt(0)}</div>
  )
}