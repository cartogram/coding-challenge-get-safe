import React from 'react'
import {
  useSearchParams,
  useParams,
  LoaderFunctionArgs,
  generatePath,
  ActionFunctionArgs,
  redirect,
} from 'react-router-dom'

import { Step } from './Step'
import { Summary } from './Summary'

import * as api from '../lib/api'
import { ProductType } from '../types'

export function loader({ params }: LoaderFunctionArgs) {
  console.log('Product loader')
  // check if we have a query param in the url
  // if so, we need to redirect to the correct step
  return {}
}

export async function action({ request, params }: ActionFunctionArgs) {
  const { product = '' } = params
  const form = await request.formData()
  const data = formDataToObject(form)
  const search = new URL(request.url).searchParams
  const step = search.get('step') || '0'

  await api.save(data)
  search.set('step', String(Number(step) + 1))

  const nextStepUrl = generatePath(`/buy/:product`, { product })
  return redirect(`${nextStepUrl}?${search.toString()}`)
}

export const Products: React.FC = () => {
  const { product } = useParams<{
    product: ProductType
  }>()

  switch (product) {
    case 'developer-insurance':
      return <ProductDeveloperInsurance />

    case 'designer-insurance':
      return <ProductDesignerInsurance />

    default:
      return (
        <>
          <h1>Product Not Found</h1>
        </>
      )
  }
}

export function ProductDeveloperInsurance() {
  return (
    <section className="Product">
      <h1>Developer Insurance</h1>
      <h2>Step </h2>
      <Steps>
        <EmailStep />
        <FullNameStep />
        <AgeStep />
      </Steps>
    </section>
  )
}

export function ProductDesignerInsurance() {
  return (
    <section className="Product">
      <h1>Designer Insurance</h1>
      <h2>Step</h2>
      <Steps>
        <EmailStep />
        <FullNameStep />
      </Steps>
    </section>
  )
}

export function Steps({ children }: React.PropsWithChildren<{}>) {
  const [params] = useSearchParams()
  const childrenArray = React.Children.toArray(children)
  console.log(params.get('step'))
  const currentStep = childrenArray[Number(params.get('step'))] || <Summary />

  return <div className="Steps">{currentStep}</div>
}

export function AgeStep() {
  console.log(useParams())
  return (
    <Step>
      <label>
        Age <input id="age" name="age" type="number" />
      </label>
    </Step>
  )
}

export function EmailStep() {
  return (
    <Step>
      <label>
        Email{' '}
        <input
          id="age"
          name="email"
          type="email"
          defaultValue="mseccafien@gmail.com"
        />
      </label>
    </Step>
  )
}

export function FullNameStep() {
  return (
    <Step>
      <label>
        First Name <input id="firstName" name="firstName" type="text" />
      </label>
      <label>
        Last Name <input id="lastName" name="lastName" type="text" />
      </label>
    </Step>
  )
}

function formDataToObject(formData: FormData): Record<string, string> {
  const object: Record<string, string> = {}
  formData.forEach((value, key) => {
    if (typeof value === 'string') {
      object[key] = value
      return
    }
  })
  return object
}
