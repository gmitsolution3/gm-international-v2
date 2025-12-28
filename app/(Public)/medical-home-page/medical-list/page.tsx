import React from 'react'
import { getAllMedicalData } from '../components/fetches';
import ListCard from './components/listCard';


const MedicalList =async() => {


    const getAllMedicalList =await getAllMedicalData();

  return (
    <div>
      <div>
        <ListCard hospitals={getAllMedicalList} />
      </div>
    </div>
  );
}

export default MedicalList;

