// src/screens/Accueil/sections/BestSellersSection/BestSellersSection.tsx
import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Product } from "../../../../types";

interface Props {
  products: Product[];
}

export const BestSellersSection = ({ products }: Props): JSX.Element => {
  const positions = ["left-[54px]", "left-[507px]", "left-[960px]"];

  return (
    <section className="w-full flex flex-col py-6">
      <h2 className="ml-[54px] [text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-3xl tracking-[0] leading-[normal] whitespace-nowrap">
        Produits les plus vendus
      </h2>

      <div className="relative mt-[35px] h-[508px]">
        {products.slice(0, 3).map((product, index) => (
          <div
            key={product.id}
            className={`absolute top-[11px] ${positions[index]} w-[424px]`}
          >
            <Card className="bg-[#f5f6f6] rounded-[20px] overflow-hidden shadow-[0px_2px_5.8px_1px_#0000001a] border-0">
              <CardContent className="p-0 relative h-[304px]">
                <img
                  className="absolute top-0 left-[60px] w-[303px] h-[304px] object-cover"
                  alt={product.name}
                  src={product.imageUrls[0] || "/image-10-1.png"}
                />

                <button className="absolute top-3.5 left-[379px] w-[30px] h-[30px] bg-white rounded-[15px] flex items-center justify-center border-0 cursor-pointer hover:bg-gray-50 transition-colors">
                  <img
                    className="w-5 h-[17px] object-cover"
                    alt="Favorite"
                    src="/image-2-11.png"
                  />
                </button>
              </CardContent>
            </Card>

            <div className="mt-[29px]">
              <div className="flex items-center justify-between">
                <h3 className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-xl tracking-[0] leading-[normal] whitespace-nowrap">
                  {product.name}
                </h3>
                <p className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-xl tracking-[0] leading-[normal] whitespace-nowrap">
                  {product.price.toLocaleString()} FCFA
                </p>
              </div>

              <p className="mt-[9px] [text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-normal text-[#333333] text-[13px] tracking-[0] leading-[normal] line-clamp-2">
                {product.description}
              </p>

              <div className="flex items-center gap-[11px] mt-[22px]">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}>
                      ★
                    </span>
                  ))}
                </div>
                <span className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-normal text-[#333333] text-[13px] tracking-[0] leading-[normal]">
                  ({product.rating})
                </span>
              </div>

              <Button
                variant="outline"
                className="mt-[22px] w-[181px] h-11 bg-white rounded-[36.63px] border-[1.22px] border-[#33333333] shadow-[0px_2.44px_7.45px_#0000001a] [text-shadow:0px_2.07px_26.41px_#0000000a] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-[15.9px] tracking-[0] leading-[normal] hover:bg-gray-50"
              >
                Ajouter au panier
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="ml-[58px] w-[1327px] mt-[37px] flex bg-[#d9d9d9] rounded-[20px] overflow-hidden shadow-[0px_2px_10.4px_-10px_#00000040] h-[7px]">
        <div className="w-[828px] h-[7px] bg-black rounded-[20px]" />
      </div>
    </section>
  );
};