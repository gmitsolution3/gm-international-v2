import React from 'react'
import MedicalForm from '../../components/MedicalForm'
import { getServerSession } from 'next-auth'
import { authConfig } from '@/auth.config'

const MedicalApplicationForm =async () => {

    const session = await getServerSession(authConfig)
    const authEmail = session?.user?.email

  return (
    <div>
      <MedicalForm authEmail={authEmail} />
    </div>
  );
}

export default MedicalApplicationForm