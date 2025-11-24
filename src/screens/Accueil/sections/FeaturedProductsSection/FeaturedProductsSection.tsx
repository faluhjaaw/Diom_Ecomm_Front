import React from "react";
import { Button } from "../../../../components/ui/button";

const cardImages = [
  {
    src: "/image-11-1.png",
    alt: "Image",
    className: "top-6 left-[941px] w-[336px] h-[241px]",
  },
  {
    src: "/image-12-1.png",
    alt: "Image",
    className: "top-12 left-[967px] w-[323px] h-[207px]",
  },
  {
    src: "/image-13-1.png",
    alt: "Image",
    className: "top-[87px] left-[1000px] w-[296px] h-[162px]",
  },
];

export const FeaturedProductsSection = (): JSX.Element => {
  return (
    <section className="relative w-full bg-[#ffe6cc] py-[41px]">
      <div className="relative mx-auto max-w-[1440px] px-[121px]">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-[17px]">
            <h2 className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-[38px] tracking-[0] leading-[normal]">
              Cumulez des points à chaque achat
              <br />
              avec notre carte fidélité
            </h2>

            <p className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-normal text-[#333333] text-[22px] tracking-[0] leading-[normal]">
              sur ShopSen.com
            </p>

            <Button className="w-[159px] h-[52px] rounded-[26.24px] bg-[#003d29] shadow-[0px_3px_14.77px_#00000040] [text-shadow:0px_1.7px_21.63px_#00000026] text-[21px] [font-family:'Inter',Helvetica] font-semibold text-white tracking-[0] leading-[normal] hover:bg-[#003d29]/90">
              Voir plus
            </Button>
          </div>

          <div className="relative w-[356px] h-[241px] flex-shrink-0">
            {cardImages.map((card, index) => (
              <img
                key={index}
                className={`absolute ${card.className} object-cover`}
                alt={card.alt}
                src={card.src}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
