export const fileConfig = {
  title: "Upload your file",
  subTitle: "you build your trust",
  fileData: [
    // scholarship china
    {
      country: "china",
      visaType: "scholarship",
      data: [
        {
          name: "offerLetter",
          type: "file",
          label: "Offer letter +",
          required: true,
        },
        {
          name: "bankStatement",
          type: "file",
          label: "Bank Statement +",
          required: true,
        },
        {
          name: "bankSolvency",
          type: "file",
          label: "Bank Solvency +",
          required: true,
        },
        {
          name: "tuitionPaymentReceipt",
          type: "file",
          label: "Tuition Payment Receipt +",
          required: true,
        },
        {
          name: "academicTranscriptsCertificate",
          type: "file",
          label: "Academic Transcripts & Certificates +",
          required: true,
        },
        {
          name: "policeClearanceCertificates",
          type: "file",
          label: "Police Clearance Certificates +",
          required: true,
        },
        {
          name: "medicalCheckup",
          type: "file",
          label: "Medical Checkup +",
          required: true,
        },
      ],
    },
    // tourist china
    {
      country: "china",
      visaType: "tourist",
      data: [
        {
          name: "flightReservation",
          type: "file",
          label: "Flight Reservation +",
          required: true,
        },
        {
          name: "hotelBookingVouchers",
          type: "file",
          label: "Hotel Booking Vouchers +",
          required: true,
        },
        {
          name: "travelInsurance",
          type: "file",
          label: "Travel Insurance +",
          required: true,
        },
        {
          name: "bankStatement",
          type: "file",
          label: "Bank Statement +",
          required: true,
        },
        {
          name: "employmentLetter",
          type: "file",
          label: "Employment Letter/No Objection +",
          required: true,
        },
      ],
    },
    // medical china
    {
      country: "china",
      visaType: "medical",
      data: [
        {
          name: "hospitalInvitation",
          type: "file",
          label: "Hospital invitation/Appointment confirmation +",
          required: true,
        },
        {
          name: "medicalReports",
          type: "file",
          label: "Medical Reports +",
          required: true,
        },
        {
          name: "proofOfFounds",
          type: "file",
          label: "Proof Of Funds +",
          required: true,
        },
        {
          name: "travelInsurance",
          type: "file",
          label: "Travel Insurance (medical coverage) +",
          required: true,
        },
      ],
    },
    // business china
    {
      country: "china",
      visaType: "business",
      data: [
        {
          name: "invitationLetter",
          type: "file",
          label: "Invitation Letter from Chinese Company +",
          required: true,
        },
        {
          name: "compTradeLicense",
          type: "file",
          label: "Company Trade License +",
          required: true,
        },
        {
          name: "tinOrVat",
          type: "file",
          label: "TIN/VAT +",
          required: true,
        },
        {
          name: "bankStatement",
          type: "file",
          label: "Bank Statement +",
          required: true,
        },
        {
          name: "coverLetter",
          type: "file",
          label: "Cover Letter +",
          required: true,
        },
      ],
    },

    // end of the china document file system:-

    // australia scholarship
    {
      country: "australia",
      visaType: "scholarship",
      data: [
        {
          name: "coe",
          type: "file",
          label: "CoE +",
          required: true,
        },
        {
          name: "oshcProof",
          type: "file",
          label: "OSHC Proof +",
          required: true,
        },
        {
          name: "bankStatement",
          type: "file",
          label: "Bank Statement +",
          required: true,
        },
        {
          name: "gteStatement",
          type: "file",
          label: "GTE Statement +",
          required: true,
        },
        {
          name: "academicTranscriptsCertificate",
          type: "file",
          label: "Academic Transcripts & Certificates +",
          required: true,
        },
        {
          name: "policeClearanceCertificates",
          type: "file",
          label: "Police Clearance Certificates +",
          required: true,
        },
        {
          name: "iteltsOrToeflOrPte",
          type: "file",
          label: "IELTS/TOEFL/PTE Score +",
          required: true,
        },
        {
          name: "healthExam",
          type: "file",
          label: "Health Exam (HAP Id if available) +",
          required: true,
        },
      ],
    },
    // australia tourist

    {
      country: "australia",
      visaType: "tourist",
      data: [
        {
          name: "flightReservation",
          type: "file",
          label: "Flight Reservation +",
          required: true,
        },
        {
          name: "hotelBookingVouchers",
          type: "file",
          label: "Hotel Booking Vouchers +",
          required: true,
        },
        {
          name: "travelInsurance",
          type: "file",
          label: "Travel Insurance +",
          required: true,
        },
        {
          name: "bankStatement",
          type: "file",
          label: "Bank Statement +",
          required: true,
        },
        {
          name: "employmentLetter",
          type: "file",
          label: "Employment Letter/No Objection +",
          required: true,
        },
      ],
    },

    // australia medical

    {
      country: "australia",
      visaType: "medical",
      data: [
        {
          name: "medicalAppointment",
          type: "file",
          label: "Medical Appointment/Referral Letter +",
          required: true,
        },
        {
          name: "medicalReports",
          type: "file",
          label: "Medical Reports +",
          required: true,
        },
        {
          name: "proofOfFounds",
          type: "file",
          label: "Proof Of Funds +",
          required: true,
        },
        {
          name: "travelInsurance",
          type: "file",
          label: "Travel Insurance (medical coverage) +",
          required: true,
        },
      ],
    },

    // australia business

    {
      country: "australia",
      visaType: "business",
      data: [
        {
          name: "invitationLetter",
          type: "file",
          label: "Invitation Letter from Chinese Company +",
          required: true,
        },
        {
          name: "compTradeLicense",
          type: "file",
          label: "Company Trade License +",
          required: true,
        },
        {
          name: "tinOrVat",
          type: "file",
          label: "TIN/VAT +",
          required: true,
        },
        {
          name: "bankStatement",
          type: "file",
          label: "Bank Statement +",
          required: true,
        },
        {
          name: "coverLetter",
          type: "file",
          label: "Cover Letter +",
          required: true,
        },
      ],
    },

    // end of the australia document file system

    // malaysia scholarship
    {
      country: "malaysia",
      visaType: "scholarship",
      data: [
        {
          name: "offerLetter",
          type: "file",
          label: "Offer letter +",
          required: true,
        },
        {
          name: "bankStatement",
          type: "file",
          label: "Bank Statement +",
          required: true,
        },
        {
          name: "medicalScreening",
          type: "file",
          label: "Medical Screening +",
          required: true,
        },
        {
          name: "emgsApprroval",
          type: "file",
          label: "EMGS Approval / VAL +",
          required: true,
        },
        {
          name: "academicCertificate",
          type: "file",
          label: "Academic Certificates +",
          required: true,
        },
        {
          name: "policeClearanceCertificates",
          type: "file",
          label: "Police Clearance Certificates +",
          required: true,
        },
      ],
    },

    // malaysia tourist
    {
      country: "malaysia",
      visaType: "tourist",
      data: [
        {
          name: "flightReservation",
          type: "file",
          label: "Flight Reservation +",
          required: true,
        },
        {
          name: "hotelBookingVouchers",
          type: "file",
          label: "Hotel Booking Vouchers +",
          required: true,
        },
        {
          name: "travelInsurance",
          type: "file",
          label: "Travel Insurance +",
          required: true,
        },
        {
          name: "bankStatement",
          type: "file",
          label: "Bank Statement +",
          required: true,
        },
      ],
    },

    // malaysia medical

    {
      country: "malaysia",
      visaType: "medical",
      data: [
        {
          name: "hospitalInvitation",
          type: "file",
          label: "Hospital invitation/Appointment confirmation +",
          required: true,
        },
        {
          name: "medicalReports",
          type: "file",
          label: "Medical Reports +",
          required: true,
        },
        {
          name: "proofOfFounds",
          type: "file",
          label: "Proof Of Funds +",
          required: true,
        },
        {
          name: "travelInsurance",
          type: "file",
          label: "Travel Insurance (medical coverage) +",
          required: true,
        },
      ],
    },

    // malaysia business
    {
      country: "malaysia",
      visaType: "business",
      data: [
        {
          name: "invitationLetter",
          type: "file",
          label: "Invitation Letter/Event Registration +",
          required: true,
        },
        {
          name: "bankStatement",
          type: "file",
          label: "Bank Statement +",
          required: true,
        },
        {
          name: "coverLetter",
          type: "file",
          label: "Cover Letter & Itinerary +",
          required: true,
        },
        {
          name: "companyRegistration",
          type: "file",
          label: "Company Registration (SSM)/Trade License +",
          required: true,
        },
      ],
    },
  ],
}
