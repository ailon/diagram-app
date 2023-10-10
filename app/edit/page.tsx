import dynamic from 'next/dynamic';
import React, { useEffect, useRef } from 'react'
// import DiagramEditor from './components/editor';

// got to import dynamically because otherwise next tries to bundle toolbar on the server
const DiagramEditor = dynamic(() => import('./components/editor'), { ssr: false })

interface Props {
  params: {
    id?: string;
  }
}

const EditDiagram = (props: Props) => {
  return (
    <DiagramEditor />
  )
}

export default EditDiagram