export const formConfig={
  title: "Visa Processing data",
  subTitle: "We build your trust.",
  formData: [
    //china and scholarship
    {
      country: "china",
      visaType: "scholarship",
      data: [
        {
          section: "* Applicant Info",
          fields: [
            {
              name: "fullName",
              type: "text",
              label: "Full Name",
              required: true,
            },
            {
              name: "fatherName",
              type: "text",
              label: "Father Name",
              required: true,
            },
            {
              name: "motherName",
              type: "text",
              label: "Mother Name",
              required: true,
            },
            {
              name: "dateOfBirth",
              type: "text",
              label: "Date Of Birth",
              required: true,
            },
            { name: "gender", type: "text", label: "Gender", required: true },
            {
              name: "maritalStatus",
              type: "text",
              label: "Marital Status",
              required: true,
            },
            {
              name: "nationality",
              type: "text",
              label: "Nationality",
              required: true,
            },
            {
              name: "nidOrBirthNO",
              type: "text",
              label: "NID/Birth Cert NO.",
              required: true,
            },
          ],
        },
        {
          section: "*Applicant Field Info",
          fields: [
            {
              name: "universityName",
              type: "text",
              label: "University Name",
              required: true,
            },
            {
              name: "programName",
              type: "text",
              label: "Program Name",
              required: true,
            },
            {
              name: "studyLevel",
              type: "text",
              label: "Study level",
              required: true,
            },
            {
              name: "admissionLetter",
              type: "text",
              label: "Admission Letter No.",
              required: true,
            },
            {
              name: "courseStartDate",
              type: "text",
              label: "Course Start Date",
              required: true,
            },
            {
              name: "courseEndDate",
              type: "text",
              label: "Course End Date",
              required: true,
            },
          ],
        },
        {
          section: "Sponsor Details",
          fields: [
            { name: "name", type: "text", label: "Name", required: true },
            {
              name: "relation",
              type: "text",
              label: "Relation",
              required: true,
            },
            {
              name: "occupation",
              type: "text",
              label: "Occupation",
              required: true,
            },
          ],
        },
        {
          section: "Financial Details",
          fields: [
            {
              name: "bankBalanceAmount",
              type: "text",
              label: "Bank Balance Amount",
              required: true,
            },
          ],
        },
        {
          section: "* Passport Details",
          fields: [
            {
              name: "passportNo",
              type: "text",
              label: "Passport NO.",
              required: true,
            },
            {
              name: "placeOfIssue",
              type: "text",
              label: "Place Of Issue",
              required: true,
            },
            {
              name: "DateOfIssue",
              type: "text",
              label: "Date Of Issue",
              required: true,
            },
            {
              name: "dateOfExpire",
              type: "text",
              label: "Date of Expire",
              required: true,
            },
            {
              name: "mrzScan",
              type: "file",
              label: "MRZ Scan (Optional)",
              required: false,
            },
            {
              name: "passportScan",
              type: "file",
              label: "Passport Scan",
              required: true,
            },
          ],
        },
        {
          section: "Contact",
          fields: [
            { name: "email", type: "email", label: "Email", required: true },
            {
              name: "phone",
              type: "text",
              label: "Phone Number",
              required: true,
            },
          ],
        },
        {
          section: "Present Address",
          fields: [
            {
              name: "presentStreet",
              type: "text",
              label: "Street",
              required: true,
            },
            {
              name: "presentCity",
              type: "text",
              label: "City",
              required: true,
            },
            {
              name: "presentPostalCode",
              type: "text",
              label: "Postal Code",
              required: true,
            },
            {
              name: "presentCountry",
              type: "text",
              label: "Country",
              required: true,
            },
          ],
        },
        {
          section: "*Permanent Address",
          fields: [
            {
              name: "permanentStreet",
              type: "text",
              label: "Street",
              required: true,
            },
            {
              name: "permanentCity",
              type: "text",
              label: "City",
              required: true,
            },
            {
              name: " permanentPostalCode",
              type: "text",
              label: "Postal Code",
              required: true,
            },
            {
              name: "permanentCountry",
              type: "text",
              label: "Country",
              required: true,
            },
          ],
        },
        {
          section: "*Travel Info (Generic)",
          fields: [
            {
              name: "intendedTravelData",
              type: "text",
              label: "Intended Travel Date",
              required: true,
            },
            { name: "from", type: "text", label: "From", required: true },
            { name: "to", type: "text", label: "To", required: true },
            { name: "purpose", type: "text", label: "Purpose", required: true },
            {
              name: "previousTravelHistory",
              type: "text",
              label: "Previous Travel History",
              required: true,
            },
            { name: "country", type: "text", label: "Country", required: true },
            { name: "date", type: "text", label: "Date", required: true },
          ],
        },
        {
          section: "* Emergency Contact",
          fields: [
            {
              name: "emergencyName",
              type: "text",
              label: "Name",
              required: true,
            },
            {
              name: "emergencyContactRelation",
              type: "text",
              label: "Relation",
              required: true,
            },
            {
              name: "emergencyPhone",
              type: "text",
              label: "Phone",
              required: true,
            },
            {
              name: "emergencyAddress",
              type: "text",
              label: "Address",
              required: true,
            },
          ],
        },
      ],
    },
    //china and tourist
    {
      country: "china",
      visaType: "tourist",
      data: [
        {
          section: "* Applicant Info",
          fields: [
            {
              name: "fullName",
              type: "text",
              label: "Full Name",
              required: true,
            },
            {
              name: "fatherName",
              type: "text",
              label: "Father Name",
              required: true,
            },
            {
              name: "motherName",
              type: "text",
              label: "Mother Name",
              required: true,
            },
            {
              name: "dateOfBirth",
              type: "text",
              label: "Date Of Birth",
              required: true,
            },
            { name: "gender", type: "text", label: "Gender", required: true },
            {
              name: "maritalStatus",
              type: "text",
              label: "Marital Status",
              required: true,
            },
            {
              name: "chinaTouristNationality",
              type: "text",
              label: "Nationality",
              required: true,
            },
            {
              name: "chinaTouristNIDOrBirthNO",
              type: "text",
              label: "NID/Birth Cert NO.",
              required: true,
            },
          ],
        },
        {
          section: "*Applicant Field Info",
          fields: [
            {
              name: "travelItinerary",
              type: "text",
              label: "Travel Itinerary",
              required: true,
            },
            { name: "city", type: "text", label: "City", required: true },
            { name: "date", type: "text", label: "Date", required: true },
          ],
        },
        {
          section: "*Hotel",
          fields: [
            {
              name: "hotelBookings",
              type: "text",
              label: "Hotel Bookings",
              required: true,
            },
            {
              name: "returnTicketPNR",
              type: "text",
              label: "Return Ticket PNR",
              required: true,
            },
          ],
        },
        {
          section: "*Invite Details",
          fields: [
            {
              name: "inviterInChina",
              type: "text",
              label: "Inviter In China",
              required: true,
            },
            {
              name: "inviterName",
              type: "text",
              label: "Inviter Name",
              required: true,
            },
            {
              name: "inviterMail",
              type: "email",
              label: "Inviter Email",
              required: true,
            },
          ],
        },
        {
          section: "* Passport Details",
          fields: [
            {
              name: "passportNo",
              type: "text",
              label: "Passport NO.",
              required: true,
            },
            {
              name: "placeOfIssue",
              type: "text",
              label: "Place Of Issue",
              required: true,
            },
            {
              name: "DateOfIssue",
              type: "text",
              label: "Date Of Issue",
              required: true,
            },
            {
              name: "dateOfExpire",
              type: "text",
              label: "Date of Expire",
              required: true,
            },
            {
              name: "mrzScan",
              type: "file",
              label: "MRZ Scan (Optional)",
              required: false,
            },
            {
              name: "passportScan",
              type: "file",
              label: "Passport Scan",
              required: true,
            },
          ],
        },
        {
          section: "Contact",
          fields: [
            { name: "email", type: "email", label: "Email", required: true },
            {
              name: "phone",
              type: "text",
              label: "Phone Number",
              required: true,
            },
          ],
        },
        {
          section: "Present Address",
          fields: [
            {
              name: "presentStreet",
              type: "text",
              label: "Street",
              required: true,
            },
            {
              name: "presentCity",
              type: "text",
              label: "City",
              required: true,
            },
            {
              name: "presentPostalCode",
              type: "text",
              label: "Postal Code",
              required: true,
            },
            {
              name: "presentCountry",
              type: "text",
              label: "Country",
              required: true,
            },
          ],
        },
        {
          section: "*Permanent Address",
          fields: [
            {
              name: "permanentStreet",
              type: "text",
              label: "Street",
              required: true,
            },
            {
              name: "permanentCity",
              type: "text",
              label: "City",
              required: true,
            },
            {
              name: "permanentPostalCode",
              type: "text",
              label: "Postal Code",
              required: true,
            },
            {
              name: "permanentCountry",
              type: "text",
              label: "Country",
              required: true,
            },
          ],
        },
        {
          section: "*Travel Info (Generic)",
          fields: [
            {
              name: "intendedTravelData",
              type: "text",
              label: "Intended Travel Date",
              required: true,
            },
            { name: "from", type: "text", label: "From", required: true },
            { name: "to", type: "text", label: "To", required: true },
            { name: "purpose", type: "text", label: "Purpose", required: true },
            {
              name: "previousTravelHistory",
              type: "text",
              label: "Previous Travel History",
              required: true,
            },
            { name: "country", type: "text", label: "Country", required: true },
            { name: "date", type: "text", label: "Date", required: true },
          ],
        },
        {
          section: "* Emergency Contact",
          fields: [
            {
              name: "emergencyName",
              type: "text",
              label: "Name",
              required: true,
            },
            {
              name: "emergencyContactRelation",
              type: "text",
              label: "Relation",
              required: true,
            },
            {
              name: "emergencyPhone",
              type: "text",
              label: "Phone",
              required: true,
            },
            {
              name: "emergencyAddress",
              type: "text",
              label: "Address",
              required: true,
            },
          ],
        },
      ],
    },
    //china and medical
    {
      country: "china",
      visaType: "Medical",
      data: [
        {
          section: "* Applicant Info",
          fields: [
            {
              name: "fullName",
              type: "text",
              label: "Full Name",
              required: true,
            },
            {
              name: "fatherName",
              type: "text",
              label: "Father Name",
              required: true,
            },
            {
              name: "motherName",
              type: "text",
              label: "Mother Name",
              required: true,
            },
            {
              name: "dateOfBirth",
              type: "text",
              label: "Date Of Birth",
              required: true,
            },
            { name: "gender", type: "text", label: "Gender", required: true },
            {
              name: "maritalStatus",
              type: "text",
              label: "Marital Status",
              required: true,
            },
            {
              name: "nationality",
              type: "text",
              label: "Nationality",
              required: true,
            },
            {
              name: "nidOrBirthNO",
              type: "text",
              label: "NID/Birth Cert NO.",
              required: true,
            },
          ],
        },
        {
          section: "*Medical Info",
          fields: [
            {
              name: "treatmentHospitalOrClinicName",
              type: "text",
              label: "Treatment Hospital/Clinic Name",
              required: true,
            },
            {
              name: "treatingDoctorName",
              type: "text",
              label: "Treating Doctor Name",
              required: true,
            },
            {
              name: "treatingDoctorDep",
              type: "text",
              label: "Treating Doctor Department",
              required: true,
            },
          ],
        },
        {
          section: "* Appointment details",
          fields: [
            {
              name: "appointmentOrAdmissionDate",
              type: "text",
              label: "Appointment/Admission Date",
              required: true,
            },
            {
              name: "appointmentSerialNO.",
              type: "text",
              label: "Appointment Serial NO.",
              required: true,
            },
          ],
        },
        {
          section: "* Attendant",
          fields: [
            {
              name: "attendantTraveling",
              type: "text",
              label: "Attendant(s) traveling",
              required: true,
            },
            {
              name: "attendantName",
              type: "text",
              label: "Attendant Name",
              required: true,
            },
            {
              name: "relation",
              type: "text",
              label: "Relation",
              required: true,
            },
          ],
        },
        {
          section: "* Passport Details",
          fields: [
            {
              name: "passportNo",
              type: "text",
              label: "Passport NO.",
              required: true,
            },
            {
              name: "placeOfIssue",
              type: "text",
              label: "Place Of Issue",
              required: true,
            },
            {
              name: "DateOfIssue",
              type: "text",
              label: "Date Of Issue",
              required: true,
            },
            {
              name: "dateOfExpire",
              type: "text",
              label: "Date of Expire",
              required: true,
            },
            {
              name: "mrzScan",
              type: "file",
              label: "MRZ Scan (Optional)",
              required: false,
            },
            {
              name: "passportScan",
              type: "file",
              label: "Passport Scan",
              required: true,
            },
          ],
        },
        {
          section: "Contact",
          fields: [
            { name: "email", type: "email", label: "Email", required: true },
            {
              name: "phone",
              type: "text",
              label: "Phone Number",
              required: true,
            },
          ],
        },
        {
          section: "Present Address",
          fields: [
            {
              name: "presentStreet",
              type: "text",
              label: "Street",
              required: true,
            },
            {
              name: "presentCity",
              type: "text",
              label: "City",
              required: true,
            },
            {
              name: "presentPostalCode",
              type: "text",
              label: "Postal Code",
              required: true,
            },
            {
              name: "presentCountry",
              type: "text",
              label: "Country",
              required: true,
            },
          ],
        },
        {
          section: "*Permanent Address",
          fields: [
            {
              name: "permanentStreet",
              type: "text",
              label: "Street",
              required: true,
            },
            {
              name: "permanentCity",
              type: "text",
              label: "City",
              required: true,
            },
            {
              name: "permanentPostalCode",
              type: "text",
              label: "Postal Code",
              required: true,
            },
            {
              name: "permanentCountry",
              type: "text",
              label: "Country",
              required: true,
            },
          ],
        },
        {
          section: "*Travel Info (Generic)",
          fields: [
            {
              name: "intendedTravelData",
              type: "text",
              label: "Intended Travel Date",
              required: true,
            },
            { name: "from", type: "text", label: "From", required: true },
            { name: "to", type: "text", label: "To", required: true },
            { name: "purpose", type: "text", label: "Purpose", required: true },
            {
              name: "previousTravelHistory",
              type: "text",
              label: "Previous Travel History",
              required: true,
            },
            { name: "country", type: "text", label: "Country", required: true },
            { name: "date", type: "text", label: "Date", required: true },
          ],
        },
        {
          section: "* Emergency Contact",
          fields: [
            {
              name: "emergencyName",
              type: "text",
              label: "Name",
              required: true,
            },
            {
              name: "emergencyContactRelation",
              type: "text",
              label: "Relation",
              required: true,
            },
            {
              name: "emergencyPhone",
              type: "text",
              label: "Phone",
              required: true,
            },
            {
              name: "emergencyAddress",
              type: "text",
              label: "Address",
              required: true,
            },
          ],
        },
      ],
    },
    //china and business
    {
      country: "china",
      visaType: "business",
      data: [
        {
          section: "* Applicant Info",
          fields: [
            {
              name: "fullName",
              type: "text",
              label: "Full Name",
              required: true,
            },
            {
              name: "fatherName",
              type: "text",
              label: "Father Name",
              required: true,
            },
            {
              name: "motherName",
              type: "text",
              label: "Mother Name",
              required: true,
            },
            {
              name: "dateOfBirth",
              type: "text",
              label: "Date Of Birth",
              required: true,
            },
            { name: "gender", type: "text", label: "Gender", required: true },
            {
              name: "maritalStatus",
              type: "text",
              label: "Marital Status",
              required: true,
            },
            {
              name: "nationality",
              type: "text",
              label: "Nationality",
              required: true,
            },
            {
              name: "nidOrBirthNO",
              type: "text",
              label: "NID/Birth Cert NO.",
              required: true,
            },
          ],
        },
        {
          section: "*INviting Company Details",
          fields: [
            {
              name: "companyName",
              type: "text",
              label: "Company Name",
              required: true,
            },
            {
              name: "invitationLetterNO.",
              type: "text",
              label: "Invitation Letter NO./Reference",
              required: true,
            },
          ],
        },
        {
          section: "*Chinese Company Contact Person Details",
          fields: [
            {
              name: "comPhone",
              type: "text",
              label: "Phone",
              required: true,
            },
            {
              name: "address",
              type: "text",
              label: "Address",
              required: true,
            },
          ],
        },
        {
          section: "Meeting/Exhibition Details",
          fields: [
            {
              name: "meetingDate",
              type: "text",
              label: "Meeting Date",
              required: true,
            },
          ],
        },
        {
          section: "* Applicant’s Company Details",
          fields: [
            {
              name: "applicantCompanyName",
              type: "text",
              label: "Applicant Company Name",
              required: true,
            },
            {
              name: "applicantDesignation",
              type: "text",
              label: "Applicant Designation",
              required: true,
            },
          ],
        },
        {
          section: "* Passport Details",
          fields: [
            {
              name: "passportNo",
              type: "text",
              label: "Passport NO.",
              required: true,
            },
            {
              name: "placeOfIssue",
              type: "text",
              label: "Place Of Issue",
              required: true,
            },
            {
              name: "DateOfIssue",
              type: "text",
              label: "Date Of Issue",
              required: true,
            },
            {
              name: "dateOfExpire",
              type: "text",
              label: "Date of Expire",
              required: true,
            },
            {
              name: "mrzScan",
              type: "file",
              label: "MRZ Scan (Optional)",
              required: false,
            },
            {
              name: "passportScan",
              type: "file",
              label: "Passport Scan",
              required: true,
            },
          ],
        },
        {
          section: "Contact",
          fields: [
            { name: "email", type: "email", label: "Email", required: true },
            {
              name: "phone",
              type: "text",
              label: "Phone Number",
              required: true,
            },
          ],
        },
        {
          section: "Present Address",
          fields: [
            {
              name: "presentStreet",
              type: "text",
              label: "Street",
              required: true,
            },
            {
              name: "presentCity",
              type: "text",
              label: "City",
              required: true,
            },
            {
              name: "presentPostalCode",
              type: "text",
              label: "Postal Code",
              required: true,
            },
            {
              name: "presentCountry",
              type: "text",
              label: "Country",
              required: true,
            },
          ],
        },
        {
          section: "*Permanent Address",
          fields: [
            {
              name: "permanentStreet",
              type: "text",
              label: "Street",
              required: true,
            },
            {
              name: "permanentCity",
              type: "text",
              label: "City",
              required: true,
            },
            {
              name: "permanentPostalCode",
              type: "text",
              label: "Postal Code",
              required: true,
            },
            {
              name: "permanentCountry",
              type: "text",
              label: "Country",
              required: true,
            },
          ],
        },
        {
          section: "*Travel Info (Generic)",
          fields: [
            {
              name: "intendedTravelData",
              type: "text",
              label: "Intended Travel Date",
              required: true,
            },
            { name: "from", type: "text", label: "From", required: true },
            { name: "to", type: "text", label: "To", required: true },
            { name: "purpose", type: "text", label: "Purpose", required: true },
            {
              name: "previousTravelHistory",
              type: "text",
              label: "Previous Travel History",
              required: true,
            },
            { name: "country", type: "text", label: "Country", required: true },
            { name: "date", type: "text", label: "Date", required: true },
          ],
        },
        {
          section: "* Emergency Contact",
          fields: [
            {
              name: "emergencyName",
              type: "text",
              label: "Name",
              required: true,
            },
            {
              name: "emergencyContactRelation",
              type: "text",
              label: "Relation",
              required: true,
            },
            {
              name: "emergencyPhone",
              type: "text",
              label: "Phone",
              required: true,
            },
            {
              name: "emergencyAddress",
              type: "text",
              label: "Address",
              required: true,
            },
          ],
        },
      ],
    },

    //australia scholarship
    {
      country: "australia",
      visaType: "scholarship",
      data: [
        {
          section: "* Applicant Info",
          fields: [
            {
              name: "fullName",
              type: "text",
              label: "Full Name",
              required: true,
            },
            {
              name: "fatherName",
              type: "text",
              label: "Father Name",
              required: true,
            },
            {
              name: "motherName",
              type: "text",
              label: "Mother Name",
              required: true,
            },
            {
              name: "dateOfBirth",
              type: "text",
              label: "Date Of Birth",
              required: true,
            },
            { name: "gender", type: "text", label: "Gender", required: true },
            {
              name: "maritalStatus",
              type: "text",
              label: "Marital Status",
              required: true,
            },
            {
              name: "nationality",
              type: "text",
              label: "Nationality",
              required: true,
            },
            {
              name: "nidOrBirthNO",
              type: "text",
              label: "NID/Birth Cert NO.",
              required: true,
            },
          ],
        },
        {
          section: "*Provider Verify Info",
          fields: [
            {
              name: "providerCode",
              type: "text",
              label: "Provider (CRICOS) Code",
              required: true,
            },
            {
              name: "coeNumber",
              type: "text",
              label: "CoE Number(s)",
              required: true,
            },
            {
              name: "oshcInsurancePolicy",
              type: "text",
              label: "OSHC Insurance Provider & Policy No",
              required: true,
            },
            {
              name: "getStatementSummary",
              type: "text",
              label: "GTE statement summary (textarea)",
              required: true,
            },
          ],
        },
        {
          section: "* Sponsor Details",
          fields: [
            {
              name: "haveAnySponsor",
              type: "text",
              label: "Have Any sponsor?",
              required: true,
            },
          ],
        },
        {
          section: "",
          fields: [
            {
              name: "sponsorDetails",
              type: "text",
              label: "Name",
              required: true,
            },
            {
              name: "sponsorRelation",
              type: "text",
              label: "Relation",
              required: true,
            },
            {
              name: "occupation",
              type: "text",
              label: "Occupation",
              required: true,
            },
          ],
        },
        {
          section: "* Passport Details",
          fields: [
            {
              name: "passportNo",
              type: "text",
              label: "Passport NO.",
              required: true,
            },
            {
              name: "placeOfIssue",
              type: "text",
              label: "Place Of Issue",
              required: true,
            },
            {
              name: "DateOfIssue",
              type: "text",
              label: "Date Of Issue",
              required: true,
            },
            {
              name: "dateOfExpire",
              type: "text",
              label: "Date of Expire",
              required: true,
            },
            {
              name: "mrzScan",
              type: "file",
              label: "MRZ Scan (Optional)",
              required: false,
            },
            {
              name: "passportScan",
              type: "file",
              label: "Passport Scan",
              required: true,
            },
          ],
        },
        {
          section: "Contact",
          fields: [
            { name: "email", type: "email", label: "Email", required: true },
            {
              name: "phone",
              type: "text",
              label: "Phone Number",
              required: true,
            },
          ],
        },
        {
          section: "Present Address",
          fields: [
            {
              name: "presentStreet",
              type: "text",
              label: "Street",
              required: true,
            },
            {
              name: "presentCity",
              type: "text",
              label: "City",
              required: true,
            },
            {
              name: "presentPostalCode",
              type: "text",
              label: "Postal Code",
              required: true,
            },
            {
              name: "presentCountry",
              type: "text",
              label: "Country",
              required: true,
            },
          ],
        },
        {
          section: "*Permanent Address",
          fields: [
            {
              name: "permanentStreet",
              type: "text",
              label: "Street",
              required: true,
            },
            {
              name: "permanentCity",
              type: "text",
              label: "City",
              required: true,
            },
            {
              name: "permanentPostalCode",
              type: "text",
              label: "Postal Code",
              required: true,
            },
            {
              name: "permanentCountry",
              type: "text",
              label: "Country",
              required: true,
            },
          ],
        },
        {
          section: "*Travel Info (Generic)",
          fields: [
            {
              name: "intendedTravelData",
              type: "text",
              label: "Intended Travel Date",
              required: true,
            },
            { name: "from", type: "text", label: "From", required: true },
            { name: "to", type: "text", label: "To", required: true },
            { name: "purpose", type: "text", label: "Purpose", required: true },
            {
              name: "previousTravelHistory",
              type: "text",
              label: "Previous Travel History",
              required: true,
            },
            { name: "country", type: "text", label: "Country", required: true },
            { name: "date", type: "text", label: "Date", required: true },
          ],
        },
        {
          section: "* Emergency Contact",
          fields: [
            {
              name: "emergencyName",
              type: "text",
              label: "Name",
              required: true,
            },
            {
              name: "emergencyContactRelation",
              type: "text",
              label: "Relation",
              required: true,
            },
            {
              name: "emergencyPhone",
              type: "text",
              label: "Phone",
              required: true,
            },
            {
              name: "emergencyAddress",
              type: "text",
              label: "Address",
              required: true,
            },
          ],
        },
      ],
    },
    {
      country: "australia",
      visaType: "tourist",
      data: [
        {
          section: "* Applicant Info",
          fields: [
            {
              name: "fullName",
              type: "text",
              label: "Full Name",
              required: true,
            },
            {
              name: "fatherName",
              type: "text",
              label: "Father Name",
              required: true,
            },
            {
              name: "motherName",
              type: "text",
              label: "Mother Name",
              required: true,
            },
            {
              name: "dateOfBirth",
              type: "text",
              label: "Date Of Birth",
              required: true,
            },
            { name: "gender", type: "text", label: "Gender", required: true },
            {
              name: "maritalStatus",
              type: "text",
              label: "Marital Status",
              required: true,
            },
            {
              name: "nationality",
              type: "text",
              label: "Nationality",
              required: true,
            },
            {
              name: "nidOrBirthNO",
              type: "text",
              label: "NID/Birth Cert NO.",
              required: true,
            },
          ],
        },
        {
          section: "* Applicant Field Info",
          fields: [
            {
              name: "travelItinerary",
              type: "text",
              label: "Travel Itinerary",
              required: true,
            },
            {
              name: "city",
              type: "text",
              label: "City",
              required: true,
            },
            {
              name: "touristDate",
              type: "text",
              label: "Date",
              required: true,
            },
          ],
        },
        {
          section: "* Employment Status",
          fields: [
            {
              name: "australiaTouristStatus",
              type: "text",
              label: "Status",
              required: true,
            },
            {
              name: "australiaReturnTicketPNR",
              type: "text",
              label: "Return Ticket PNR",
              required: true,
            },
          ],
        },
        {
          section: "* Family  Brief",
          fields: [
            {
              name: "australiaTouristFamilyTies",
              type: "text",
              label: "Family ties in BD (brief)",
              required: true,
            },
          ],
        },
        {
          section: "* Passport Details",
          fields: [
            {
              name: "passportNo",
              type: "text",
              label: "Passport NO.",
              required: true,
            },
            {
              name: "placeOfIssue",
              type: "text",
              label: "Place Of Issue",
              required: true,
            },
            {
              name: "DateOfIssue",
              type: "text",
              label: "Date Of Issue",
              required: true,
            },
            {
              name: "dateOfExpire",
              type: "text",
              label: "Date of Expire",
              required: true,
            },
            {
              name: "mrzScan",
              type: "file",
              label: "MRZ Scan (Optional)",
              required: false,
            },
            {
              name: "passportScan",
              type: "file",
              label: "Passport Scan",
              required: true,
            },
          ],
        },
        {
          section: "Contact",
          fields: [
            { name: "email", type: "email", label: "Email", required: true },
            {
              name: "phone",
              type: "text",
              label: "Phone Number",
              required: true,
            },
          ],
        },
        {
          section: "Present Address",
          fields: [
            {
              name: "presentStreet",
              type: "text",
              label: "Street",
              required: true,
            },
            {
              name: "presentCity",
              type: "text",
              label: "City",
              required: true,
            },
            {
              name: "presentPostalCode",
              type: "text",
              label: "Postal Code",
              required: true,
            },
            {
              name: "presentCountry",
              type: "text",
              label: "Country",
              required: true,
            },
          ],
        },
        {
          section: "*Permanent Address",
          fields: [
            {
              name: "permanentStreet",
              type: "text",
              label: "Street",
              required: true,
            },
            {
              name: "permanentCity",
              type: "text",
              label: "City",
              required: true,
            },
            {
              name: "permanentPostalCode",
              type: "text",
              label: "Postal Code",
              required: true,
            },
            {
              name: "permanentCountry",
              type: "text",
              label: "Country",
              required: true,
            },
          ],
        },
        {
          section: "*Travel Info (Generic)",
          fields: [
            {
              name: "intendedTravelData",
              type: "text",
              label: "Intended Travel Date",
              required: true,
            },
            { name: "from", type: "text", label: "From", required: true },
            { name: "to", type: "text", label: "To", required: true },
            { name: "purpose", type: "text", label: "Purpose", required: true },
            {
              name: "previousTravelHistory",
              type: "text",
              label: "Previous Travel History",
              required: true,
            },
            { name: "country", type: "text", label: "Country", required: true },
            { name: "date", type: "text", label: "Date", required: true },
          ],
        },
        {
          section: "* Emergency Contact",
          fields: [
            {
              name: "emergencyName",
              type: "text",
              label: "Name",
              required: true,
            },
            {
              name: "emergencyContactRelation",
              type: "text",
              label: "Relation",
              required: true,
            },
            {
              name: "emergencyPhone",
              type: "text",
              label: "Phone",
              required: true,
            },
            {
              name: "emergencyAddress",
              type: "text",
              label: "Address",
              required: true,
            },
          ],
        },
      ],
    },
    {
      country: "australia",
      visaType: "medical",
      data: [
        {
          section: "* Applicant Info",
          fields: [
            {
              name: "fullName",
              type: "text",
              label: "Full Name",
              required: true,
            },
            {
              name: "fatherName",
              type: "text",
              label: "Father Name",
              required: true,
            },
            {
              name: "motherName",
              type: "text",
              label: "Mother Name",
              required: true,
            },
            {
              name: "dateOfBirth",
              type: "text",
              label: "Date Of Birth",
              required: true,
            },
            { name: "gender", type: "text", label: "Gender", required: true },
            {
              name: "maritalStatus",
              type: "text",
              label: "Marital Status",
              required: true,
            },
            {
              name: "nationality",
              type: "text",
              label: "Nationality",
              required: true,
            },
            {
              name: "nidOrBirthNO",
              type: "text",
              label: "NID/Birth Cert NO.",
              required: true,
            },
          ],
        },
        {
          section: "* Applicant Info",
          fields: [
            {
              name: "treatmentHospital",
              type: "text",
              label: "Treatment Hospital/Clinic Name",
              required: true,
            },
            {
              name: "treatingDoctor",
              type: "text",
              label: "Treating Doctor Name",
              required: true,
            },
            {
              name: "treatingDoctorDep",
              type: "text",
              label: "Treating Doctor Department",
              required: true,
            },
          ],
        },
        {
          section: "* Appointment details",
          fields: [
            {
              name: "appointmentDate",
              type: "text",
              label: "Appointment/Admission Date",
              required: true,
            },
            {
              name: "appointmentSerial",
              type: "text",
              label: "Appointment Serial no.",
              required: true,
            },
          ],
        },
        {
          section: "* Attendant",
          fields: [
            {
              name: "australiaMedicalAttendantTraveling",
              type: "text",
              label: "Attendant(s) traveling?",
              required: true,
            },
            {
              name: "australiaMedicalAttendantName",
              type: "text",
              label: " Attendant name",
              required: true,
            },
            {
              name: "australiaMedicalAttendantRelation",
              type: "text",
              label: "Relation",
              required: true,
            },
          ],
        },
        {
          section: "* Treatment Facility",
          fields: [
            {
              name: "australiaMedicalTreatmentFacility",
              type: "text",
              label: "Treatment Facility Name",
              required: true,
            },
            {
              name: "australiaMedicalAssessmentReferral",
              type: "text",
              label: "HAP ID / Health Assessment referral (if any)",
              required: false,
            },
          ],
        },
        {
          section: "* Passport Details",
          fields: [
            {
              name: "passportNo",
              type: "text",
              label: "Passport NO.",
              required: true,
            },
            {
              name: "placeOfIssue",
              type: "text",
              label: "Place Of Issue",
              required: true,
            },
            {
              name: "DateOfIssue",
              type: "text",
              label: "Date Of Issue",
              required: true,
            },
            {
              name: "dateOfExpire",
              type: "text",
              label: "Date of Expire",
              required: true,
            },
            {
              name: "mrzScan",
              type: "file",
              label: "MRZ Scan (Optional)",
              required: false,
            },
            {
              name: "passportScan",
              type: "file",
              label: "Passport Scan",
              required: true,
            },
          ],
        },
        {
          section: "Contact",
          fields: [
            { name: "email", type: "email", label: "Email", required: true },
            { name: "otp", type: "text", label: "Type OTP", required: true },
          ],
        },
        {
          section: "Present Address",
          fields: [
            {
              name: "presentStreet",
              type: "text",
              label: "Street",
              required: true,
            },
            {
              name: "presentCity",
              type: "text",
              label: "City",
              required: true,
            },
            {
              name: "presentPostalCode",
              type: "text",
              label: "Postal Code",
              required: true,
            },
            {
              name: "presentCountry",
              type: "text",
              label: "Country",
              required: true,
            },
          ],
        },
        {
          section: "*Permanent Address",
          fields: [
            {
              name: "permanentStreet",
              type: "text",
              label: "Street",
              required: true,
            },
            {
              name: "permanentCity",
              type: "text",
              label: "City",
              required: true,
            },
            {
              name: "permanentPostalCode",
              type: "text",
              label: "Postal Code",
              required: true,
            },
            {
              name: "permanentCountry",
              type: "text",
              label: "Country",
              required: true,
            },
          ],
        },
        {
          section: "*Travel Info (Generic)",
          fields: [
            {
              name: "intendedTravelData",
              type: "text",
              label: "Intended Travel Date",
              required: true,
            },
            { name: "from", type: "text", label: "From", required: true },
            { name: "to", type: "text", label: "To", required: true },
            { name: "purpose", type: "text", label: "Purpose", required: true },
            {
              name: "previousTravelHistory",
              type: "text",
              label: "Previous Travel History",
              required: true,
            },
            { name: "country", type: "text", label: "Country", required: true },
            { name: "date", type: "text", label: "Date", required: true },
          ],
        },
        {
          section: "* Emergency Contact",
          fields: [
            {
              name: "emergencyName",
              type: "text",
              label: "Name",
              required: true,
            },
            {
              name: "emergencyContactRelation",
              type: "text",
              label: "Relation",
              required: true,
            },
            {
              name: "emergencyPhone",
              type: "text",
              label: "Phone",
              required: true,
            },
            {
              name: "emergencyAddress",
              type: "text",
              label: "Address",
              required: true,
            },
          ],
        },
      ],
    },
    {
      country: "australia",
      visaType: "business",
      data: [
        {
          section: "* Applicant Info",
          fields: [
            {
              name: "fullName",
              type: "text",
              label: "Full Name",
              required: true,
            },
            {
              name: "fatherName",
              type: "text",
              label: "Father Name",
              required: true,
            },
            {
              name: "motherName",
              type: "text",
              label: "Mother Name",
              required: true,
            },
            {
              name: "dateOfBirth",
              type: "text",
              label: "Date Of Birth",
              required: true,
            },
            { name: "gender", type: "text", label: "Gender", required: true },
            {
              name: "maritalStatus",
              type: "text",
              label: "Marital Status",
              required: true,
            },
            {
              name: "nationality",
              type: "text",
              label: "Nationality",
              required: true,
            },
            {
              name: "nidOrBirthNO",
              type: "text",
              label: "NID/Birth Cert NO.",
              required: true,
            },
          ],
        },
        {
          section: "* Inviting Org in Australia Details",
          fields: [
            {
              name: "australiaCompanyName",
              type: "text",
              label: "Company Name",
              required: true,
            },
            {
              name: "australiaInvitationLetter",
              type: "text",
              label: "Invitation Letter No. / Reference",
              required: true,
            },
          ],
        },
        {
          section: "* Meeting/Exhibition Details",
          fields: [
            {
              name: "australiaBusinessMeetingDate",
              type: "text",
              label: "Meeting Date",
              required: true,
            },
          ],
        },
        {
          section: "* Applicant’s Company  Details",
          fields: [
            {
              name: "australiaApplicantCompanyName",
              type: "text",
              label: "Applicant’s Company Name",
              required: true,
            },
            {
              name: "australiaApplicantDesignation",
              type: "text",
              label: " Applicants Designation",
              required: true,
            },
          ],
        },
        {
          section: "* Passport Details",
          fields: [
            {
              name: "passportNo",
              type: "text",
              label: "Passport NO.",
              required: true,
            },
            {
              name: "placeOfIssue",
              type: "text",
              label: "Place Of Issue",
              required: true,
            },
            {
              name: "DateOfIssue",
              type: "text",
              label: "Date Of Issue",
              required: true,
            },
            {
              name: "dateOfExpire",
              type: "text",
              label: "Date of Expire",
              required: true,
            },
            {
              name: "mrzScan",
              type: "file",
              label: "MRZ Scan (Optional)",
              required: false,
            },
            {
              name: "passportScan",
              type: "file",
              label: "Passport Scan",
              required: true,
            },
          ],
        },
        {
          section: "Contact",
          fields: [
            { name: "email", type: "email", label: "Email", required: true },
            {
              name: "australiaFormPhone",
              type: "text",
              label: "Phone Number",
              required: true,
            },
          ],
        },
        {
          section: "Present Address",
          fields: [
            {
              name: "presentStreet",
              type: "text",
              label: "Street",
              required: true,
            },
            {
              name: "presentCity",
              type: "text",
              label: "City",
              required: true,
            },
            {
              name: "presentPostalCode",
              type: "text",
              label: "Postal Code",
              required: true,
            },
            {
              name: "presentCountry",
              type: "text",
              label: "Country",
              required: true,
            },
          ],
        },
        {
          section: "*Permanent Address",
          fields: [
            {
              name: "permanentStreet",
              type: "text",
              label: "Street",
              required: true,
            },
            {
              name: "permanentCity",
              type: "text",
              label: "City",
              required: true,
            },
            {
              name: "permanentPostalCode",
              type: "text",
              label: "Postal Code",
              required: true,
            },
            {
              name: "permanentCountry",
              type: "text",
              label: "Country",
              required: true,
            },
          ],
        },
        {
          section: "*Travel Info (Generic)",
          fields: [
            {
              name: "intendedTravelData",
              type: "text",
              label: "Intended Travel Date",
              required: true,
            },
            { name: "from", type: "text", label: "From", required: true },
            { name: "to", type: "text", label: "To", required: true },
            { name: "purpose", type: "text", label: "Purpose", required: true },
            {
              name: "previousTravelHistory",
              type: "text",
              label: "Previous Travel History",
              required: true,
            },
            { name: "country", type: "text", label: "Country", required: true },
            { name: "date", type: "text", label: "Date", required: true },
          ],
        },
        {
          section: "* Emergency Contact",
          fields: [
            {
              name: "emergencyName",
              type: "text",
              label: "Name",
              required: true,
            },
            {
              name: "emergencyContactRelation",
              type: "text",
              label: "Relation",
              required: true,
            },
            {
              name: "emergencyPhone",
              type: "text",
              label: "Phone",
              required: true,
            },
            {
              name: "emergencyAddress",
              type: "text",
              label: "Address",
              required: true,
            },
          ],
        },
      ],
    },
    {
      country: "malaysia",
      visaType: "scholarship",
      data: [
        {
          section: "* Applicant Info",
          fields: [
            {
              name: "fullName",
              type: "text",
              label: "Full Name",
              required: true,
            },
            {
              name: "fatherName",
              type: "text",
              label: "Father Name",
              required: true,
            },
            {
              name: "motherName",
              type: "text",
              label: "Mother Name",
              required: true,
            },
            {
              name: "dateOfBirth",
              type: "text",
              label: "Date Of Birth",
              required: true,
            },
            { name: "gender", type: "text", label: "Gender", required: true },
            {
              name: "maritalStatus",
              type: "text",
              label: "Marital Status",
              required: true,
            },
            {
              name: "nationality",
              type: "text",
              label: "Nationality",
              required: true,
            },
            {
              name: "nidOrBirthNO",
              type: "text",
              label: "NID/Birth Cert NO.",
              required: true,
            },
          ],
        },
        {
          section: "* Provider verify Info",
          fields: [
            {
              name: "malaysiaInstitutionName",
              type: "text",
              label: "Institution Name",
              required: true,
            },
            {
              name: "malaysiaEMGSApplicationNO",
              type: "text",
              label: "EMGS Application No (if available)",
              required: false,
            },
            {
              name: "malaysiaScholarshipCourseLevel",
              type: "text",
              label: "Course Level",
              required: true,
            },
            {
              name: "malaysiaScholarshipDuration",
              type: "text",
              label: "Duration",
              required: true,
            },
          ],
        },
        {
          section: "* Sponsor Details",
          fields: [
            {
              name: "malaysiaScholarshipSponsor",
              type: "text",
              label: "Have Any sponsor?",
              required: false,
            },
          ],
        },
        {
          section: "",
          fields: [
            {
              name: "malaysiaScholarshipSponsorName",
              type: "text",
              label: "Name",
              required: false,
            },
            {
              name: "MalaysiaScholarshipRelation",
              type: "text",
              label: " Relation",
              required: true,
            },
            {
              name: "MalaysiaScholarshipOccupation",
              type: "text",
              label: " Occupation",
              required: true,
            },
          ],
        },
        {
          section: "* Passport Details",
          fields: [
            {
              name: "passportNo",
              type: "text",
              label: "Passport NO.",
              required: true,
            },
            {
              name: "placeOfIssue",
              type: "text",
              label: "Place Of Issue",
              required: true,
            },
            {
              name: "DateOfIssue",
              type: "text",
              label: "Date Of Issue",
              required: true,
            },
            {
              name: "dateOfExpire",
              type: "text",
              label: "Date of Expire",
              required: true,
            },
            {
              name: "mrzScan",
              type: "file",
              label: "MRZ Scan (Optional)",
              required: false,
            },
            {
              name: "passportScan",
              type: "file",
              label: "Passport Scan",
              required: true,
            },
          ],
        },
        {
          section: "Contact",
          fields: [
            { name: "email", type: "email", label: "Email", required: true },
            {
              name: "australiaFormPhone",
              type: "text",
              label: "Phone Number",
              required: true,
            },
          ],
        },
        {
          section: "Present Address",
          fields: [
            {
              name: "presentStreet",
              type: "text",
              label: "Street",
              required: true,
            },
            {
              name: "presentCity",
              type: "text",
              label: "City",
              required: true,
            },
            {
              name: "presentPostalCode",
              type: "text",
              label: "Postal Code",
              required: true,
            },
            {
              name: "presentCountry",
              type: "text",
              label: "Country",
              required: true,
            },
          ],
        },
        {
          section: "*Permanent Address",
          fields: [
            {
              name: "permanentStreet",
              type: "text",
              label: "Street",
              required: true,
            },
            {
              name: "permanentCity",
              type: "text",
              label: "City",
              required: true,
            },
            {
              name: "permanentPostalCode",
              type: "text",
              label: "Postal Code",
              required: true,
            },
            {
              name: "permanentCountry",
              type: "text",
              label: "Country",
              required: true,
            },
          ],
        },
        {
          section: "*Travel Info (Generic)",
          fields: [
            {
              name: "intendedTravelData",
              type: "text",
              label: "Intended Travel Date",
              required: true,
            },
            { name: "from", type: "text", label: "From", required: true },
            { name: "to", type: "text", label: "To", required: true },
            { name: "purpose", type: "text", label: "Purpose", required: true },
            {
              name: "previousTravelHistory",
              type: "text",
              label: "Previous Travel History",
              required: true,
            },
            { name: "country", type: "text", label: "Country", required: true },
            { name: "date", type: "text", label: "Date", required: true },
          ],
        },
        {
          section: "* Emergency Contact",
          fields: [
            {
              name: "emergencyName",
              type: "text",
              label: "Name",
              required: true,
            },
            {
              name: "emergencyContactRelation",
              type: "text",
              label: "Relation",
              required: true,
            },
            {
              name: "emergencyPhone",
              type: "text",
              label: "Phone",
              required: true,
            },
            {
              name: "emergencyAddress",
              type: "text",
              label: "Address",
              required: true,
            },
          ],
        },
      ],
    },
    {
      country: "malaysia",
      visaType: "tourist",
      data: [
        {
          section: "* Applicant Info",
          fields: [
            {
              name: "fullName",
              type: "text",
              label: "Full Name",
              required: true,
            },
            {
              name: "fatherName",
              type: "text",
              label: "Father Name",
              required: true,
            },
            {
              name: "motherName",
              type: "text",
              label: "Mother Name",
              required: true,
            },
            {
              name: "dateOfBirth",
              type: "text",
              label: "Date Of Birth",
              required: true,
            },
            { name: "gender", type: "text", label: "Gender", required: true },
            {
              name: "maritalStatus",
              type: "text",
              label: "Marital Status",
              required: true,
            },
            {
              name: "nationality",
              type: "text",
              label: "Nationality",
              required: true,
            },
            {
              name: "nidOrBirthNO",
              type: "text",
              label: "NID/Birth Cert NO.",
              required: true,
            },
          ],
        },
        {
          section: "* Applicant Field Info",
          fields: [
            {
              name: "malaysiaTouristItinerary",
              type: "text",
              label: "Travel Itinerary",
              required: true,
            },
            {
              name: "malaysiaTouristCity",
              type: "text",
              label: "City",
              required: false,
            },
            {
              name: "malaysiaTouristData",
              type: "text",
              label: "Date",
              required: true,
            },
            {
              name: "malaysiaTouristHotelList",
              type: "text",
              label: "Hotel List",
              required: true,
            },
          ],
        },
        {
          section: "* Employment Status",
          fields: [
            {
              name: "malaysiaTouristStatus",
              type: "text",
              label: "Status",
              required: false,
            },
            {
              name: "malaysiaTouristReturnTicketPNR",
              type: "text",
              label: "Return Ticket PNR",
              required: false,
            },
          ],
        },
        {
          section: "* Passport Details",
          fields: [
            {
              name: "passportNo",
              type: "text",
              label: "Passport NO.",
              required: true,
            },
            {
              name: "placeOfIssue",
              type: "text",
              label: "Place Of Issue",
              required: true,
            },
            {
              name: "DateOfIssue",
              type: "text",
              label: "Date Of Issue",
              required: true,
            },
            {
              name: "dateOfExpire",
              type: "text",
              label: "Date of Expire",
              required: true,
            },
            {
              name: "mrzScan",
              type: "file",
              label: "MRZ Scan (Optional)",
              required: false,
            },
            {
              name: "passportScan",
              type: "file",
              label: "Passport Scan",
              required: true,
            },
          ],
        },
        {
          section: "Contact",
          fields: [
            { name: "email", type: "email", label: "Email", required: true },
            {
              name: "australiaFormPhone",
              type: "text",
              label: "Phone Number",
              required: true,
            },
          ],
        },
        {
          section: "Present Address",
          fields: [
            {
              name: "presentStreet",
              type: "text",
              label: "Street",
              required: true,
            },
            {
              name: "presentCity",
              type: "text",
              label: "City",
              required: true,
            },
            {
              name: "presentPostalCode",
              type: "text",
              label: "Postal Code",
              required: true,
            },
            {
              name: "presentCountry",
              type: "text",
              label: "Country",
              required: true,
            },
          ],
        },
        {
          section: "*Permanent Address",
          fields: [
            {
              name: "permanentStreet",
              type: "text",
              label: "Street",
              required: true,
            },
            {
              name: "permanentCity",
              type: "text",
              label: "City",
              required: true,
            },
            {
              name: "permanentPostalCode",
              type: "text",
              label: "Postal Code",
              required: true,
            },
            {
              name: "permanentCountry",
              type: "text",
              label: "Country",
              required: true,
            },
          ],
        },
        {
          section: "*Travel Info (Generic)",
          fields: [
            {
              name: "intendedTravelData",
              type: "text",
              label: "Intended Travel Date",
              required: true,
            },
            { name: "from", type: "text", label: "From", required: true },
            { name: "to", type: "text", label: "To", required: true },
            { name: "purpose", type: "text", label: "Purpose", required: true },
            {
              name: "previousTravelHistory",
              type: "text",
              label: "Previous Travel History",
              required: true,
            },
            { name: "country", type: "text", label: "Country", required: true },
            { name: "date", type: "text", label: "Date", required: true },
          ],
        },
        {
          section: "* Emergency Contact",
          fields: [
            {
              name: "emergencyName",
              type: "text",
              label: "Name",
              required: true,
            },
            {
              name: "emergencyContactRelation",
              type: "text",
              label: "Relation",
              required: true,
            },
            {
              name: "emergencyPhone",
              type: "text",
              label: "Phone",
              required: true,
            },
            {
              name: "emergencyAddress",
              type: "text",
              label: "Address",
              required: true,
            },
          ],
        },
      ],
    },
    {
      country: "malaysia",
      visaType: "medical",
      data: [
        {
          section: "* Applicant Info",
          fields: [
            {
              name: "fullName",
              type: "text",
              label: "Full Name",
              required: true,
            },
            {
              name: "fatherName",
              type: "text",
              label: "Father Name",
              required: true,
            },
            {
              name: "motherName",
              type: "text",
              label: "Mother Name",
              required: true,
            },
            {
              name: "dateOfBirth",
              type: "text",
              label: "Date Of Birth",
              required: true,
            },
            { name: "gender", type: "text", label: "Gender", required: true },
            {
              name: "maritalStatus",
              type: "text",
              label: "Marital Status",
              required: true,
            },
            {
              name: "nationality",
              type: "text",
              label: "Nationality",
              required: true,
            },
            {
              name: "nidOrBirthNO",
              type: "text",
              label: "NID/Birth Cert NO.",
              required: true,
            },
          ],
        },
        {
          section: "* Medical info Info",
          fields: [
            {
              name: "malaysiaMedicalTreatment",
              type: "text",
              label: "Treatment Hospital/Clinic Name",
              required: true,
            },
            {
              name: "malaysiaTreatingDoctor",
              type: "text",
              label: "Treating Doctor Name",
              required: false,
            },
            {
              name: "malaysiaTreatingDepartment",
              type: "text",
              label: "Treating Doctor Department",
              required: true,
            },
          ],
        },
        {
          section: "* Appointment details",
          fields: [
            {
              name: "malaysiaMedicalAppointmentDate",
              type: "text",
              label: "Appointment/Admission Date",
              required: true,
            },
            {
              name: "malaysiaMedicalAppointmentSerial",
              type: "text",
              label: "Appointment Serial no.",
              required: false,
            },
          ],
        },
        {
          section: "* Attendant",
          fields: [
            {
              name: "malaysiaAttendant",
              type: "text",
              label: "Attendant(s) traveling?",
              required: true,
            },
            {
              name: "malaysiaAttendantName",
              type: "text",
              label: " Attendant name",
              required: true,
            },
            {
              name: "malaysiaMedicalRelation",
              type: "text",
              label: "Relation",
              required: true,
            },
          ],
        },
        {
          section: "* Passport Details",
          fields: [
            {
              name: "passportNo",
              type: "text",
              label: "Passport NO.",
              required: true,
            },
            {
              name: "placeOfIssue",
              type: "text",
              label: "Place Of Issue",
              required: true,
            },
            {
              name: "DateOfIssue",
              type: "text",
              label: "Date Of Issue",
              required: true,
            },
            {
              name: "dateOfExpire",
              type: "text",
              label: "Date of Expire",
              required: true,
            },
            {
              name: "mrzScan",
              type: "file",
              label: "MRZ Scan (Optional)",
              required: false,
            },
            {
              name: "passportScan",
              type: "file",
              label: "Passport Scan",
              required: true,
            },
          ],
        },
        {
          section: "Contact",
          fields: [
            { name: "email", type: "email", label: "Email", required: true },
            {
              name: "australiaFormPhone",
              type: "text",
              label: "Phone Number",
              required: true,
            },
          ],
        },
        {
          section: "Present Address",
          fields: [
            {
              name: "presentStreet",
              type: "text",
              label: "Street",
              required: true,
            },
            {
              name: "presentCity",
              type: "text",
              label: "City",
              required: true,
            },
            {
              name: "presentPostalCode",
              type: "text",
              label: "Postal Code",
              required: true,
            },
            {
              name: "presentCountry",
              type: "text",
              label: "Country",
              required: true,
            },
          ],
        },
        {
          section: "*Permanent Address",
          fields: [
            {
              name: "permanentStreet",
              type: "text",
              label: "Street",
              required: true,
            },
            {
              name: "permanentCity",
              type: "text",
              label: "City",
              required: true,
            },
            {
              name: "permanentPostalCode",
              type: "text",
              label: "Postal Code",
              required: true,
            },
            {
              name: "permanentCountry",
              type: "text",
              label: "Country",
              required: true,
            },
          ],
        },
        {
          section: "*Travel Info (Generic)",
          fields: [
            {
              name: "intendedTravelData",
              type: "text",
              label: "Intended Travel Date",
              required: true,
            },
            { name: "from", type: "text", label: "From", required: true },
            { name: "to", type: "text", label: "To", required: true },
            { name: "purpose", type: "text", label: "Purpose", required: true },
            {
              name: "previousTravelHistory",
              type: "text",
              label: "Previous Travel History",
              required: true,
            },
            { name: "country", type: "text", label: "Country", required: true },
            { name: "date", type: "text", label: "Date", required: true },
          ],
        },
        {
          section: "* Emergency Contact",
          fields: [
            {
              name: "emergencyName",
              type: "text",
              label: "Name",
              required: true,
            },
            {
              name: "emergencyContactRelation",
              type: "text",
              label: "Relation",
              required: true,
            },
            {
              name: "emergencyPhone",
              type: "text",
              label: "Phone",
              required: true,
            },
            {
              name: "emergencyAddress",
              type: "text",
              label: "Address",
              required: true,
            },
          ],
        },
      ],
    },
    {
      country: "malaysia",
      visaType: "business",
      data: [
        {
          section: "* Applicant Info",
          fields: [
            {
              name: "fullName",
              type: "text",
              label: "Full Name",
              required: true,
            },
            {
              name: "fatherName",
              type: "text",
              label: "Father Name",
              required: true,
            },
            {
              name: "motherName",
              type: "text",
              label: "Mother Name",
              required: true,
            },
            {
              name: "dateOfBirth",
              type: "text",
              label: "Date Of Birth",
              required: true,
            },
            { name: "gender", type: "text", label: "Gender", required: true },
            {
              name: "maritalStatus",
              type: "text",
              label: "Marital Status",
              required: true,
            },
            {
              name: "nationality",
              type: "text",
              label: "Nationality",
              required: true,
            },
            {
              name: "nidOrBirthNO",
              type: "text",
              label: "NID/Birth Cert NO.",
              required: true,
            },
          ],
        },
        {
          section: "* Inviting Company in Malaysia Details",
          fields: [
            {
              name: "malaysiaCompanyName",
              type: "text",
              label: "Company Name",
              required: true,
            },
            {
              name: "malaysiaInvitationLetter",
              type: "text",
              label: "Invitation Letter No. / Reference",
              required: false,
            },
          ],
        },
        {
          section: "* Meeting/Exhibition Details",
          fields: [
            {
              name: "malaysiaBusinessMeetingDate",
              type: "text",
              label: "Meeting Date",
              required: true,
            },
          ],
        },
        {
          section: "* Applicant’s Company  Details",
          fields: [
            {
              name: "malaysiaBusinessApplicantCompanyName",
              type: "text",
              label: "Applicant’s Company Name",
              required: true,
            },
            {
              name: "malaysiaBusinessApplicantsDesignation",
              type: "text",
              label: "Applicants Designation",
              required: true,
            },
          ],
        },
        {
          section: "* Passport Details",
          fields: [
            {
              name: "passportNo",
              type: "text",
              label: "Passport NO.",
              required: true,
            },
            {
              name: "placeOfIssue",
              type: "text",
              label: "Place Of Issue",
              required: true,
            },
            {
              name: "DateOfIssue",
              type: "text",
              label: "Date Of Issue",
              required: true,
            },
            {
              name: "dateOfExpire",
              type: "text",
              label: "Date of Expire",
              required: true,
            },
            {
              name: "mrzScan",
              type: "file",
              label: "MRZ Scan (Optional)",
              required: false,
            },
            {
              name: "passportScan",
              type: "file",
              label: "Passport Scan",
              required: true,
            },
          ],
        },
        {
          section: "Contact",
          fields: [
            { name: "email", type: "email", label: "Email", required: true },
            {
              name: "australiaFormPhone",
              type: "text",
              label: "Phone Number",
              required: true,
            },
          ],
        },
        {
          section: "Present Address",
          fields: [
            {
              name: "presentStreet",
              type: "text",
              label: "Street",
              required: true,
            },
            {
              name: "presentCity",
              type: "text",
              label: "City",
              required: true,
            },
            {
              name: "presentPostalCode",
              type: "text",
              label: "Postal Code",
              required: true,
            },
            {
              name: "presentCountry",
              type: "text",
              label: "Country",
              required: true,
            },
          ],
        },
        {
          section: "*Permanent Address",
          fields: [
            {
              name: "permanentStreet",
              type: "text",
              label: "Street",
              required: true,
            },
            {
              name: "permanentCity",
              type: "text",
              label: "City",
              required: true,
            },
            {
              name: "permanentPostalCode",
              type: "text",
              label: "Postal Code",
              required: true,
            },
            {
              name: "permanentCountry",
              type: "text",
              label: "Country",
              required: true,
            },
          ],
        },
        {
          section: "*Travel Info (Generic)",
          fields: [
            {
              name: "intendedTravelData",
              type: "text",
              label: "Intended Travel Date",
              required: true,
            },
            { name: "from", type: "text", label: "From", required: true },
            { name: "to", type: "text", label: "To", required: true },
            { name: "purpose", type: "text", label: "Purpose", required: true },
            {
              name: "previousTravelHistory",
              type: "text",
              label: "Previous Travel History",
              required: true,
            },
            { name: "country", type: "text", label: "Country", required: true },
            { name: "date", type: "text", label: "Date", required: true },
          ],
        },
        {
          section: "* Emergency Contact",
          fields: [
            {
              name: "emergencyName",
              type: "text",
              label: "Name",
              required: true,
            },
            {
              name: "emergencyContactRelation",
              type: "text",
              label: "Relation",
              required: true,
            },
            {
              name: "emergencyPhone",
              type: "text",
              label: "Phone",
              required: true,
            },
            {
              name: "emergencyAddress",
              type: "text",
              label: "Address",
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
