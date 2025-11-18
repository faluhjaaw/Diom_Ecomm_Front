import React from "react";
import { Button } from "../../../../components/ui/button";

const productImages = [
  {
    src: "/shoesbags-1.png",
    alt: "Shoesbags",
    className:
      "absolute top-[106px] left-[1047px] w-[252px] h-[169px] object-cover",
  },
  {
    src: "/suitcase-1.png",
    alt: "Suitcase",
    className:
      "absolute top-[219px] left-[848px] w-[137px] h-[184px] object-cover",
  },
  {
    src: "/electronics-1.png",
    alt: "Electronics",
    className:
      "absolute top-[336px] left-[1017px] w-[210px] h-[150px] object-cover",
  },
  {
    src: "/snacks-1.png",
    alt: "Snacks",
    className:
      "absolute top-[378px] left-[643px] w-[205px] h-[134px] object-cover",
  },
];

export const LandingPageSection = (): JSX.Element => {
  return (
    <section className="relative w-full h-[613px] bg-[#a1d1e4]">
      <img
        className="absolute top-0 left-0 w-full h-full object-cover"
        alt="Bg stage"
        src="/images/Landing.png"
      />


      <div className="absolute top-[141px] left-[55px] [text-shadow:0px_1.7px_21.63px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-white text-[70px] tracking-[0] leading-[normal]">
        Shopping And <br />
        Departement Store
      </div>

      <p className="absolute top-[351px] left-[55px] [text-shadow:0px_1.7px_21.63px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-white text-[22px] tracking-[0] leading-[normal]">
        Découvrez une nouvelle façon de consommer : simple, <br />
        élégante et responsable.
      </p>

      <Button className="absolute top-[460px] left-[55px] w-[157px] h-[52px] bg-white rounded-[26.24px] shadow-[0px_3px_14.77px_#00000040] [text-shadow:0px_1.7px_21.63px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#1071b5] text-[21px] tracking-[0] leading-[normal] hover:bg-white/90">
        Voir plus
      </Button>
    </section>
  );
};
