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
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller } from "react-hook-form";
import { useState } from "react";
import { X } from "lucide-react";

export function PackageDetailsSection({ form }: any) {
  const { register, control, setValue, getValues } = form;
  const [programs, setPrograms] = useState<string[]>([]);

  const handleAddProgram = () => {
    const program = getValues("programInput");

    if (!program) return;
    if (programs.includes(program)) return; 

    const updated = [...programs, program];

    setPrograms(updated);
    setValue("programs", updated);
    setValue("programInput", "");
  };

  const removeProgram = (index: number) => {
    const updated = programs.filter((_, i) => i !== index);

    setPrograms(updated);
    setValue("programs", updated);
  };


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
            <Input
              placeholder="Enter starting date"
              type="text"
              {...register("startingDate", { required: true })}
            />
          </div>

          {/* Deadline */}
          <div className="space-y-2">
            <Label>Application Deadline *</Label>
            <Input type="date" {...register("deadline", { required: true })} />
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <Label>Duration *</Label>
            <Input
              placeholder="e.g., 4 years, 2 semesters"
              {...register("duration", { required: true })}
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

          <div className="space-y-3 md:col-span-2">
            <Label>Program *</Label>

            <div className="flex items-center gap-2">
              <Input
                type="text"
                placeholder="Add program"
                {...register("programInput")}
              />
              <input type="hidden" {...register("programs")} />
            </div>

            <div
              onClick={handleAddProgram}
              className="text-start text-red-400 cursor-pointer hover:underline"
            >
              Add new
            </div>

            {/* ✅ Show Programs */}
            <div className="flex flex-wrap gap-2">
              {programs.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 px-3 py-1 bg-gray-200 rounded-full text-sm"
                >
                  {item}
                  <X
                    size={14}
                    className="cursor-pointer"
                    onClick={() => removeProgram(index)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Application Fee */}
          <div className="space-y-2 md:col-span-2">
            <Label>Application Fee *</Label>
            <div className="flex items-center gap-2">
              <span>
                <FaBangladeshiTakaSign />
              </span>
              <Input
                type="text"
                inputMode="decimal"
                placeholder="0.00"
                {...register("applicationFee", { required: true })}
              />
            </div>
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Service Fee *</Label>
            <div className="flex items-center gap-2">
              <span>
                <FaBangladeshiTakaSign />
              </span>
              <Input
                type="text"
                inputMode="decimal"
                placeholder="0.00"
                {...register("serviceFee", { required: true })}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
