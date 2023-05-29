import React from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

import { Step } from './Step'
import { ProductType } from '../types'

const commonComponents = [
  <Step>
    <label>
      Age <input id="age" name="age" type="number" />
    </label>
  </Step>,
  <Step>
    <label>
      Email <input id="email" name="email" type="email" />
    </label>
  </Step>,
]

const config: Record<
  ProductType,
  { title: string; components: React.ReactNode[] }
> = {
  'developer-insurance': {
    title: 'Developer Insurance',
    components: commonComponents,
  },
  'designer-insurance': {
    title: 'Designer Insurance',
    components: [
      ...commonComponents,
      <Step>
        <label>
          First Name <input id="firstName" name="firstName" type="text" />
        </label>
        <label>
          Last Name <input id="lastName" name="lastName" type="text" />
        </label>
      </Step>,
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
      <div>{currentStep}</div>
    </section>
  )
}

function Summary() {
  const [searchParams] = useSearchParams()

  return (
    <>
      Summary <pre>{searchParams.toString()}</pre>
    </>
  )
}
