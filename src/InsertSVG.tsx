import * as React from "react"
import type { SVGProps } from "react"

const InsertIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={8}
    fill="none"
    {...props}>
    <path
      fill="#666D80"
      d="M6.1 12.367V1.433q0-.566.384-.949.383-.382.95-.384.566 0 .95.384.384.383.383.95v10.933L12.633 8.5q.367-.367.934-.367.566 0 .933.367.366.367.367.933 0 .568-.367.934L8.367 16.5a1.28 1.28 0 0 1-.934.4 1.28 1.28 0 0 1-.933-.4L.367 10.367Q0 10 0 9.433q0-.566.367-.933.366-.367.933-.367t.933.367z"
    />
  </svg>
)
export default InsertIcon
