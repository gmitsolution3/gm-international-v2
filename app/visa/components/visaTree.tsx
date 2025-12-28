'use client'

import { Globe, Dessert as Passport, FileText, Worm as Form, CreditCard, MapPin } from 'lucide-react'

const stepsLeft = [
  { id: 1, icon: Globe, title: "Select country" },
  { id: 3, icon: FileText, title: "Upload Required Document" },
  { id: 5, icon: CreditCard, title: "Make your payment" },
]

const stepsRight = [
  { id: 2, icon: Passport, title: "Select Visa Type" },
  { id: 4, icon: Form, title: "Fill up form" },
  { id: 6, icon: MapPin, title: "Track your visa status" },
]

export default function VisaProcessFlow() {
  return (
    <div className="w-full max-w-4xl mx-auto grid grid-cols-2 gap-y-20 relative">
      
      {/* Row 1 */}
      <StepLeft {...stepsLeft[0]} />
      <StepRight {...stepsRight[0]} />

      {/* Horizontal line 1→2 */}
      <LineH row={1} />

      {/* Vertical line 2 → 4 */}
      <LineV col="right" from={1} to={2} />

      {/* Row 2 */}
      <StepLeft {...stepsLeft[1]} />
      <StepRight {...stepsRight[1]} />

      {/* Horizontal line 4←3 */}
      <LineH row={2} reverse />

      {/* Vertical line 3 → 5 */}
      <LineV col="left" from={2} to={3} />

      {/* Row 3 */}
      <StepLeft {...stepsLeft[2]} />
      <StepRight {...stepsRight[2]} />

      {/* Horizontal line 5 → 6 */}
      <LineH row={3} dashed />
    </div>
  )
}

function StepLeft({ icon: Icon, title }: any) {
  return (
    <div className="relative flex justify-end pr-10">
      <div className="w-44 p-4 bg-white shadow rounded-xl text-center">
        <Icon className="mx-auto text-red-500" />
        <p className="mt-2 font-medium">{title}</p>
      </div>
    </div>
  )
}

function StepRight({ icon: Icon, title }: any) {
  return (
    <div className="relative flex justify-start pl-10">
      <div className="w-44 p-4 bg-white shadow rounded-xl text-center">
        <Icon className="mx-auto text-red-500" />
        <p className="mt-2 font-medium">{title}</p>
      </div>
    </div>
  )
}

/* Horizontal line */
function LineH({ row, reverse = false, dashed = false }: any) {
  return (
    <div
      className={`absolute left-0 right-0 flex ${
        reverse ? 'justify-end' : 'justify-start'
      }`}
      style={{ top: `${row * 150 - 60}px` }}
    >
      <div
        className={`w-1/2 border-t-2 ${
          dashed ? 'border-dashed' : 'border-dotted'
        } border-red-400`}
      />
    </div>
  )
}

/* Vertical line */
function LineV({ col, from, to }: any) {
  const left = col === 'left'
  const top = from * 150
  const bottom = to * 150 - 120

  return (
    <div
      className="absolute border-l-2 border-dotted border-red-400"
      style={{
        left: left ? '25%' : '75%',
        top: top,
        height: bottom - top,
      }}
    />
  )
}
