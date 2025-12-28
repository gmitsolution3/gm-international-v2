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
import { CreditCard, ChevronDown } from "lucide-react";

export default function PaymentForm() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Title */}
        <h1 className="text-center text-4xl font-bold mb-10">
          Make <span className="text-red-500">payment</span>
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          {/* Payment Method Icons */}
          <div className="flex justify-center gap-6 mb-8">
            <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-center w-24 h-16 border border-gray-200">
              <CreditCard className="w-12 h-12 text-red-500" />
            </div>
            <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-center w-24 h-16 border border-gray-200 opacity-50">
              bKash
            </div>
            <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-center w-24 h-16 border border-gray-200 opacity-50">
              Nagad
            </div>
          </div>

          {/* Card Number */}
          <div className="mb-6">
            <Label htmlFor="cardNumber" className="text-sm text-gray-600">
              Card number
            </Label>
            <div className="relative mt-2">
              <Input
                id="cardNumber"
                placeholder="1234 1234 1234 1234"
                className="h-14 text-lg border-pink-200 focus:border-pink-400 rounded-xl pr-32"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
                <img
                  src="https://img.icons8.com/color/48/visa.png"
                  alt="visa"
                  className="w-10 h-10"
                />
                <img
                  src="https://img.icons8.com/color/48/mastercard.png"
                  alt="mastercard"
                  className="w-10 h-10"
                />
                <img
                  src="https://img.icons8.com/color/48/amex.png"
                  alt="amex"
                  className="w-10 h-10"
                />
              </div>
            </div>
          </div>

          {/* Expiry & CVC */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <Label htmlFor="expiry" className="text-sm text-gray-600">
                Expiry
              </Label>
              <div className="mt-2">
                <Input
                  id="expiry"
                  placeholder="MM / YY"
                  className="h-14 border-pink-200 focus:border-pink-400 rounded-xl"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="cvc" className="text-sm text-gray-600">
                CVC
              </Label>
              <div className="mt-2">
                <Input
                  id="cvc"
                  placeholder="CVC"
                  className="h-14 border-pink-200 focus:border-pink-400 rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Country & Postal Code */}
          <div className="grid grid-cols-2 gap-6 mb-10">
            <div>
              <Label className="text-sm text-gray-600">Country</Label>
              <div className="mt-2">
                <Select defaultValue="united-states">
                  <SelectTrigger className="h-14 border-pink-200 rounded-xl">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="united-states">United States</SelectItem>
                    <SelectItem value="canada">Canada</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="postal" className="text-sm text-gray-600">
                Postal code
              </Label>
              <div className="mt-2">
                <Input
                  id="postal"
                  placeholder="90210"
                  className="h-14 border-pink-200 focus:border-pink-400 rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-6">
            <Button className="bg-red-500 hover:bg-red-600 text-white px-12 py-6 rounded-full text-lg font-bold">
              Submit
            </Button>

            <Button
              variant="outline"
              className="text-red-500 border-red-500 hover:bg-red-50 px-8 py-6 rounded-full text-lg font-bold"
            >
              Skip Payment
            </Button>

            <Button className="bg-red-500 hover:bg-red-600 text-white px-12 py-6 rounded-full text-lg font-bold flex items-center gap-2">
              Next
              <ChevronDown className="w-5 h-5 -rotate-90" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
