import React from 'react'
import AppointmentForm from './components/submitForm';
import { getAllMedicalData } from '../components/fetches';


const UserSubmitForm = async() => {

  const hospitals = await getAllMedicalData();


  return (
    <div>
      
      
      <AppointmentForm hospitals = {hospitals}/>
    
      </div>
  )
}

export default UserSubmitForm;
