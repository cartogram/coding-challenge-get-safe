import React, { useState } from 'react'
import {Step} from './components/Step'

interface FullNameStepProps {
  cb: (arg: Record<string, string>) => void
}

const FullNameStep: React.FC<FullNameStepProps> = (props) => {
  
  return (
    <Step />
  )
}

export default FullNameStep
