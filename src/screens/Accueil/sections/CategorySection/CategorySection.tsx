// src/screens/Accueil/sections/CategorySection/CategorySection.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

interface Category {
  id: string;
  name: string;
  description: string;
}

interface Props {
  categories: Category[];
}

export const CategorySection = ({ categories }: Props): JSX.Element => {
  const defaultImage = "/furniture-1.png";
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/products?category=${categoryId}`);
  };

  return (
    <section className="w-full py-6 px-12">
      <h2 className="mb-8 [text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-3xl tracking-[0] leading-[normal]">
        Découvrez nos meilleures catégories
      </h2>

      <div className="grid grid-cols-6 gap-8">
        {categories.slice(0, 6).map((category) => (
          <div
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className="relative w-full aspect-[194/250] bg-[#d9d9d9] rounded-[20px] overflow-hidden shadow-[0px_2px_10.8px_#00000040] cursor-pointer hover:opacity-90 transition-opacity"
          >
            <img
              className="absolute inset-0 w-full h-full object-cover"
              alt={category.name}
              src={defaultImage}
            />

            <div className="absolute top-[29px] left-0 right-0 text-center px-4 [text-shadow:0px_1.7px_21.63px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-white text-[26px] tracking-[0] leading-[normal]">
              {category.name}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};