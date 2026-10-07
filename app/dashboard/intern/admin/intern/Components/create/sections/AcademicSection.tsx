"use client";

import { Control } from "react-hook-form";
import { GraduationCap } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { InternProfileFormValues } from "../../types/validations/intern";

export default function AcademicSection({
  control,
}: {
  control: Control<InternProfileFormValues>;
}) {
  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <GraduationCap className="h-4 w-4 text-primary" />
          Academic Details
        </CardTitle>
        <CardDescription>Education background of the intern.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <FormField
          control={control}
          name="university"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>University / Institution</FormLabel>
              <FormControl>
                <Input placeholder="e.g. University of Dhaka" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField
            control={control}
            name="degree"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Degree</FormLabel>
                <FormControl>
                  <Input placeholder="B.Sc. in CSE" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="major"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Major</FormLabel>
                <FormControl>
                  <Input placeholder="Computer Science" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField
            control={control}
            name="graduationYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Graduation Year</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="2025"
                    {...field}
                    value={field.value == null ? "" : String(field.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="cgpa"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>CGPA</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="3.75"
                    {...field}
                    value={field.value == null ? "" : String(field.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
