import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ScholarshipCardProps } from "../../components/OfferCard";

interface OfferSidebarProps {
  packageSidebarInfo: ScholarshipCardProps;
  source: string | undefined;
}

export function OfferSidebar({ packageSidebarInfo, source }: OfferSidebarProps) {

  const {
    _id,
    city,
    country,
    deadline,
    language,
    duration,
    startingDate,
    applicationFee,
    serviceFee,
    universityName,
  } = packageSidebarInfo;


  return (
    <Card className="sticky top-8 bg-muted/50">
      <CardContent className="p-6 space-y-4">
        <h3 className="text-lg font-semibold">Basic Information</h3>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">University:</span>
            <span className="font-medium">{universityName}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Country:</span>
            <span className="font-medium">{country}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">city:</span>
            <span className="font-medium">{city}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Starting Date:</span>
            <span className="font-medium">{startingDate}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Duration:</span>
            <span className="font-medium">{duration}</span>
          </div>
         
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Teaching Language:</span>
            <span className="font-medium">{language}</span>
          </div>
          <div className="flex justify-between text-sm border-t border-border pt-3">
            <span className="text-muted-foreground">Application Deadline:</span>
            <span className="font-medium">{deadline}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              Application Fee(Non Refundable):
            </span>
            <span className="font-medium">{applicationFee}</span>
          </div>
          
          <div className="flex justify-between text-sm border-b border-border pb-3">
            <span className="text-muted-foreground">Service Fee:</span>
            <span className="font-medium">{serviceFee}</span>
          </div>

      
        </div>
        <Link
          href={`/student-home-page/student-package-offer/user_application_form/${_id}?source=${source}`}
          className="hover:cursor-pointer"
        >
          <Button className="w-full bg-destructive hover:bg-destructive/90 text-primary-foreground font-semibold h-11 hover:cursor-pointer">
            Apply Now
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
