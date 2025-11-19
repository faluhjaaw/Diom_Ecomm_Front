// src/screens/Accueil/sections/DailyDealsSection/DailyDealsSection.tsx
import React, { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Product } from "../../../../types";
import { useCart } from "../../../../hooks/useCart";
import { useNavigate } from "react-router-dom";

interface Props {
  products: Product[];
}

const categories = [
  { label: "Gadgets", active: false },
  { label: "Fashion", active: false },
  { label: "Jouets", active: false },
  { label: "Education", active: true },
  { label: "Beaute", active: false },
  { label: "Fitness", active: false },
  { label: "Sneakers", active: false },
];

export const DailyDealsSection = ({ products }: Props): JSX.Element => {
  const [activeCategory, setActiveCategory] = useState("Education");
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = async (productId: string) => {
    try {
      await addToCart(productId, 1);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

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
            onClick={() => setActiveCategory(category.label)}
            className={`h-auto px-7 py-3.5 rounded-[42.72px] border-[1.42px] border-[#33333333] shadow-[0px_2.85px_8.69px_#0000001a] ${
              activeCategory === category.label ? "bg-[#86dcff]" : "bg-white"
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
              <CardContent
                className="p-0 relative cursor-pointer"
                onClick={() => navigate(`/products/${product.id}`)}
              >
                <img
                  className="w-full h-[303px] object-cover"
                  alt={product.name}
                  src={product.imageUrls[0] || "/image-1-2.png"}
                />
                <button
                  className="absolute top-[13px] right-[13px] w-[30px] h-[30px] bg-white rounded-[15px] flex items-center justify-center z-10"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    className="w-5 h-[17px] object-cover"
                    alt="Favorite"
                    src="/image-2-11.png"
                  />
                </button>
              </CardContent>
            </Card>

            <h3
              onClick={() => navigate(`/products/${product.id}`)}
              className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-xl tracking-[0] leading-[normal] whitespace-nowrap mb-1 cursor-pointer hover:text-[#1071b5] transition-colors">
              {product.name}
            </h3>

            <p className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-normal text-[#333333] text-[13px] tracking-[0] leading-[normal] mb-2 line-clamp-2">
              {product.description}
            </p>

            <div className="flex items-center gap-2 mb-3">
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

            <p className="font-semibold text-[#333333] text-xl whitespace-nowrap [text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] tracking-[0] leading-[normal] mb-4">
              {product.price.toLocaleString()} FCFA
            </p>

            <Button
              variant="outline"
              onClick={() => handleAddToCart(product.id)}
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