import React, { useState } from 'react'

interface EmailStepProps {
  cb: (field: Record<string, string>) => void
}

const EmailStep: React.FC<EmailStepProps> = (props) => {
  const [email, setEmail] = useState('')
  return (
    <>
      <div>
        Email:{' '}
        <input
          type="email"
          onChange={({ target: { value } }) => {
            setEmail(value)
          }}
          value={email}
        ></input>
      </div>
      <button onClick={() => props.cb({ email })}>Next</button>
    </>
  )
}

export default EmailStep
