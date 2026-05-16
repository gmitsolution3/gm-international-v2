import React from 'react'
import { getMedicalAnalysis } from '../../components/fetches';
import MedicalDashboardStats from './components/MedicalAnalysisState';

const MedicalAdminAnalysis =async () => {

  const result =await getMedicalAnalysis();

  return (
    <div>
      <MedicalDashboardStats data={result} />
    </div>
  );
}

export default MedicalAdminAnalysis