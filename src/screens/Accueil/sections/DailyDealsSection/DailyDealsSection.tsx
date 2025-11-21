// src/screens/Accueil/sections/DailyDealsSection/DailyDealsSection.tsx
import React, { useState, useEffect } from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Product, Category } from "../../../../types";
import { Heart } from "lucide-react";
import { categoryService } from "../../../../services/category.service";
import { productService } from "../../../../services/product.service";

interface Props {
  products: Product[];
}

export const DailyDealsSection = ({ products: initialProducts }: Props): JSX.Element => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    setFilteredProducts(initialProducts);
  }, [initialProducts]);

  const fetchCategories = async () => {
    try {
      const { data } = await categoryService.getAll();
      setCategories(data.slice(0, 7)); // Limite à 7 catégories
    } catch (error) {
      console.error("Erreur chargement catégories:", error);
    }
  };

  const handleCategoryClick = async (categoryId: string) => {
    setActiveCategory(categoryId);
    setLoading(true);
    try {
      const { data } = await productService.filterByCategory(categoryId);
      setFilteredProducts(data);
    } catch (error) {
      console.error("Erreur filtrage produits:", error);
      setFilteredProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleShowAll = () => {
    setActiveCategory(null);
    setFilteredProducts(initialProducts);
  };

  const handleAddToCart = (productId: string) => {
    console.log('Ajout au panier:', productId);
  };

  return (
    <section className="w-full py-8 px-14">
      <h2 className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-3xl tracking-[0] leading-[normal] mb-8">
        Les meilleures offres du jour
      </h2>

      <div className="flex gap-4 mb-14 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <Button
          variant="outline"
          onClick={handleShowAll}
          className={`h-auto px-7 py-3.5 rounded-[42.72px] border-[1.42px] border-[#33333333] ${
            activeCategory === null ? "bg-[#86dcff]" : "bg-white"
          }`}
        >
          <span className="[text-shadow:0px_0.41px_30.79px_#0000000a] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-[18.5px] tracking-[0] leading-[normal] whitespace-nowrap">
            Tout afficher
          </span>
        </Button>
        {categories.map((category) => (
          <Button
            key={category.id}
            variant="outline"
            onClick={() => handleCategoryClick(category.id)}
            className={`h-auto px-7 py-3.5 rounded-[42.72px] border-[1.42px] border-[#33333333] ${
              activeCategory === category.id ? "bg-[#86dcff]" : "bg-white"
            }`}
          >
            <span className="[text-shadow:0px_2.41px_30.79px_#0000000a] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-[18.5px] tracking-[0] leading-[normal] whitespace-nowrap">
              {category.name}
            </span>
          </Button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-xl text-[#333333]">Chargement...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-xl text-[#333333]">Aucun produit dans cette catégorie</p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-x-[40px] gap-y-[30px]">
          {filteredProducts.map((product) => (
          <div key={product.id} className="flex flex-col">
            <Card className="bg-[#f5f6f6] rounded-[20px] overflow-hidden shadow-[0px_2px_5.8px_1px_#0000001a] border-0 mb-5">
              <CardContent className="p-0 relative">
                <img
                  className="w-full h-[303px] object-cover"
                  alt={product.name}
                  src={product.imageUrls[0] || "/image-1-2.png"}
                />
                <button className="absolute top-[13px] right-[13px] w-[30px] h-[30px] bg-white rounded-[15px] flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}>
                  
                  <Heart />
                </button>
              </CardContent>
            </Card>

            <h3 className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-xl tracking-[0] leading-[normal] whitespace-nowrap mb-1">
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
      )}
    </section>
  );
};