import React from 'react'
import CustomPackage from '../components/custom-package-com/customPackage'
import generateSEO from "@/lib/seo";

export const metadata = generateSEO(
  "Affordable Umrah & Hajj Packages for Saudi Arabia",
  "Explore affordable Umrah and Hajj packages with complete support for Saudi visa processing, flights, accommodation, transportation, and guided religious tours from Bangladesh.",
);


const CustomizePackage = () => {
  return (
    <div>
        <CustomPackage/>
    </div>
  )
}


export default CustomizePackage
