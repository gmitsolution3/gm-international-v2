import React from 'react'
import { getAllBusinessDeal } from '../../components/fetches';
import DealTable from './components/dealTable';
import AdminDealTable from './components/AdminDealTable';


const BusinessDeal = async() => {
    const businessDeal = await getAllBusinessDeal();
    


  return (
    <div>
      <div className="min-h-screen">
        <AdminDealTable initialData={businessDeal} />
      </div>
    </div>
  );
}

export default BusinessDeal;