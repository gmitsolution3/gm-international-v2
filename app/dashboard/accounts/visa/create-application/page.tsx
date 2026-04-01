import React from 'react'
import VisaForm from '../../components/VisaForm'
import { getServerSession } from 'next-auth'
import { authConfig } from '@/auth.config'

const VisaApplicationForm =async () => {

    const session = await getServerSession(authConfig)



  return (
    <div><VisaForm email={session?.user?.email}/></div>
  )
}

export default VisaApplicationForm