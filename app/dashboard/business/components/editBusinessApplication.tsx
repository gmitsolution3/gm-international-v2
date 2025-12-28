import React, { useEffect, useState } from 'react'
import { getAllMedicalData } from '@/app/(Public)/medical-home-page/components/fetches';
import { ApplicationForm } from '@/app/dashboard/business/components/type';
import FinalBusinessModal from './finalBusiModal';
import { X } from 'lucide-react';

interface EditApplicationModal {
  isOpen: boolean;
  onClose: () => void;
  selectId: string | null;
  modalData: ApplicationForm | undefined;
}

export const EditBusinessApplication: React.FC<EditApplicationModal> = ({
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
            className="px-2 hover:cursor-pointer py-2 text-black hover:bg-red-700 hover:text-white rounded-full"
          >
            <X />
          </button>
        </div>

        <div className="w-full mt-10">
          <FinalBusinessModal defaultData ={modalData}/>
        </div>
      </div>
    </div>
  );
};
