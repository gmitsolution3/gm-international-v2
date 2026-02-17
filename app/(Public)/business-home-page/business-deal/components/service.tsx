import React from "react";
import { parsePricing } from "./DealForm";

export const ServiceForPricing = ({ service, title }: { service: string; title:string }) => {
  const prices = parsePricing(title);
  return (
    <div className="my-3">
      <h2 className="text-xl font-semibold">Legal Advice – Service Charge</h2>

      {service === "legal-advice" &&
        prices.map((item, i) => (
          <div key={i} className="flex justify-between p-2 border rounded mt-2">
            <span>{item.duration}</span>
            <span>
              {item.price} {item.currency}
            </span>
          </div>
        ))}
    </div>
  );
};
