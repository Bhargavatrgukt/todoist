import React from 'react'
import { Button} from 'antd';

const ButtonComponent= ({toggleCollapsed}) => {
  return (
    <Button
    onClick={toggleCollapsed}
    style={{ padding: 0, border: 'none', background: 'transparent' }} // Optional styling
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M19 4.001H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-12a2 2 0 0 0-2-2Zm-15 2a1 1 0 0 1 1-1h4v14H5a1 1 0 0 1-1-1v-12Zm6 13h9a1 1 0 0 0 1-1v-12a1 1 0 0 0-1-1h-9v14Z"
        clipRule="evenodd"
      ></path>
    </svg>
  </Button>
  )
}

export default ButtonComponent