import React, { useEffect, useState } from 'react'
import FinalShowModal, { FormData } from './finalShowModal';
import { getAllMedicalData } from '@/app/(Public)/medical-home-page/components/fetches';
import { Appointment } from './appointmentForm';
import { ApplicationForm } from '@/app/dashboard/business/components/type';

interface EditApplicationModal {
  isOpen: boolean;
  onClose: () => void;
  selectId: string | null;
  modalData: FormData | undefined | Appointment;
}

export const EditApplication: React.FC<EditApplicationModal> = ({
  isOpen,
  onClose,
  selectId,
  modalData,
}) => {

  const [hospitals, setHospitals] = useState();
  const defaultFormData = async()=>{
    const hospitalData = await getAllMedicalData();
    setHospitals(hospitalData);
  }

  useEffect(()=>{
    defaultFormData();
  },[])


  if (!isOpen || !modalData) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto flex justify-center items-center bg-black/20 backdrop-blur-md p-4">
      <div className="max-h-[80vh] bg-white shadow-xl mg:p-4 lg:p-8 w-full md:max-w-5xl text-center relative flex flex-col items-center overflow-auto rounded-2xl">
        <div className="w-full text-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600"
          >
            Close
          </button>
        </div>

        <div className="w-full">
          {/* <ApplicationView onClose={onClose} /> */}
          <FinalShowModal hospitals={hospitals} initialData={modalData} />
        </div>
      </div>
    </div>
  );
};
