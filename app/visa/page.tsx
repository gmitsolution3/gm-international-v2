import React from 'react'
import VisaEnrollment from './components/visaEnrollment'
import VisaFlow from './components/visaFlow'
import SupportSection from '../components/HSupport/HSupport'
import VisaProcessFlow from './components/visaTree'
import FlowChart from './components/flowChart'

const Visa = () => {
  return (
    <div>
        <div>

        <VisaEnrollment/>
        </div>
        <div>
            <FlowChart/>
        </div>
        <div>
            <SupportSection/>
        </div>
    </div>
  )
}

export default Visa
