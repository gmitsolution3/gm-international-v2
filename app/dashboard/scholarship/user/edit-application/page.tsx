import React from 'react'
import { UserApplicationsTable } from '../components/applicationTable'
import StudentApplicationManager from '../components/editApplication'

const EditApplication = () => {

  const edit = "edit";

  return (
    <div>
      <StudentApplicationManager edit={edit} />
    </div>
  );
}

export default EditApplication

