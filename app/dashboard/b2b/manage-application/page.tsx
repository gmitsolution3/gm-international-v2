import React from 'react'
import ShowAllApplications from '../components/showAllApplication';
import { getAllB2BApplication } from '../components/fetch';

const ManageApplication = async() => {

  const {data} = await getAllB2BApplication();


  return (
    <div><ShowAllApplications data ={data}/></div>
  )
}

export default ManageApplication;
