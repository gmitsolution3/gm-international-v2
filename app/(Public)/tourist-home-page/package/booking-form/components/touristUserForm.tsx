"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Upload, Minus, Plus, ChevronDown, CreditCard } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import { handleFileUpload } from "@/app/components/uploadPdf/uploadToCloudinary";
import { useRouter } from "next/navigation";

// ─── Updated Interface matching new schema ───────────────────────────────────
export interface ITouristPackage {
  _id: string;
  p_title: string;
  p_price: string;
  number_of_member: number;
  duration: string;
  is_with_air_ticket: boolean;
  start_form: string;
  includes: string[];
  excludes: string[];
  country: string[]; // Array of countries
  thumbnail: string;
  gallery: string[];
  tour_plan: Array<{
    destination: string;
    sub_destination: string[];
  }>;
  createdBy: string;
  isB2B: boolean;
  b2b_price: number;
  isInternationalPackage: boolean;
  international_package_price: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  passportVisaImage?: string;
}

interface PackageProps {
  touristPackage: ITouristPackage;
  source?: { b2bId: string; form: string };
}

// ─── Zod Schema ──────────────────────────────────────────────────────────────
const formSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  phoneNumber: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Invalid email address"),
  passportNumber: z.string().min(5, "Passport number is required"),
  visaStatus: z.enum(["already-have", "need-support"]),
  gender: z.string().nonempty("Please select a gender"),
  guests: z.object({
    adults: z.number().min(1),
    children: z.number().min(0),
    infants: z.number().min(0),
  }),
  airTicket: z.string().optional(),
  selectedSubDestination: z.string().optional(),
  foodPlan: z.array(z.string()).min(1, "Select at least one food option"),
  transportation: z.array(z.string()).min(1, "Select transportation"),
  hotelCategory: z.array(z.string()).optional(),
  paymentMethod: z.string().nonempty("Select a payment method"),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvc: z.string().optional(),
  createdAt: z.date().default(new Date()),
  createdBy: z.string().optional(),
  passportVisaImage: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

