// src/screens/Accueil/sections/OffersSection/OffersSection.tsx
import { ChevronDownIcon, SearchIcon, ShoppingCartIcon, UserIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Input } from "../../../../components/ui/input";
import { useNavigate } from "react-router-dom";
import { categoryService } from "../../../../services/category.service";
import { Category } from "../../../../types";

export const OffersSection = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data } = await categoryService.getAll();
      setCategories(data);
    } catch (error) {
      console.error("Erreur chargement catégories:", error);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`);
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    navigate(`/products?category=${categoryId}`);
    setShowCategoryDropdown(false);
  };

  return (
    <header className="w-ful h-[85px] flex items-center bg-white px-14 gap-3">
      <div
        onClick={() => navigate('/')}
        className="w-[38.16px] h-[38.16px] bg-[#1071b5] rounded-[19.08px] shadow-[0px_1.7px_9.84px_#00000026] flex-shrink-0 cursor-pointer"
      />

      <div
        onClick={() => navigate('/')}
        className="[text-shadow:0px_1.7px_21.63px_#0000000a] [font-family:'Inter',Helvetica] font-semibold text-[#1071b5] text-[20.4px] tracking-[0] leading-[normal] flex-shrink-0 cursor-pointer">
        ShopSen
      </div>

      <nav className="flex items-center gap-10 ml-[55px]">
        <div className="relative">
          <div className="flex items-center gap-[3.6px]">
            <button
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              className="[text-shadow:0px_1.7px_21.63px_#0000000a] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-[17px] tracking-[0] leading-[normal] hover:text-[#1071b5] transition-colors">
              Category
            </button>
            <ChevronDownIcon className="w-[25.01px] h-[16.11px] text-[#333333]" />
          </div>

          {showCategoryDropdown && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[250px] bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 max-h-[400px] overflow-y-auto">
              <button
                onClick={() => {
                  navigate('/products');
                  setShowCategoryDropdown(false);
                }}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 [font-family:'Inter',Helvetica] text-[#333333] text-sm transition-colors"
              >
                Toutes les catégories
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategorySelect(category.id)}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 [font-family:'Inter',Helvetica] text-[#333333] text-sm transition-colors"
                >
                  {category.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      <form onSubmit={handleSearch} className="relative ml-[70px] flex-shrink-0">
        <div className="w-[370.06px] h-[52.47px] shadow-[0px_3px_14.77px_#00000040] rounded-[26.24px]">
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Recherchez un produit..."
            className="w-full h-full bg-white rounded-[26.24px] border-0 pl-[29px] pr-[60px] [font-family:'Montserrat',Helvetica] font-semibold text-[10.5px] placeholder:text-[#c2c6cc]"
          />
          <button type="submit" className="absolute top-1/2 right-[20px] -translate-y-1/2">
            <SearchIcon className="w-[18px] h-[18px] text-[#333333]" />
          </button>
        </div>
      </form>

      <div className="flex items-center gap-[11px] ml-auto">
        <UserIcon className="w-5 h-5 text-[#333333] hover: cursor-pointer" 
          onClick={() => navigate('/profile')}
        />
        <button
          onClick={() => navigate('/profile')}
          className="[text-shadow:0px_1.7px_21.63px_#0000000a] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-[17px] tracking-[0] leading-[normal] hover:text-[#1071b5] transition-colors">
          Compte
        </button>
      </div>

      <div className="flex items-center gap-[5.7px] ml-[30.9px]">
        <ShoppingCartIcon className="w-5 h-5 text-[#333333] hover: cursor-pointer" 
          onClick={() => navigate('/cart')}
        />
        <button
          onClick={() => navigate('/cart')}
          className="[text-shadow:0px_1.7px_21.63px_#0000000a] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-[17px] tracking-[0] leading-[normal] hover:text-[#1071b5] transition-colors">
          Panier
        </button>
      </div>
    </header>
  );
};