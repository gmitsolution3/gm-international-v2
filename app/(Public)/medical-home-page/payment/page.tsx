import React from "react";

interface PageProps {
  searchParams: {
    id: string;
  };
}

const PaymentPage = async({ searchParams }: PageProps) => {
    const {id}= await searchParams;
    console.log({id:id})

  return <div className="min-h-screen">PaymentPage</div>;
};

export default PaymentPage;
