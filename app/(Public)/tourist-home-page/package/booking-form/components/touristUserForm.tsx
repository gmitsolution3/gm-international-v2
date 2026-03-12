"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  CalendarIcon,
  Upload,
  Minus,
  Plus,
  ChevronDown,
  CreditCard,
} from "lucide-react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
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
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

interface InternationalPackage {
  _id: string;
  packageName: string;
  packageId: string;
  destination: string;
  subDestination: string;
  city: string;
  country: string;
  price: string; // Data-te string ("120000") ache
  B2BPrice: number | null;
  forB2BUser: boolean;
  internationalPackage: boolean;
  duration: string;
  startDate: string; // ISO Date String ba "YYYY-MM-DD"
  endDate: string;
  includes: string[];
  excludes: string[];
  photos: string[];
  createdBy: string;
  updatedAt: string;
}

interface PackageProps {
  touristPackage: InternationalPackage;
  source?: { b2bId: string; form: string };
}

// --- Zod Schema ---
const formSchema = z.object({
  // Personal Information
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
  travelCost: z.string().optional(),

  // Travel Arrangement
  airTicket: z.string().optional(),
  subDestination: z.string(),
  price: z.string(),

  // Travel Duration
  // duration: z.object({
  //   days: z.coerce.number().min(1, "At least 1 day"),
  //   nights: z.coerce.number().min(0),
  // }),

  // Food Plan
  foodPlan: z.array(z.string()).min(1, "Select at least one food option"),

  // Transportation
  transportation: z.array(z.string()).min(1, "Select transportation"),

  // Hotel Booking
  hotelCategory: z.array(z.string()).optional(),

  // Payment
  paymentMethod: z.string().nonempty("Select a payment method"),
  // Conditional payment fields (simple validation for demo)
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvc: z.string().optional(),
  createdAt: z.date().default(new Date()),
  createdBy: z.string().optional(),
  client: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function TouristUserForm({ touristPackage, source }: PackageProps) {
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const searchParams = useSearchParams();
  // const source = searchParams.get("source") || undefined;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      guests: { adults: 1, children: 0, infants: 0 },
      foodPlan: [],
      transportation: [],
      hotelCategory: [],
      visaStatus: "already-have",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = form;

  // Watch values for custom inputs
  const guests = watch("guests");
  const foodPlan = watch("foodPlan") || [];
  const transportation = watch("transportation") || [];
  const hotelCategory = watch("hotelCategory") || [];
  const paymentMethod = watch("paymentMethod");
  const visaStatus = watch("visaStatus");

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    // Simulate API call

    data.createdBy = session?.user?.email ?? undefined;

    const payload = {
      ...data,
      country: touristPackage.country,
      destinationPlace: touristPackage.city,
      subDestination: touristPackage.subDestination,
      totalCost: touristPackage.price,
      packageId: touristPackage._id,
      packageName: touristPackage.packageName,
      dateFrom: touristPackage.startDate,
      endTo: touristPackage.endDate,
      client: source,
    };

    const formData = await fetch(
      `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/tourist-package-booking`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      },
    );

    const result = await formData.json();

    if (!result) {
      Swal.fire({
        title: "Something was wrong!! try again",
        icon: "error",
        draggable: false,
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    if (result.insertedId) {
      Swal.fire({
        title: "Your Form has been submitted",
        icon: "success",
        draggable: false,
        showConfirmButton: false,
        timer: 2000,
      });
    }

    setIsSubmitting(false);
    // alert("Registration Successful! Check console for data.");
  }

  // Helper for multi-select toggle
  const toggleSelection = (
    currentValues: string[],
    value: string,
    field: keyof FormValues,
  ) => {
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    // @ts-ignore - dynamic key assignment is tricky with strong types but valid here
    setValue(field, newValues, { shouldValidate: true });
  };

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
      <div className="bg-white p-8 text-center border-b border-gray-100">
        <h1 className="text-3xl font-bold text-red-600">Fill up to register</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-10 space-y-8">
        {/* Personal Information */}
        <Section title="Personal information" required>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FormItem label="Full Name" error={errors.fullName?.message}>
              <Input placeholder="John Doe" {...register("fullName")} />
            </FormItem>

            <FormItem label="Phone Number" error={errors.phoneNumber?.message}>
              <Input
                placeholder="+1 234 567 8900"
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
                <PopoverContent className="w-70 p-4" align="start">
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

            <FormItem label="Passport & visa Image">
              <div className="relative">
                <Input type="file" className="hidden" id="file-upload" />
                <Label
                  htmlFor="file-upload"
                  className="flex items-center justify-center w-full h-10 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-100 rounded-md cursor-pointer hover:bg-red-100 transition-colors"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload PDF/Doc
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

            <FormItem label="Number of guests">
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
                placeholder="$0.00"
                value={touristPackage.price}
                readOnly
              />
            </FormItem>
          </div>
        </Section>

        {/* Travel Arrangement */}
        <Section title="Travel Arrangement" required>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormItem label="Air ticket">
              <Select onValueChange={(val) => setValue("airTicket", val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="economy">Economy</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="first">First Class</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>

            <FormItem label="Destination country">
              <Input value={touristPackage.country} readOnly />
            </FormItem>
            <FormItem label="Destination place">
              <Input value={touristPackage.city} readOnly />
            </FormItem>
            <FormItem label="Sub Destination">
              <Input
                {...register("subDestination")}
                value={touristPackage.subDestination}
                readOnly
              />
            </FormItem>
            <FormItem label="Total Price">
              <Input
                {...register("price")}
                value={touristPackage.price}
                readOnly
              />
            </FormItem>
          </div>
        </Section>

        {/* Travel Duration */}
        <Section title="Travel Duration" required>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormItem label="Duration">
              <Input value={touristPackage.duration} readOnly />
            </FormItem>
          </div>
        </Section>

        {/* Food Plan */}
        <Section title="Food Plan" required>
          <div className="grid grid-cols-1 gap-6">
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
                <PopoverContent className="w-full min-w-75 p-2" align="start">
                  <div className="space-y-2">
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
          </div>
        </Section>

        {/* Transportation */}
        <Section title="Transportation" required>
          <div className="grid grid-cols-1 gap-6">
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
                <PopoverContent className="w-full min-w-75 p-2" align="start">
                  <div className="space-y-2">
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
          </div>
        </Section>

        {/* Date */}
        <Section title="Date" required>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormItem label="From">
              {/* <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dateFrom && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateFrom ? (
                      format(dateFrom, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateFrom}
                    onSelect={(date) => setValue("dateFrom", date!)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover> */}

              <Input value={touristPackage.startDate} readOnly />
            </FormItem>

            <FormItem label="To">
              {/* <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dateTo && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateTo ? format(dateTo, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateTo}
                    onSelect={(date) => setValue("dateTo", date!)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover> */}
              <Input value={touristPackage.endDate} readOnly />
            </FormItem>
          </div>
        </Section>

        {/* Hotel Booking */}
        <Section title="Hotel Booking" required>
          <div className="grid grid-cols-1 gap-6">
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
                <PopoverContent className="w-full min-w-75 p-2" align="start">
                  <div className="space-y-2">
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
          </div>
        </Section>

        {/* Payment */}
        <Section title="Payment" required>
          <div className="grid grid-cols-1 gap-6">
            <FormItem
              label="Payment method"
              error={errors.paymentMethod?.message}
            >
              <Select onValueChange={(val) => setValue("paymentMethod", val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="bkash">Bkash</SelectItem>
                  <SelectItem value="credit-card">
                    Credit / Debit Card
                  </SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>

            {paymentMethod === "credit-card" && (
              <div className="col-span-1 p-6 border border-gray-200 rounded-xl bg-gray-50 space-y-4 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center gap-2 mb-4 text-gray-700">
                  <CreditCard className="w-5 h-5" />
                  <span className="font-semibold">Card Details</span>
                </div>

                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="card-number">Card number</Label>
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

// --- Sub-components ---

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
      <h3 className="text-sm font-semibold text-gray-900 flex items-center">
        {required && <span className="text-red-500 mr-1">*</span>}
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
