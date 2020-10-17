import * as React from "react"

function SvgComponent(props) {
  return (
    <svg
      width={118.5}
      height={191.8}
      viewBox="0 0 118.5 191.8"
      overflow="visible"
      {...props}
    >
      <style />
      <path fill="#ECE391" d="M60.7 191.8l23.5-6.3v-26.9l-23.5-1.9z" />
      <path fill="#ECE391" d="M34.3 185.5l23.6 6.3v-35.1l-23.6 1.9z" />
      <linearGradient
        id="parachute"
        gradientUnits="userSpaceOnUse"
        x1={0}
        y1={77.744}
        x2={118.525}
        y2={77.744}
      >
        <stop offset={0} stopColor="#f0f0f5" />
        <stop offset={1} stopColor="#fff" />
      </linearGradient>
      <path
        d="M59.3 0C26.5 0 0 26.5 0 59.3c0 29.4 47.7 81.4 57.5 91.8-.5.5-.8 1.1-.8 1.8 0 1.4 1.1 2.6 2.6 2.6 1.4 0 2.6-1.1 2.6-2.6 0-.7-.3-1.4-.8-1.9 9.9-10.5 57.5-62.5 57.5-91.8C118.5 26.5 92 0 59.3 0zm-1.6 150.9c-6-7.8-27.2-36-34.8-50.9-8.8-17.4-8.6-25.4-4.9-28.3 3.8-2.9 9.6.3 18.5 17.7 7.6 15 19 51.4 22 61.2-.3 0-.6.1-.8.3zm1.6-.5c-.2 0-.5 0-.7.1-2.5-10.1-11.9-48.3-11.9-65.9 0-20.4 5.6-27 12.5-27s12.5 6.6 12.5 27c0 17.6-9.3 55.8-11.9 65.9-.1-.1-.3-.1-.5-.1zM95.7 100c-7.6 14.9-28.8 43.1-34.8 50.9-.2-.2-.5-.3-.8-.4 3-9.8 14.4-46.2 22-61.2 8.8-17.4 14.7-20.6 18.5-17.7 3.7 3 3.9 11-4.9 28.4z"
        fill="url(#parachute)"
      />
    </svg>
  )
}

export default SvgComponent