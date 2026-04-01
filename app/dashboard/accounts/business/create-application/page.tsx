import { authConfig } from '@/auth.config'
import { getServerSession } from 'next-auth'
import React from 'react'
import BusinessForm from '../../components/BusinessForm'

const BusinessCreateApplication = async() => {

    const session = await getServerSession(authConfig)
    const email = session?.user?.email

  return (
    <div>
        <BusinessForm email={email}/>
    </div>
  )
}

export default BusinessCreateApplication