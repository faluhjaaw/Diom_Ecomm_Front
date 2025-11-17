import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

export const HeroBannerSection = (): JSX.Element => {
  return (
    <Card className="w-full bg-[#f5f6f6] rounded-[20px] shadow-[0px_2px_5.8px_1px_#0000001a] overflow-hidden">
      <CardContent className="flex flex-col p-0">
        <h2 className="ml-[47px] mt-[31px] [text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-[32px] tracking-[0] leading-[normal]">
          Livraison à domicile
        </h2>

        <p className="ml-12 mt-[50px] [text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-medium text-[#333333] text-xl tracking-[0] leading-[normal]">
          Choisissez la livraison à domicile qui vous convient
        </p>

        <img
          className="w-full mt-[84px] object-cover"
          alt="Image"
          src="/image-27.png"
        />
      </CardContent>
    </Card>
  );
};
