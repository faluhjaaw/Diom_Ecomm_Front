import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

const categories = [
  { label: "Gadgets", active: false },
  { label: "Fashion", active: false },
  { label: "Jouets", active: false },
  { label: "Education", active: true },
  { label: "Beaute", active: false },
  { label: "Fitness", active: false },
  { label: "Sneakers", active: false },
];

const products = [
  {
    id: 1,
    name: "Airpods Max",
    description: "Un équilibre parfait d'un son haute fidélité",
    price: "15 000 FCFA",
    rating: "/five-stars.png",
    reviews: "(121)",
    image: "/image-1-2.png",
    heartIcon: "/image-2-11.png",
  },
  {
    id: 2,
    name: "Étui floral ordi",
    description: "15 in. x 10 in. -Flap top closure",
    price: " 5 000 FCFA",
    rating: "/five-stars-2.png",
    reviews: "(121)",
    image: "/image-5.png",
    heartIcon: "/image-2-11.png",
  },
  {
    id: 3,
    name: "Homepod mini",
    description: "5 couleurs disponibles",
    price: "10 000 FCFA",
    rating: "/five-stars-4.png",
    reviews: "(121)",
    image: "/image-7.png",
    heartIcon: "/image-2-11.png",
  },
  {
    id: 4,
    name: "Ipad MIni",
    description: "Un équilibre parfait d'un son haute fidélité",
    price: "500 000 FCFA",
    rating: "/five-stars-6.png",
    reviews: "(121)",
    image: "/image-9.png",
    heartIcon: "/image-2-11.png",
  },
  {
    id: 5,
    name: "Airpods Max",
    description: "Un équilibre parfait d'un son haute fidélité",
    price: "15 000 FCFA",
    rating: "/five-stars-1.png",
    reviews: "(121)",
    image: "/image-1-2.png",
    heartIcon: "/image-2-11.png",
  },
  {
    id: 6,
    name: "Étui floral ordi",
    description: "15 in. x 10 in. -Flap top closure",
    price: " 5 000 FCFA",
    rating: "/five-stars-3.png",
    reviews: "(121)",
    image: "/image-5.png",
    heartIcon: "/image-2-11.png",
  },
  {
    id: 7,
    name: "Homepod mini",
    description: "5 couleurs disponibles",
    price: "10 000 FCFA",
    rating: "/five-stars-5.png",
    reviews: "(121)",
    image: "/image-7.png",
    heartIcon: "/image-2-11.png",
  },
  {
    id: 8,
    name: "Ipad MIni",
    description: "Un équilibre parfait d'un son haute fidélité",
    price: "500 000 FCFA",
    rating: "/five-stars-7.png",
    reviews: "(121)",
    image: "/image-9.png",
    heartIcon: "/image-2-11.png",
  },
];

export const DailyDealsSection = (): JSX.Element => {
  return (
    <section className="w-full py-8 px-14">
      <h2 className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-3xl tracking-[0] leading-[normal] mb-8">
        Les meilleures offres du jour
      </h2>

      <div className="flex gap-4 mb-14">
        {categories.map((category, index) => (
          <Button
            key={index}
            variant="outline"
            className={`h-auto px-7 py-3.5 rounded-[42.72px] border-[1.42px] border-[#33333333] shadow-[0px_2.85px_8.69px_#0000001a] ${
              category.active ? "bg-[#86dcff]" : "bg-white"
            }`}
          >
            <span className="[text-shadow:0px_2.41px_30.79px_#0000000a] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-[18.5px] tracking-[0] leading-[normal] whitespace-nowrap">
              {category.label}
            </span>
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-x-[40px] gap-y-[30px]">
        {products.map((product) => (
          <div key={product.id} className="flex flex-col">
            <Card className="bg-[#f5f6f6] rounded-[20px] overflow-hidden shadow-[0px_2px_5.8px_1px_#0000001a] border-0 mb-5">
              <CardContent className="p-0 relative">
                <img
                  className="w-full h-[303px] object-cover"
                  alt={product.name}
                  src={product.image}
                />
                <button className="absolute top-[13px] right-[13px] w-[30px] h-[30px] bg-white rounded-[15px] flex items-center justify-center">
                  <img
                    className="w-5 h-[17px] object-cover"
                    alt="Favorite"
                    src={product.heartIcon}
                  />
                </button>
              </CardContent>
            </Card>

            <h3 className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-xl tracking-[0] leading-[normal] whitespace-nowrap mb-1">
              {product.name}
            </h3>

            <p className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-normal text-[#333333] text-[13px] tracking-[0] leading-[normal] mb-2">
              {product.description}
            </p>

            <div className="flex items-center gap-2 mb-3">
              <img
                className="w-[102px] h-[15px]"
                alt="Rating"
                src={product.rating}
              />
              <span className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-normal text-[#333333] text-[13px] tracking-[0] leading-[normal]">
                {product.reviews}
              </span>
            </div>

            <p className="font-semibold text-[#333333] text-xl whitespace-nowrap [text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] tracking-[0] leading-[normal] mb-4">
              {product.price}
            </p>

            <Button
              variant="outline"
              className="h-auto w-[181px] py-3 bg-white rounded-[36.63px] border-[1.22px] border-[#33333333] shadow-[0px_2.44px_7.45px_#0000001a]"
            >
              <span className="[text-shadow:0px_2.07px_26.41px_#0000000a] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-[15.9px] tracking-[0] leading-[normal] whitespace-nowrap">
                Ajouter au panier
              </span>
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
};
