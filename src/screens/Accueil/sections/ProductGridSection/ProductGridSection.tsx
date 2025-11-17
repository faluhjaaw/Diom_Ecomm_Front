import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

export const ProductGridSection = (): JSX.Element => {
  return (
    <Card className="w-full bg-[#f5f6f6] rounded-[20px] shadow-[0px_2px_5.8px_1px_#0000001a] border-0">
      <CardContent className="flex flex-col p-0">
        <h2 className="ml-[38px] mt-9 [text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-[32px] tracking-[0] leading-[normal]">
          Questions fréquentes
        </h2>

        <p className="ml-[38px] mt-[45px] w-[315px] [text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-medium text-[#333333] text-xl tracking-[0] leading-[normal]">
          Tout ce que vous devez savoir pour faire vos achats en toute sécurité
          chez nous
        </p>

        <img
          className="w-full h-auto mt-[60px] object-cover"
          alt="Image"
          src="/image-14-1.png"
        />
      </CardContent>
    </Card>
  );
};
