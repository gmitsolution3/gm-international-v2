"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Application {
  id: string
  university: string
  applicant: string
  applicantId: string
  program: string
  degree: string
  dateApplied: string
  paymentStatus: "Paid" | "Pending"
  applicationStatus: "Approved" | "Rejected" | "Pending"
}

const applications: Application[] = [
  {
    id: "1",
    university: "University Name",
    applicant: "Applicant name",
    applicantId: "Applicant Id.",
    program: "Program",
    degree: "Degree",
    dateApplied: "Date Applied",
    paymentStatus: "Pending",
    applicationStatus: "Rejected",
  },
  {
    id: "2",
    university: "University Name",
    applicant: "Applicant name",
    applicantId: "Applicant Id.",
    program: "Program",
    degree: "Degree",
    dateApplied: "Date Applied",
    paymentStatus: "Paid",
    applicationStatus: "Approved",
  },
  {
    id: "3",
    university: "University Name",
    applicant: "Applicant name",
    applicantId: "Applicant Id.",
    program: "Program",
    degree: "Degree",
    dateApplied: "Date Applied",
    paymentStatus: "Paid",
    applicationStatus: "Approved",
  },
  {
    id: "4",
    university: "University Name",
    applicant: "Applicant name",
    applicantId: "Applicant Id.",
    program: "Program",
    degree: "Degree",
    dateApplied: "Date Applied",
    paymentStatus: "Paid",
    applicationStatus: "Pending",
  },
  {
    id: "5",
    university: "University Name",
    applicant: "Applicant name",
    applicantId: "Applicant Id.",
    program: "Program",
    degree: "Degree",
    dateApplied: "Date Applied",
    paymentStatus: "Pending",
    applicationStatus: "Rejected",
  },
  {
    id: "6",
    university: "University Name",
    applicant: "Applicant name",
    applicantId: "Applicant Id.",
    program: "Program",
    degree: "Degree",
    dateApplied: "Date Applied",
    paymentStatus: "Paid",
    applicationStatus: "Approved",
  },
]

export default function ApplicationTable() {
  const getPaymentStatusColor = (status: string) => {
    if (status === "Paid") return "bg-green-100 text-green-700"
    if (status === "Pending") return "bg-orange-100 text-orange-700"
    return "bg-gray-100 text-gray-700"
  }

  const getApplicationStatusColor = (status: string) => {
    if (status === "Approved") return "bg-green-100 text-green-700"
    if (status === "Rejected") return "bg-red-100 text-red-700"
    if (status === "Pending") return "bg-blue-100 text-blue-700"
    return "bg-gray-100 text-gray-700"
  }

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>University Name</TableHead>
            <TableHead>Applicant name</TableHead>
            <TableHead>Applicant id.</TableHead>
            <TableHead>Program</TableHead>
            <TableHead>Degree</TableHead>
            <TableHead>Date Applied</TableHead>
            <TableHead>Payment Status</TableHead>
            <TableHead>Application Status</TableHead>
            <TableHead>View Form</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((app) => (
            <TableRow key={app.id} className="hover:bg-muted/50">
              <TableCell className="text-sm">{app.university}</TableCell>
              <TableCell className="text-sm">{app.applicant}</TableCell>
              <TableCell className="text-sm">{app.applicantId}</TableCell>
              <TableCell className="text-sm">{app.program}</TableCell>
              <TableCell className="text-sm">{app.degree}</TableCell>
              <TableCell className="text-sm">{app.dateApplied}</TableCell>
              <TableCell>
                <Badge className={`${getPaymentStatusColor(app.paymentStatus)} border-0`}>{app.paymentStatus}</Badge>
              </TableCell>
              <TableCell>
                <Badge className={`${getApplicationStatusColor(app.applicationStatus)} border-0`}>
                  {app.applicationStatus}
                </Badge>
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
