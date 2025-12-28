import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function HFAQ() {
  return (
    <Accordion
      type="single"
      collapsible
      className="max-w-7xl mx-auto text-center my-6 p-6"
    >
      <h1 className="font-bold text-4xl my-8">
        FA<span className="text-red-500">Q’s</span>
      </h1>
      <AccordionItem value="item-1" className="bg-[#efd2d2] p-4 rounded-2xl">
        <AccordionTrigger>
          What types of visa support does GM International provide?
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance bg-white p-4 rounded-xl text-start">
          <p>
            We provide comprehensive visa support for various categories,
            including:
            <br /> <br />
            <strong>Student Visa</strong> – Full assistance with university
            applications and visa processing <br />
            <strong>Medical Visa</strong> – Including arranging doctor
            appointments and official medical invitation letters <br />
            <strong>Business Visa</strong> – For professional visits, meetings,
            or conferences abroad <br />
            <strong>Tourist Visa</strong> – Visa application assistance along
            with optional travel packages
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem
        value="item-2"
        className="bg-[#efd2d2] p-4 rounded-2xl my-6"
      >
        <AccordionTrigger>
          What documents are required to apply to a university abroad?
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance bg-white p-4 rounded-xl text-start">
          <p>
            To apply for admission to a foreign university, you generally need:
            <br /> <br />
            <span>
              <strong>
                Academic Certificates & Transcripts (SSC, HSC or equivalent)
              </strong>{" "}
              <br />
              <strong>Valid Passport</strong> <br />
              <strong>
                English Proficiency Test Score (e.g., IELTS/TOEFL, if required){" "}
              </strong>
              <br />
              <strong>
                Statement of Purpose (SOP) <br /> Curriculum Vitae (CV)
              </strong>
              <br />
              <strong>Passport-sized Photographs</strong> <br />
              <strong>
                Letter(s) of Recommendation (if required by the university)
              </strong>{" "}
            </span>
            <br /> <br />
            We assist you throughout the entire process – from document
            preparation to application submission.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3" className="bg-[#efd2d2] p-4 rounded-2xl mb-8">
        <AccordionTrigger>
          What is included in your tourist packages?
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance bg-white p-4 rounded-xl text-start">
          <p>
            Our tourist packages are customizable based on your destination and
            budget. Packages typically include: <br /> <br />
            <strong>Tourist Visa processing support</strong> <br />
            <strong>Hotel bookings</strong> <br />
            <strong>Flight ticket bookings</strong> <br />
            <strong>Daily travel itinerary planning</strong>
            <br />
            <strong>Airport pick-up & drop-off</strong>
            <br />
            <strong>Sightseeing and local travel arrangements</strong> <br />
            Special requests can be accommodated upon consultation
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4" className="bg-[#efd2d2] p-4 rounded-2xl mb-8">
        <AccordionTrigger>
          What support do you offer for Medical Visa processing?
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance bg-white p-4 rounded-xl text-start">
          <p>
            We provide full support for Medical Visas, including: <br /> <br />
            <strong>
              Appointment arrangements with hospitals or clinics abroad
            </strong>{" "}
            <br />
            <strong>
              Obtaining official invitation or appointment letters from the
              hospital
            </strong>{" "}
            <br />
            <strong>
              Assistance with visa application and document preparation
            </strong>{" "}
            <br />
            <strong>Travel support including flights and accommodation</strong>
            <br />
            We currently assist with medical travel to China
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-5" className="bg-[#efd2d2] p-4 rounded-2xl">
        <AccordionTrigger>
          What is the process for applying for a Business Visa, and how can you
          help?
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance bg-white p-4 rounded-xl text-start">
          <p>
            For a Business Visa, the following documents are usually required:{" "}
            <br /> <br />
            <strong>Valid Passport</strong> <br />
            <strong>Trade License or relevant business documents</strong> <br />
            <strong>
              Passport-sized Photo and other required embassy forms
            </strong>{" "}
            <br /> <br />
            We help with: <br />
            <strong>Document preparation</strong>
            <br />
            <strong>Visa application guidance</strong>
            <br />
            <strong>
              Support in obtaining an invitation letter (if needed)
            </strong>
            <br />
            <strong>Flight booking and business travel advice</strong>
            <br />
            <br />
            We currently assist with medical travel to China
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
