import React from 'react'
import { useParams } from 'react-router-dom'
import { Step } from './Step'

export type InsuranceType = 'developer' | 'designer'

export type ProductType = `${InsuranceType}-insurance`

const config: Record<
  ProductType,
  { title: string; components: React.ReactNode[] }
> = {
  'developer-insurance': {
    title: 'Developer Insurance',
    components: [
      <Step next="/buy/developer-insurance/1">Step 1</Step>,
      <Step next="/buy/developer-insurance/2">Step 2</Step>,
      <Step next="/buy/developer-insurance/3">Step 3</Step>,
    ],
  },
  'designer-insurance': {
    title: 'Designer Insurance',
    components: [
      <Step next="/buy/designer-insurance/1">Step 1</Step>,
      <Step next="/buy/designer-insurance/2">Step 2</Step>,
      <Step next="/buy/designer-insurance/3">Step 3</Step>,
    ],
  },
}

export const Product: React.FC = () => {
  const { product, step = '0' } = useParams<{
    product: ProductType
    step: string
  }>()

  const { title, components } = config[product!]
  const currentStep = components[Number.parseInt(step, 10)] || <Summary />

  return (
    <section className="Product">
      <h2>{title}</h2>
      <div>{step}</div>
      <div>{currentStep}</div>
    </section>
  )
}

function Summary() {
  return <>Summary</>
}
