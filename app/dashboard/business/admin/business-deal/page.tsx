import React from 'react'
import { getAllBusinessDeal } from '../../components/fetches';
import DealTable from './components/dealTable';

const BusinessDeal = async() => {
    const businessDeal = await getAllBusinessDeal();

  return (
    <div>
      <DealTable initialData={businessDeal} />
    </div>
  );
}

export default BusinessDeal;