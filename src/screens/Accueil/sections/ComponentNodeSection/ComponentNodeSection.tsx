import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

export const ComponentNodeSection = (): JSX.Element => {
  return (
    <Card className="w-full bg-[#f5f6f6] rounded-[20px] overflow-hidden shadow-[0px_2px_5.8px_1px_#0000001a]">
      <CardContent className="flex flex-col p-0">
        <h2 className="ml-[55px] mt-[33px] [text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-[32px] tracking-[0] leading-[normal]">
          Paiement en Ligne
        </h2>

        <p className="ml-[55px] mt-[45px] max-w-[315px] [text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-medium text-[#333333] text-xl tracking-[0] leading-[normal]">
          Achetez en toute sécurité dans nos magasins
        </p>

        <img
          className="w-full h-[260px] mt-[87px] object-cover"
          alt="Image"
          src="/image-26.png"
        />
      </CardContent>
    </Card>
  );
};
