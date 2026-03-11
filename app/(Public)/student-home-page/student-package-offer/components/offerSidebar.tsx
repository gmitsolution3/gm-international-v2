import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ScholarshipCardProps } from "../../components/OfferCard";
import { getServerSession } from "next-auth";
import { authConfig } from "@/auth.config";

interface OfferSidebarProps {
  packageSidebarInfo: ScholarshipCardProps;
  source?: { form: string | undefined; b2bId: string | undefined };
}

export async function OfferSidebar({
  packageSidebarInfo,
  source,
}: OfferSidebarProps) {
  const session: any = await getServerSession(authConfig);

  console.log({ source });

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
          {session?.user?.userRole === "b2b" && (
            <div className="flex justify-between text-sm border-b border-border pb-3">
              <span className="text-muted-foreground">Service Fee:</span>
              <span className="font-medium">{serviceFee}</span>
            </div>
          )}
        </div>
        {source?.form && source.b2bId ? (
          <div>
            <Link
              href={`/student-home-page/student-package-offer/user_application_form/${_id}?b2bId=${source.b2bId}&form=${source.form}`}
              className="hover:cursor-pointer"
            >
              <Button className="w-full bg-destructive hover:bg-destructive/90 text-primary-foreground font-semibold h-11 hover:cursor-pointer">
                Apply Now
              </Button>
            </Link>
            <Link
              href={`/student-home-page/universities/${_id}?b2bId=${source.b2bId}&form=${source.form}`}
              className="hover:cursor-pointer"
            >
              <button className="w-full hover:bg-destructive/90 border-2 hover:text-white rounded-lg font-semibold h-11 hover:cursor-pointer mt-5">
                View University Details
              </button>
            </Link>
          </div>
        ) : (
          <div>
            <Link
              href={`/student-home-page/student-package-offer/user_application_form/${_id}`}
              className="hover:cursor-pointer"
            >
              <Button className="w-full bg-destructive hover:bg-destructive/90 text-primary-foreground font-semibold h-11 hover:cursor-pointer">
                Apply Now
              </Button>
            </Link>
            <Link
              href={`/student-home-page/universities/${_id}`}
              className="hover:cursor-pointer"
            >
              <button className="w-full hover:bg-destructive/90 border-2 hover:text-white rounded-lg font-semibold h-11 hover:cursor-pointer mt-5">
                View University Details
              </button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
