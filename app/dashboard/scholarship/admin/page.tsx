import React from 'react'
import { getScholarshipsAnalysis } from '../components/fetech'
import StudentDashboardStats from './Components/DashboardStats';

const ScholarshipAnalysisMainPage =async () => {
  const res = await getScholarshipsAnalysis();


  return <div><StudentDashboardStats data={res}/></div>;
}

export default ScholarshipAnalysisMainPage