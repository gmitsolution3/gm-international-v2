import React from 'react'
import UmrahCard from './UmrahCard';

const UmrahHajjData = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/api/get-home/umrah-packages`,{
        cache: "no-store",
      }
    );
    const data = await res.json();
    return data;
}

const ViewUmrahCard = async () => {
  const umrahData = await UmrahHajjData();

  return (
    <div>
      <UmrahCard packages={umrahData.data} />
    </div>
  );
}

export default ViewUmrahCard