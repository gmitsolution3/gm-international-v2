import React from 'react'
import OffersPage from './components/packageCards';
import { fetchMedicalAllPackages } from '../components/fetches';

const MedicalPackage = async() => {

    const data = await fetchMedicalAllPackages();

 

  return (
    <div>
      <OffersPage offers={data}/>
    </div>
  );
}

export default MedicalPackage;
