import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

const offerCards = [
  {
    bgColor: "bg-[#f2e4d9]",
    priceColor: "text-[#cb9917]",
    price: "50 000 FCFA",
    image: "/image-3-1.png",
  },
  {
    bgColor: "bg-[#f9dcdc]",
    priceColor: "text-[#961f1f]",
    price: "20 000 FCFA",
    image: "/image-10.png",
  },
  {
    bgColor: "bg-[#f2e4d9]",
    priceColor: "text-[#94623c]",
    price: "5 000 FCFA",
    image: "/image-11.png",
  },
  {
    bgColor: "bg-[#d2f7ec]",
    priceColor: "text-[#003d29]",
    price: "10 000 FCFA",
    image: "/image-12.png",
  },
];

export const SpecialOffersSection = (): JSX.Element => {
  return (
    <section className="w-full py-8 px-4">
      <h2 className="mb-10 px-[50px] [text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-3xl tracking-[0] leading-[normal]">
        Profitez de jusqu&apos;à 70 % de réduction
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-[50px]">
        {offerCards.map((card, index) => (
          <Card
            key={index}
            className="bg-[#f5f6f6] rounded-[20px] overflow-hidden shadow-[0px_2px_5.8px_1px_#0000001a] border-0"
          >
            <CardContent className="p-0 relative h-[421px]">
              <div className={`${card.bgColor} w-full h-[211px]`}>
                <div className="pt-6 px-[31px]">
                  <div className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-2xl tracking-[0] leading-[normal]">
                    Economisez
                  </div>

                  <div
                    className={`mt-[26px] font-semibold ${card.priceColor} text-[38px] [text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] tracking-[0] leading-[normal]`}
                  >
                    {card.price}
                  </div>

                  <div className="mt-[21px] w-[241px] [text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-sm tracking-[0] leading-[normal]">
                    Découvrez notre gamme de meubles et d&apos;articles de
                    décoration
                  </div>
                </div>
              </div>

              <img
                className="w-full h-[210px] object-cover"
                alt="Product"
                src={card.image}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
