// src/screens/Accueil/sections/BestSellersSection/BestSellersSection.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Product } from "../../../../types";
import { Heart } from "lucide-react";
import { addToCart } from "../../../../lib/cart-utils";

interface Props {
  products: Product[];
}

export const BestSellersSection = ({ products }: Props): JSX.Element => {
  const navigate = useNavigate();
  const [addingToCart, setAddingToCart] = useState<string | null>(null);

  const handleAddToCart = async (product: Product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    setAddingToCart(product.id);

    const result = await addToCart({
      productId: product.id,
      quantity: 1,
      unitPrice: product.price
    });

    setAddingToCart(null);

    if (result.success) {
      alert(result.message);
    } else {
      alert(result.message);
    }
  };

  return (
    <section className="w-full py-8 px-14">
      <h2 className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-3xl tracking-[0] leading-[normal] mb-8">
        Produits les plus vendus
      </h2>

      <div className="grid grid-cols-4 gap-x-[40px] gap-y-[30px]">
        {products.slice(0, 4).map((product) => (
          <div key={product.id} className="flex flex-col">
            <Card
              className="bg-[#f5f6f6] rounded-[20px] overflow-hidden shadow-[0px_2px_5.8px_1px_#0000001a] border-0 mb-5 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => navigate(`/products/${product.id}`)}
            >
              <CardContent className="p-0 relative">
                <img
                  className="w-full h-[303px] object-cover"
                  alt={product.name}
                  src={product.imageUrls[0] || "/image-1-2.png"}
                />
                <button
                  className="absolute top-[13px] right-[13px] w-[30px] h-[30px] bg-white rounded-[15px] flex items-center justify-center hover:bg-gray-100 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Heart />
                </button>
              </CardContent>
            </Card>

            <h3
              className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-xl tracking-[0] leading-[normal] whitespace-nowrap mb-1 cursor-pointer hover:text-[#1071b5] transition-colors"
              onClick={() => navigate(`/products/${product.id}`)}
            >
              {product.name}
            </h3>

            <p
              className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-normal text-[#333333] text-[13px] tracking-[0] leading-[normal] mb-2 line-clamp-2 cursor-pointer"
              onClick={() => navigate(`/products/${product.id}`)}
            >
              {product.description}
            </p>

            <div
              className="flex items-center gap-2 mb-3 cursor-pointer"
              onClick={() => navigate(`/products/${product.id}`)}
            >
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

            <p
              className="font-semibold text-[#333333] text-xl whitespace-nowrap [text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] tracking-[0] leading-[normal] mb-4 cursor-pointer"
              onClick={() => navigate(`/products/${product.id}`)}
            >
              {product.price.toLocaleString()} FCFA
            </p>

            <Button
              variant="outline"
              onClick={() => handleAddToCart(product)}
              disabled={addingToCart === product.id}
              className="h-auto w-[181px] py-3 bg-white rounded-[36.63px] border-[1.22px] border-[#33333333] shadow-[0px_2.44px_7.45px_#0000001a] disabled:opacity-50"
            >
              <span className="[text-shadow:0px_2.07px_26.41px_#0000000a] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-[15.9px] tracking-[0] leading-[normal] whitespace-nowrap">
                {addingToCart === product.id ? "Ajout..." : "Ajouter au panier"}
              </span>
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
};
