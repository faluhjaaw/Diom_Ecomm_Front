import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

const products = [
  {
    id: 1,
    name: "Instax Mini 11",
    price: "15 000 FCFA",
    description: "Selfie mode, selfie mirror, macro mode",
    image: "/image-10-1.png",
    rating: "/five-stars-8.png",
    reviews: "(121)",
    leftPosition: "left-[54px]",
  },
  {
    id: 2,
    name: "Airpods Max",
    price: "15 000 FCFA",
    description: "Canvas, full grain leather",
    image: "/image-18.png",
    rating: "/five-stars-9.png",
    reviews: "(121)",
    leftPosition: "left-[507px]",
  },
  {
    id: 3,
    name: "adidas sneakers",
    price: "15 000 FCFA",
    description: "x Sean Wotherspoon Superstar sneakers",
    image: "/sambaa-1.png",
    rating: "/five-stars-10.png",
    reviews: "(121)",
    leftPosition: "left-[960px]",
  },
];

export const BestSellersSection = (): JSX.Element => {
  return (
    <section className="w-full flex flex-col py-6">
      <h2 className="ml-[54px] [text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-3xl tracking-[0] leading-[normal] whitespace-nowrap">
        Produits les plus vendus
      </h2>

      <div className="relative mt-[35px] h-[508px]">
        {products.map((product, index) => (
          <div
            key={product.id}
            className={`absolute top-[11px] ${product.leftPosition} w-[424px]`}
          >
            <Card className="bg-[#f5f6f6] rounded-[20px] overflow-hidden shadow-[0px_2px_5.8px_1px_#0000001a] border-0">
              <CardContent className="p-0 relative h-[304px]">
                <img
                  className={`absolute top-0 ${
                    index === 2
                      ? "top-[111px] left-[58px] w-[326px] h-[152px]"
                      : "left-[60px] w-[303px] h-[304px]"
                  } object-cover`}
                  alt={product.name}
                  src={product.image}
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
                  {product.price}
                </p>
              </div>

              <p className="mt-[9px] [text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-normal text-[#333333] text-[13px] tracking-[0] leading-[normal]">
                {product.description}
              </p>

              <div className="flex items-center gap-[11px] mt-[22px]">
                <img
                  className="w-[102px] h-[15px]"
                  alt="Rating"
                  src={product.rating}
                />
                <span className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-normal text-[#333333] text-[13px] tracking-[0] leading-[normal]">
                  {product.reviews}
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
