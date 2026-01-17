// "use client";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// interface PackageDetailsSectionProps {
//   data: {
//     startingDate: string;
//     deadline: string;
//     duration: string;
//     language: string;
//     serviceFee: string
//     applicationFee: string;
//   };
//   onChange: (field: string, value: string) => void;
// }

// export function PackageDetailsSection({
//   data,
//   onChange,
// }: PackageDetailsSectionProps) {
//   return (
//     <Card className="border border-border">
//       <CardHeader className="border-b border-border">
//         <CardTitle className="text-xl text-[#CA2328]">
//           Package Details
//         </CardTitle>
//         <CardDescription>
//           Configure the package timing, language, and fees
//         </CardDescription>
//       </CardHeader>
//       <CardContent className="pt-6 space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="space-y-2">
//             <Label
//               htmlFor="startingDate"
//               className="text-foreground font-semibold"
//             >
//               Starting Date <span className="text-primary">*</span>
//             </Label>
//             <Input
//               id="startingDate"
//               type="date"
//               value={data.startingDate}
//               onChange={(e) => onChange("startingDate", e.target.value)}
//               className="border-border focus:ring-primary"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="deadline" className="text-foreground font-semibold">
//               Application Deadline <span className="text-primary">*</span>
//             </Label>
//             <Input
//               id="deadline"
//               type="date"
//               value={data.deadline}
//               onChange={(e) => onChange("deadline", e.target.value)}
//               className="border-border focus:ring-primary"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="duration" className="text-foreground font-semibold">
//               Duration <span className="text-primary">*</span>
//             </Label>
//             <Input
//               id="duration"
//               placeholder="e.g., 4 years, 2 semesters"
//               value={data.duration}
//               onChange={(e) => onChange("duration", e.target.value)}
//               className="border-border focus:ring-primary"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="language" className="text-foreground font-semibold">
//               Language of Instruction <span className="text-primary">*</span>
//             </Label>
//             <Select
//               value={data.language}
//               onValueChange={(value) => onChange("language", value)}
//             >
//               <SelectTrigger className="border-border focus:ring-primary">
//                 <SelectValue placeholder="Select language" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="english">English</SelectItem>
//                 <SelectItem value="china">China</SelectItem>
//                 <SelectItem value="malaya">Malaya</SelectItem>
//                 <SelectItem value="bengali">Bengali</SelectItem>
//                 <SelectItem value="spanish">Spanish</SelectItem>
//                 <SelectItem value="french">French</SelectItem>
//                 <SelectItem value="german">German</SelectItem>
//                 <SelectItem value="mandarin">Mandarin</SelectItem>
//                 <SelectItem value="other">Other</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="space-y-2 md:col-span-2">
//             <Label
//               htmlFor="applicationFee"
//               className="text-foreground font-semibold"
//             >
//               Application Fee (Non-Refundable){" "}
//               <span className="text-primary">*</span>
//             </Label>
//             <div className="flex items-center gap-2">
//               <span className="text-foreground font-medium">$</span>
//               <Input
//                 id="applicationFee"
//                 type="number"
//                 placeholder="0.00"
//                 value={data.applicationFee}
//                 onChange={(e) => onChange("applicationFee", e.target.value)}
//                 className="border-border focus:ring-primary flex-1"
//               />
//             </div>
//             <p className="text-xs text-muted-foreground">Non-refundable fee</p>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }


"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller } from "react-hook-form";

export function PackageDetailsSection({ form }: any) {
  const { register, control } = form;

  return (
    <Card className="border border-border">
      <CardHeader className="border-b border-border">
        <CardTitle className="text-xl text-[#CA2328]">
          Package Details
        </CardTitle>
        <CardDescription>
          Configure the package timing, language, and fees
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Starting Date */}
          <div className="space-y-2">
            <Label>Starting Date *</Label>
            <Input type="date" {...register("startingDate",{required: true})} />
          </div>

          {/* Deadline */}
          <div className="space-y-2">
            <Label>Application Deadline *</Label>
            <Input type="date" {...register("deadline",{required: true})} />
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <Label>Duration *</Label>
            <Input
              placeholder="e.g., 4 years, 2 semesters"
              {...register("duration",{required: true})}
            />
          </div>

          {/* Language */}
          <div className="space-y-2">
            <Label>Language of Instruction *</Label>

            <Controller
              name="language"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="china">China</SelectItem>
                    <SelectItem value="malaya">Malaya</SelectItem>
                    <SelectItem value="bengali">Bengali</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                    <SelectItem value="german">German</SelectItem>
                    <SelectItem value="mandarin">Mandarin</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/* Application Fee */}
          <div className="space-y-2 md:col-span-2">
            <Label>Application Fee *</Label>
            <div className="flex items-center gap-2">
              <span>$</span>
              <Input
                type="text"
                inputMode="decimal"
                placeholder="0.00"
                {...register("applicationFee",{required: true})}
              />
            </div>
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Service Fee *</Label>
            <div className="flex items-center gap-2">
              <span>$</span>
              <Input
                type="text"
                inputMode="decimal"
                placeholder="0.00"
                {...register("serviceFee",{required: true})}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

