import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

interface OfferSidebarProps {
  packageSidebarInfo: {
    id: string;
    _id: string;
    packagePrice: string;
    courseName: string;
    createdAt: string;
    deadlineDate: string;
    idCard: string;
    selectDuration: string;
    selectLanguage: string;
    selectStudyLevel: string;
    selectUniversitiesProgram: string;
    sl_No: string;
    startingDate: string;
    tuitionFree: string;
  };
  source: string | undefined;
}

export function OfferSidebar({ packageSidebarInfo, source }: OfferSidebarProps) {
  const {
    id,
    _id,
    packagePrice,
    courseName,
    createdAt,
    deadlineDate,
    idCard,
    selectDuration,
    selectLanguage,
    selectStudyLevel,
    selectUniversitiesProgram,
    sl_No,
    startingDate,
    tuitionFree,
  } = packageSidebarInfo;

  const createdBy = "admin";
  const userRole = "admin";

  return (
    <Card className="sticky top-8 bg-muted/50">
      <CardContent className="p-6 space-y-4">
        <h3 className="text-lg font-semibold">Basic Information</h3>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Starting Date:</span>
            <span className="font-medium">{startingDate}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Duration:</span>
            <span className="font-medium">{selectDuration}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Program:</span>
            <span className="font-medium">{selectUniversitiesProgram}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Teaching Language:</span>
            <span className="font-medium">{selectLanguage}</span>
          </div>
          <div className="flex justify-between text-sm border-t border-border pt-3">
            <span className="text-muted-foreground">Application Deadline:</span>
            <span className="font-medium">{deadlineDate}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tuition:</span>
            <span className="font-medium">{tuitionFree}/Year</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Application Fee:</span>
            <span className="font-medium">{packagePrice}</span>
          </div>
          <div className="flex justify-between text-sm border-b border-border pb-3">
            <span className="text-muted-foreground">Service Fee:</span>
            <span className="font-medium">upcomming...</span>
          </div>

          {/* this div for adming pannal */}
          {userRole === "admin" ? (
            <div className="border-b border-border pb-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created At:</span>
                <span className="font-medium">
                  {new Date(createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created by:</span>
                <span className="font-medium">{createdBy}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Package Id:</span>
                <span className="font-medium">{_id}</span>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <Link
          href={`/student-home-page/student-package-offer/user_application_form/${id}?source=${source}`}
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
