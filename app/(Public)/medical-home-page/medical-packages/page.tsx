import React from 'react'
import OffersPage from './components/packageCards';
import { fetchMedicalAllPackages } from '../components/fetches';
import generateSEO from "@/lib/seo";

export const metadata = generateSEO(
  "Medical Treatment Services in China & Malaysia",
  "Get complete medical treatment support in China and Malaysia including hospital appointments, medical visa processing, travel assistance, accommodation, and recovery support.",
);

const MedicalPackage = async() => {

    const data = await fetchMedicalAllPackages();

 

  return (
    <div>
      <OffersPage offers={data}/>
    </div>
  );
}

export default MedicalPackage;
