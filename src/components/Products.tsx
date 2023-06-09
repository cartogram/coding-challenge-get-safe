import React from 'react'
import {
  useSearchParams,
  useParams,
  LoaderFunctionArgs,
  generatePath,
  ActionFunctionArgs,
  redirect,
  useLocation,
  Link,
  useLoaderData,
  Form,
} from 'react-router-dom'

import * as api from '../lib/api'
import { ProductType } from '../types'

export function loader({ params }: LoaderFunctionArgs) {
  return api.get()
}

export async function action({ request, params }: ActionFunctionArgs) {
  const product = params.product as ProductType
  const form = await request.formData()
  const data = formDataToObject(form)
  const search = new URL(request.url).searchParams
  const step = search.get('step') || '0'

  await api.save({ ...data, product })
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
      <Steps>
        <EmailStep />
        <FullNameStep />
      </Steps>
    </section>
  )
}

export function Steps({ children }: React.PropsWithChildren<{}>) {
  const [params] = useSearchParams()
  const data = useLoaderData() as ReturnType<typeof loader>
  const step = Number(params.get('step') || '0')
  const childrenArray = React.Children.toArray(children)
  const location = useLocation()
  const search = new URLSearchParams(location.search)
  search.set('step', String(step - 1))

  const currentStep = childrenArray[step] || <Summary data={data} />

  const previousLink =
    step > 0 ? (
      <Link to={`${location.pathname}?${search.toString()}`}>Back</Link>
    ) : null

  const progress = (
    <progress
      className="Progress"
      max={childrenArray.length}
      value={step}
    ></progress>
  )

  return (
    <div className="Steps">
      {progress}
      {previousLink}
      {currentStep}
    </div>
  )
}

export function AgeStep() {
  const data = useLoaderData() as ReturnType<typeof loader>

  return (
    <Step>
      <label htmlFor="age" className="Label">
        <span>Age</span>
        <input
          id="age"
          name="age"
          type="number"
          min="16"
          max="120"
          required
          defaultValue={data.age}
        />
      </label>
    </Step>
  )
}

export function EmailStep() {
  const data = useLoaderData() as ReturnType<typeof loader>

  return (
    <Step>
      <label htmlFor="email" className="Label">
        <span>Email</span>
        <input
          id="email"
          name="email"
          type="email"
          defaultValue={data.email}
          required
        />
      </label>
    </Step>
  )
}

export function FullNameStep() {
  const data = useLoaderData() as ReturnType<typeof loader>

  return (
    <Step>
      <label htmlFor="firstName" className="Label">
        <span>First name</span>
        <input
          id="firstName"
          name="firstName"
          required
          defaultValue={data.firstName}
        />
      </label>
      <label htmlFor="lastName" className="Label">
        <span>Last name</span>
        <input
          id="lastName"
          name="lastName"
          required
          defaultValue={data.lastName}
        />
      </label>
    </Step>
  )
}

export const Step: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Form className="Step" method="post">
      {children}
      <button type="submit">Next</button>
    </Form>
  )
}

export const Summary: React.FC<{ data: Record<string, string> }> = ({
  data,
}: {
  data: Record<string, string>
}) => {
  return (
    <>
      <h2>Summary</h2>
      <dl>
        {Object.entries(data).map(([key, value]) => (
          <React.Fragment key={key}>
            <dt>{key}</dt>
            <dd>{value}</dd>
          </React.Fragment>
        ))}
      </dl>
    </>
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
