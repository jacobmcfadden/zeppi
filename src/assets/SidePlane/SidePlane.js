import * as React from "react"
import './SidePlane.scss';

function SidePlane(props) {
  return (
    <svg
      width={171.2}
      height={59.1}
      viewBox="0 0 171.2 59.1"
      className="bobble"
      {...props}
    >
      <style>{".sidePlaneTop{fill:#FF3C3C}"}</style>
      <path fill="#D02727" d="M20.7 21.1l-.4 33.2 150.9-28.6z" />
      <path fill="#A32928" d="M29.8 28.8l-9.5 25.5 150.9-28.6z" />
      <path className="sidePlaneTop" d="M0 0l20.7 21.1 150.1 4.7.4-.1z" />
      <path
        className="sidePlaneTop"
        d="M170.9 25.8l-141.1 3 26.5 30.3 114.9-33.4z"
      />
    </svg>
  )
}

export default SidePlane;