// ─── Main Component ───────────────────────────────────────────────────────────
export function TouristUserForm({ touristPackage, source }: PackageProps) {
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);
  const router = useRouter()

  // Derived values from new schema
  const packagePrice =
    touristPackage.international_package_price || touristPackage.p_price;
  const packageCountry = touristPackage.country?.[0] ?? "";
  const tourPlan = touristPackage.tour_plan?.[0];
  const destination = tourPlan?.destination ?? "";
  // Filter out empty strings from sub_destination
  const subDestinations = (tourPlan?.sub_destination ?? []).filter(
    (s) => s.trim() !== "",
  );

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setUploading(true);

      // cloudinary upload function
      const imageUrl = await handleFileUpload(file);

      // set into react-hook-form
      setValue("passportVisaImage", imageUrl, {
        shouldValidate: true,
      });

      Swal.fire({
        title: "File uploaded successfully",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        title: "Upload failed",
        icon: "error",
        timer: 1500,
        showConfirmButton: false,
      });
    } finally {
      setUploading(false);
    }
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      guests: { adults: 1, children: 0, infants: 0 },
      foodPlan: [],
      transportation: [],
      hotelCategory: [],
      visaStatus: "already-have",
      passportVisaImage: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = form;

  const guests = watch("guests");
  const foodPlan = watch("foodPlan") || [];
  const transportation = watch("transportation") || [];
  const hotelCategory = watch("hotelCategory") || [];
  const paymentMethod = watch("paymentMethod");
  const visaStatus = watch("visaStatus");
  const selectedSubDestination = watch("selectedSubDestination");

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);

    data.createdBy = session?.user?.email ?? undefined;

    const payload = {
      ...data,
      // Package Info
      packageInfo: {
        title: touristPackage.p_title,
        thumbnail: touristPackage.thumbnail,
        packageName: touristPackage.p_title,
      },
      // Location
      location: {
        country: packageCountry,
        destinationPlace: destination,
        subDestination: selectedSubDestination || "",
      },
      durationAndDates: {
        // Duration & Dates
        duration: touristPackage.duration,
        dateFrom: touristPackage.createdAt,
        startForm: touristPackage.start_form,
      },
      // Pricing
      totalCost: packagePrice,
      isInternationalPackage: touristPackage.isInternationalPackage,
      // Includes/Excludes
      includesAndExcludes: {
        includes: touristPackage.includes,
        excludes: touristPackage.excludes,
      },
      // Source
      client: source,
    };

    if (!payload.client?.b2bId && !payload.client?.form) {
      delete payload.client;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/tourist-application/api/v1/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      const result = await res.json();

      if (result.success) {
        Swal.fire({
          title: "Your Form has been submitted",
          icon: "success",
          draggable: false,
          showConfirmButton: false,
          timer: 2000,
        });

        router.push("/dashboard")
      } else {
        Swal.fire({
          title: result.message || "Application Not submitted yet!",
          icon: "error",
          draggable: false,
          showConfirmButton: false,
          timer: 2000,
        });
        throw new Error("No insertedId");
      }
    } catch (error: any) {
      Swal.fire({
        title: error.message || "Something went wrong! Try again.",
        icon: "error",
        draggable: false,
        showConfirmButton: false,
        timer: 2000,
      });
    } finally {
      setIsSubmitting(false);
      reset();
    }
  }

  const toggleSelection = (
    currentValues: string[],
    value: string,
    field: keyof FormValues,
  ) => {
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    // @ts-ignore
    setValue(field, newValues, { shouldValidate: true });
  };

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
      <div className="bg-white p-8 text-center border-b border-gray-100">
        <h1 className="text-3xl font-bold text-red-600">Fill up to register</h1>
        <p className="text-gray-500 mt-1 text-sm">{touristPackage.p_title}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-10 space-y-8">
        {/* ── Personal Information ── */}
        <Section title="Personal Information" required>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FormItem label="Full Name" error={errors.fullName?.message}>
              <Input placeholder="John Doe" {...register("fullName")} />
            </FormItem>

            <FormItem label="Phone Number" error={errors.phoneNumber?.message}>
              <Input
                placeholder="+880 1XXX XXXXXX"
                {...register("phoneNumber")}
              />
            </FormItem>

            <FormItem label="Email" error={errors.email?.message}>
              <Input
                type="email"
                placeholder="john@example.com"
                {...register("email")}
              />
            </FormItem>

            <FormItem
              label="Passport Number"
              error={errors.passportNumber?.message}
            >
              <Input placeholder="A12345678" {...register("passportNumber")} />
            </FormItem>

            <FormItem label="Visa Status" error={errors.visaStatus?.message}>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between font-normal text-left bg-transparent"
                  >
                    {visaStatus === "already-have"
                      ? "Already have"
                      : "Need visa support"}
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-4" align="start">
                  <RadioGroup
                    value={visaStatus}
                    onValueChange={(val: any) =>
                      setValue("visaStatus", val, { shouldValidate: true })
                    }
                  >
                    <div className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50">
                      <RadioGroupItem value="already-have" id="visa-have" />
                      <Label
                        htmlFor="visa-have"
                        className="flex-1 cursor-pointer"
                      >
                        Already have
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50">
                      <RadioGroupItem value="need-support" id="visa-need" />
                      <Label
                        htmlFor="visa-need"
                        className="flex-1 cursor-pointer"
                      >
                        Need visa support
                      </Label>
                    </div>
                  </RadioGroup>
                </PopoverContent>
              </Popover>
            </FormItem>

            <FormItem label="Passport & Visa Image">
              <div className="relative">
                <Input
                  type="file"
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                  onChange={onFileChange}
                />
                <Label
                  htmlFor="file-upload"
                  className="flex items-center justify-center w-full h-10 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-100 rounded-md cursor-pointer hover:bg-red-100 transition-colors"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {uploading ? "Uploading..." : "Upload Passport & Visa"}
                </Label>
              </div>
            </FormItem>

            <FormItem label="Gender" error={errors.gender?.message}>
              <Select onValueChange={(val) => setValue("gender", val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>

            <FormItem label="Number of Guests">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between font-normal text-left bg-transparent"
                  >
                    <span>
                      {guests.adults + guests.children + guests.infants}{" "}
                      Guest(s)
                    </span>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-4" align="start">
                  <div className="space-y-4">
                    <GuestCounter
                      label="Adults"
                      subLabel="Age 13+"
                      value={guests.adults}
                      onChange={(v) => setValue("guests.adults", v)}
                      min={1}
                    />
                    <GuestCounter
                      label="Children"
                      subLabel="Ages 2-12"
                      value={guests.children}
                      onChange={(v) => setValue("guests.children", v)}
                    />
                    <GuestCounter
                      label="Infants"
                      subLabel="Under 2"
                      value={guests.infants}
                      onChange={(v) => setValue("guests.infants", v)}
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </FormItem>

            <FormItem label="Travel Cost">
              <Input
                value={`${touristPackage.isInternationalPackage ? "$" : "৳"} ${packagePrice}`}
                readOnly
                className="bg-gray-50 text-gray-600"
              />
            </FormItem>
          </div>
        </Section>

        {/* ── Travel Arrangement ── */}
        <Section title="Travel Arrangement" required>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FormItem label="Air Ticket">
              <Select onValueChange={(val) => setValue("airTicket", val)}>
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      touristPackage.is_with_air_ticket
                        ? "Included in package"
                        : "Select type"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="economy">Economy</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="first">First Class</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>

            <FormItem label="Destination Country">
              <Input
                value={packageCountry}
                readOnly
                className="bg-gray-50 text-gray-600"
              />
            </FormItem>

            <FormItem label="Destination">
              <Input
                value={destination}
                readOnly
                className="bg-gray-50 text-gray-600"
              />
            </FormItem>

            {/* Sub Destination — dropdown from array */}
            {subDestinations.length > 0 && (
              <FormItem label="Sub Destination">
                <div className="flex flex-wrap gap-2">
                  {subDestinations.map((sub, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-xs bg-green-50 text-green-700 border border-green-200 rounded-full font-medium"
                    >
                      ✓ {sub}
                    </span>
                  ))}
                </div>
              </FormItem>
            )}

            <FormItem label="Starting From">
              <Input
                value={touristPackage.start_form}
                readOnly
                className="bg-gray-50 text-gray-600"
              />
            </FormItem>

            <FormItem label="Total Price">
              <Input
                value={`${touristPackage.isInternationalPackage ? "$" : "৳"} ${packagePrice}`}
                readOnly
                className="bg-gray-50 text-gray-600"
              />
            </FormItem>
          </div>
        </Section>

        {/* ── Travel Duration ── */}
        <Section title="Travel Duration" required>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormItem label="Duration">
              <Input
                value={touristPackage.duration}
                readOnly
                className="bg-gray-50 text-gray-600"
              />
            </FormItem>
            <FormItem label="Number of Members">
              <Input
                value={touristPackage.number_of_member}
                readOnly
                className="bg-gray-50 text-gray-600"
              />
            </FormItem>
          </div>
        </Section>

        {/* ── Package Includes / Excludes ── */}
        <Section title="Package Details">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormItem label="Includes">
              <div className="flex flex-wrap gap-2 pt-1">
                {touristPackage.includes.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-xs bg-green-50 text-green-700 border border-green-200 rounded-full font-medium"
                  >
                    ✓ {item}
                  </span>
                ))}
              </div>
            </FormItem>
            <FormItem label="Excludes">
              <div className="flex flex-wrap gap-2 pt-1">
                {touristPackage.excludes.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-xs bg-red-50 text-red-600 border border-red-200 rounded-full font-medium"
                  >
                    ✕ {item}
                  </span>
                ))}
              </div>
            </FormItem>
          </div>
        </Section>

        {/* ── Food Plan ── */}
        <Section title="Food Plan" required>
          <FormItem label="Food" error={errors.foodPlan?.message}>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between font-normal text-left bg-transparent"
                >
                  <span className="truncate">
                    {foodPlan.length > 0
                      ? foodPlan.join(", ")
                      : "Select food plan"}
                  </span>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-full min-w-[18rem] p-2"
                align="start"
              >
                <div className="space-y-1">
                  {[
                    "Breakfast",
                    "Lunch",
                    "Dinner",
                    "Snacks",
                    "All Inclusive",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded"
                    >
                      <Checkbox
                        id={`food-${item}`}
                        checked={foodPlan.includes(item)}
                        onCheckedChange={() =>
                          toggleSelection(foodPlan, item, "foodPlan")
                        }
                      />
                      <Label
                        htmlFor={`food-${item}`}
                        className="flex-1 cursor-pointer"
                      >
                        {item}
                      </Label>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </FormItem>
        </Section>

        {/* ── Transportation ── */}
        <Section title="Transportation" required>
          <FormItem
            label="Transportation"
            error={errors.transportation?.message}
          >
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between font-normal text-left bg-transparent"
                >
                  <span className="truncate">
                    {transportation.length > 0
                      ? transportation.join(", ")
                      : "Select transportation"}
                  </span>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-full min-w-[18rem] p-2"
                align="start"
              >
                <div className="space-y-1">
                  {["Private Car", "Bus", "Train", "Ferry"].map((item) => (
                    <div
                      key={item}
                      className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded"
                    >
                      <Checkbox
                        id={`trans-${item}`}
                        checked={transportation.includes(item)}
                        onCheckedChange={() =>
                          toggleSelection(
                            transportation,
                            item,
                            "transportation",
                          )
                        }
                      />
                      <Label
                        htmlFor={`trans-${item}`}
                        className="flex-1 cursor-pointer"
                      >
                        {item}
                      </Label>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </FormItem>
        </Section>

        {/* ── Hotel Booking ── */}
        <Section title="Hotel Booking" required>
          <FormItem label="Hotel Category">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between font-normal text-left bg-transparent"
                >
                  <span className="truncate">
                    {hotelCategory.length > 0
                      ? hotelCategory.join(", ")
                      : "Select category"}
                  </span>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-full min-w-[18rem] p-2"
                align="start"
              >
                <div className="space-y-1">
                  {["3 Star", "4 Star", "5 Star", "Resort", "Villa"].map(
                    (item) => (
                      <div
                        key={item}
                        className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded"
                      >
                        <Checkbox
                          id={`hotel-${item}`}
                          checked={hotelCategory.includes(item)}
                          onCheckedChange={() =>
                            toggleSelection(
                              hotelCategory,
                              item,
                              "hotelCategory",
                            )
                          }
                        />
                        <Label
                          htmlFor={`hotel-${item}`}
                          className="flex-1 cursor-pointer"
                        >
                          {item}
                        </Label>
                      </div>
                    ),
                  )}
                </div>
              </PopoverContent>
            </Popover>
          </FormItem>
        </Section>

        {/* ── Payment ── */}
        <Section title="Payment" required>
          <div className="grid grid-cols-1 gap-6">
            <FormItem
              label="Payment Method"
              error={errors.paymentMethod?.message}
            >
              <Select onValueChange={(val) => setValue("paymentMethod", val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bkash">Bkash</SelectItem>
                  <SelectItem value="credit-card">
                    Credit / Debit Card
                  </SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>

            {paymentMethod === "credit-card" && (
              <div className="p-6 border border-gray-200 rounded-xl bg-gray-50 space-y-4 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center gap-2 text-gray-700 mb-2">
                  <CreditCard className="w-5 h-5" />
                  <span className="font-semibold">Card Details</span>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="card-number">Card Number</Label>
                  <Input
                    id="card-number"
                    placeholder="0000 0000 0000 0000"
                    {...register("cardNumber")}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="expiry">Expiry</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      {...register("cardExpiry")}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input
                      id="cvc"
                      placeholder="123"
                      {...register("cardCvc")}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </Section>

        <div className="pt-6">
          <Button
            type="submit"
            className="w-32 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg h-12 text-lg shadow-md hover:shadow-lg transition-all"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Section({
  title,
  children,
  required,
}: {
  title: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-1">
        {required && <span className="text-red-500">*</span>}
        {title}
      </h3>
      <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
        {children}
      </div>
    </div>
  );
}

function FormItem({
  label,
  children,
  error,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-xs font-medium text-gray-500 uppercase tracking-wide ml-1">
        {label}
      </Label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1 ml-1">{error}</p>}
    </div>
  );
}

function GuestCounter({
  label,
  subLabel,
  value,
  onChange,
  min = 0,
}: {
  label: string;
  subLabel: string;
  value: number;
  onChange: (val: number) => void;
  min?: number;
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium text-sm text-gray-900">{label}</p>
        <p className="text-xs text-gray-500">{subLabel}</p>
      </div>
      <div className="flex items-center space-x-3 bg-gray-100 rounded-lg p-1">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-6 w-6 rounded-md hover:bg-white shadow-sm"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
        >
          <Minus className="h-3 w-3" />
        </Button>
        <span className="w-4 text-center text-sm font-medium">{value}</span>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-6 w-6 rounded-md hover:bg-white shadow-sm"
          onClick={() => onChange(value + 1)}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}
