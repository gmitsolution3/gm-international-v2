import React from 'react'
import MainDashboard from './components/showDashboardCard'
import { getServerSession } from 'next-auth';
import { authConfig } from '@/auth.config';

const Dashboard = async () => {

  const session = await getServerSession(authConfig);

  console.log("SESSION", session);

  return (
    <div><MainDashboard /></div>
  )
}

export default Dashboard
