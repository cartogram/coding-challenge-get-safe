import React, { useState } from 'react'
import AgeStep from './AgeStep'
import EmailStep from './EmailStep'
import SummaryStep from './SummaryStep'
import { useParams } from 'react-router-dom'
import FullNameStep from './FullNameStep'

interface BuyflowProps {}

export enum ProductIds {
  devIns = 'dev',
  desIns = 'des',
}

const PRODUCT_IDS_TO_NAMES = {
  [ProductIds.devIns]: 'Developer Insurance',
  [ProductIds.desIns]: 'Designer Insurance',
}

const Buyflow: React.FC<BuyflowProps> = (props) => {
  const params = useParams<{ product: ProductIds }>()
  const intialStep = params.product === ProductIds.devIns ? 'email' : 'fullName'
  const [currentStep, setStep] = useState(intialStep)
  const [collectedData, updateData] = useState({
    email: '',
    age: 0,
    firstName: '',
    lastName: '',
  })

  const getStepCallback = (nextStep: string) => (
    field: Record<string, string | number>
  ) => {
    updateData({ ...collectedData, ...field })
    setStep(nextStep)
  }

  return (
    <>
      <h4>Buying {PRODUCT_IDS_TO_NAMES[params.product]}</h4>

      {(currentStep === 'email' && <EmailStep cb={getStepCallback('age')} />) ||
        (currentStep === 'fullName' && (
          <FullNameStep cb={getStepCallback('email')} />
        )) ||
        (currentStep === 'age' && (
          <AgeStep cb={getStepCallback('summary')} />
        )) ||
        (currentStep === 'summary' && (
          <SummaryStep collectedData={collectedData} />
        ))}
    </>
  )
}

export default Buyflow
