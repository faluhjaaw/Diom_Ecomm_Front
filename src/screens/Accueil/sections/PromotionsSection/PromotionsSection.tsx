import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

export const PromotionsSection = (): JSX.Element => {
  return (
    <section className="relative w-full h-[575px] bg-[#d9d9d9]">
      <img
        className="absolute top-0 left-0 w-full h-[575px] object-cover"
        alt="Salooon"
        src="/images/categories/salooon.png"
      />

      <div className="absolute top-[49px] right-[111px] w-[527px]">
        <Card className="bg-[#003d29] border-0 shadow-[0px_4px_15.1px_-5px_#00000040]">
          <CardContent className="flex flex-col p-0 pt-[62px] pb-[62px] pl-[33px] pr-[9px]">
            <h2 className="w-full max-w-[518px] [text-shadow:0px_1.7px_21.63px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-white text-[45px] tracking-[0] leading-[normal]">
              Obtenez 5 % <br />
              de cashback pour&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;100 000 Fcfa
              d&apos;achats
            </h2>

            <p className="w-full max-w-[518px] mt-2.5 [text-shadow:0px_1.7px_21.63px_#00000026] [font-family:'Inter',Helvetica] font-normal text-white text-xl tracking-[0] leading-[normal]">
              Parce qu&apos;économiser en se faisant plaisir, c&apos;est
              toujours une bonne idée.
            </p>

            <Button
              variant="outline"
              className="w-[169.54px] h-auto mt-[62px] py-3.5 px-9 rounded-[28px] border border-solid border-white bg-[#003d29] shadow-[0px_3.2px_15.76px_#00000040] hover:bg-[#003d29] hover:opacity-90"
            >
              <span className="[text-shadow:0px_1.81px_23.08px_#00000026] text-[22.4px] [font-family:'Inter',Helvetica] font-semibold text-white tracking-[0] leading-[normal]">
                Voir plus
              </span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
