import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

const stores = [
  {
    name: "Sen Jews",
    category: "Bag - Perfume",
    mainImage: "/image-5-4.png",
    logoImage: "/image-21.png",
    deliveryText: "Livraison en moins de 24 heures",
  },
  {
    name: "Now Delivery",
    category: "Bag - Perfume",
    mainImage: "/image-8-1.png",
    logoImage: "/image-22.png",
    deliveryText: "Livraison en moins de 24 heures",
  },
  {
    name: "Bevmo",
    category: "Bag - Perfume",
    mainImage: "/image-9-1.png",
    logoImage: "/image-23.png",
    deliveryText: "Livraison en moins de 24 heures",
  },
  {
    name: "Quickly",
    category: "Bag - Perfume",
    mainImage: "/image-25.png",
    logoImage: "/image-24.png",
    deliveryText: "Livraison en moins de 24 heures",
  },
];

export const BoutiqueSection = (): JSX.Element => {
  return (
    <section className="w-full py-8 px-[54px]">
      <h2 className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-3xl tracking-[0] leading-[normal] whitespace-nowrap mb-[59px]">
        Boutique la plus populaire
      </h2>

      <div className="grid grid-cols-4 gap-[35px]">
        {stores.map((store, index) => (
          <Card
            key={index}
            className="bg-transparent border-none shadow-none cursor-pointer hover:opacity-90 transition-opacity"
          >
            <CardContent className="p-0 flex flex-col">
              <div className="w-full h-60 bg-[#f5f6f6] rounded-[20px] overflow-hidden shadow-[0px_2px_5.8px_1px_#0000001a] mb-[51px]">
                <img
                  className="w-full h-full object-cover"
                  alt={store.name}
                  src={store.mainImage}
                />
              </div>

              <div className="flex flex-col items-start px-[31px]">
                <img
                  className="w-[85px] h-[85px] object-cover mb-[18px]"
                  alt={`${store.name} logo`}
                  src={store.logoImage}
                />

                <h3 className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-3xl tracking-[0] leading-[normal] whitespace-nowrap mb-[9px]">
                  {store.name}
                </h3>

                <p className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-base tracking-[0] leading-[normal] whitespace-nowrap mb-[9px]">
                  {store.category}
                </p>

                <div className="flex items-center gap-[9px]">
                  <img
                    className="w-3.5 h-3.5 object-cover"
                    alt="Delivery icon"
                    src="/image-7-1.png"
                  />
                  <span className="w-[216px] [text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-normal text-[#cb5e93] text-[13px] tracking-[0] leading-[normal]">
                    {store.deliveryText}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
