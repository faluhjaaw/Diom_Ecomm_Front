import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

const brandData = [
  {
    name: "Nike",
    image: "/image-15-1.png",
    description: "Livraison en moins de 24 heures",
    hasCircleBg: true,
  },
  {
    name: "Adidas",
    image: "/image-16-1.png",
    description: "Livraison en moins de 24 heures",
    hasCircleBg: true,
  },
  {
    name: "Levis",
    image: "/image-17-1.png",
    description: "Livraison en moins de 24 heures",
    hasCircleBg: true,
  },
  {
    name: "Faynara Mast.",
    image: "/image-14.png",
    description: "Livraison en moins de 24 heures",
    hasCircleBg: false,
  },
  {
    name: "Nike",
    image: "/image-15-1.png",
    description: "Livraison en moins de 24 heures",
    hasCircleBg: true,
  },
  {
    name: "Adidas",
    image: "/image-16-1.png",
    description: "Livraison en moins de 24 heures",
    hasCircleBg: true,
  },
  {
    name: "Levis",
    image: "/image-17-1.png",
    description: "Livraison en moins de 24 heures",
    hasCircleBg: true,
  },
  {
    name: "Faynara Mast.",
    image: "/image-14.png",
    description: "Livraison en moins de 24 heures",
    hasCircleBg: false,
  },
];

export const BrandShowcaseSection = (): JSX.Element => {
  return (
    <section className="w-full py-8 px-4">
      <h2 className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-3xl tracking-[0] leading-[normal] mb-8 px-[50px]">
        Sélectionnez une marque
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-[50px]">
        {brandData.map((brand, index) => (
          <Card
            key={`brand-${index}`}
            className="bg-[#f5f6f6] rounded-[20px] overflow-hidden shadow-[0px_2px_5.8px_1px_#0000001a] border-0 cursor-pointer hover:shadow-lg transition-shadow"
          >
            <CardContent className="p-6 flex items-center gap-6">
              <div className="relative flex-shrink-0">
                {brand.hasCircleBg && (
                  <div className="w-[90px] h-[90px] bg-white rounded-full" />
                )}
                <img
                  className={`${brand.hasCircleBg ? "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" : ""} ${
                    brand.name === "Nike"
                      ? "w-[83px] h-[47px]"
                      : brand.name === "Adidas"
                        ? "w-[73px] h-[47px]"
                        : brand.name === "Levis"
                          ? "w-20 h-[45px]"
                          : "w-[90px] h-[90px]"
                  } object-cover`}
                  alt={brand.name}
                  src={brand.image}
                />
              </div>

              <div className="flex flex-col gap-2 flex-1 min-w-0">
                <h3 className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-xl tracking-[0] leading-[normal] whitespace-nowrap">
                  {brand.name}
                </h3>
                <p className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-normal text-[#333333] text-[13px] tracking-[0] leading-[normal]">
                  {brand.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
