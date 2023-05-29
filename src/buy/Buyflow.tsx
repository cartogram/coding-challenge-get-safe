import React from 'react'
// import AgeStep from './AgeStep'
// import EmailStep from './EmailStep'
// import SummaryStep from './SummaryStep'
import { useParams } from 'react-router-dom'
// import FullNameStep from './FullNameStep'

interface BuyflowProps {}

export enum Product {
  DeveloperInsurance = 'developer-insurance',
  DesignerInsurance = 'designer-insurance',
}

const PRODUCT_IDS_TO_NAMES = {
  [Product.DeveloperInsurance]: 'Developer Insurance',
  [Product.DesignerInsurance]: 'Designer Insurance',
}


function Steps({product}: {product: Product}) {
  switch(product) {
    default :
      return <>{PRODUCT_IDS_TO_NAMES[product]}</>
    }
    
  
}


const Buyflow: React.FC<BuyflowProps> = (props) => {
  const params = useParams<{ product: Product }>()

  return (
    <>
      <h4>Buying {PRODUCT_IDS_TO_NAMES[params.product]}</h4>
      <Steps product={params.product} />
    </>
  )
}

export default Buyflow
