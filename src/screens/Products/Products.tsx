import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardContent } from "../../components/ui/card";
import { productService } from "../../services/product.service";
import { categoryService } from "../../services/category.service";
import { Product, Category } from "../../types";
import { SearchIcon, FilterIcon, ChevronDownIcon, ShoppingCartIcon, UserIcon } from "lucide-react";

export const Products = (): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const [filters, setFilters] = useState({
    categoryId: searchParams.get("category") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    minRating: searchParams.get("minRating") || "",
    condition: searchParams.get("condition") || "",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [searchParams]);

  const fetchCategories = async () => {
    try {
      const { data } = await categoryService.getAll();
      setCategories(data);
    } catch (error) {
      console.error("Erreur chargement catégories:", error);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let response;
      const search = searchParams.get("search");
      const category = searchParams.get("category");
      const minPrice = searchParams.get("minPrice");
      const maxPrice = searchParams.get("maxPrice");
      const minRating = searchParams.get("minRating");
      const condition = searchParams.get("condition");

      if (search) {
        response = await productService.search(search);
      } else if (category) {
        response = await productService.filterByCategory(category);
      } else if (minPrice && maxPrice) {
        response = await productService.filterByPrice(Number(minPrice), Number(maxPrice));
      } else if (minRating) {
        response = await productService.filterByRating(Number(minRating));
      } else if (condition) {
        response = await productService.filterByCondition(condition);
      } else {
        response = await productService.getAll();
      }

      setProducts(response.data);
    } catch (error) {
      console.error("Erreur chargement produits:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ search: searchQuery });
    }
  };

  const applyFilters = () => {
    const params: any = {};
    if (filters.categoryId) params.category = filters.categoryId;
    if (filters.minPrice) params.minPrice = filters.minPrice;
    if (filters.maxPrice) params.maxPrice = filters.maxPrice;
    if (filters.minRating) params.minRating = filters.minRating;
    if (filters.condition) params.condition = filters.condition;
    setSearchParams(params);
  };

  const resetFilters = () => {
    setFilters({
      categoryId: "",
      minPrice: "",
      maxPrice: "",
      minRating: "",
      condition: "",
    });
    setSearchParams({});
  };

  const handleCategorySelect = (categoryId: string) => {
    setSearchParams({ category: categoryId });
    setShowCategoryDropdown(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="w-full h-[85px] flex items-center bg-white px-7 gap-3 border-b border-gray-200">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-[38.16px] h-[38.16px] bg-[#1071b5] rounded-[19.08px] shadow-[0px_1.7px_9.84px_#00000026] flex-shrink-0 cursor-pointer" onClick={() => navigate("/")} />
          <div className="[text-shadow:0px_1.7px_21.63px_#0000000a] [font-family:'Inter',Helvetica] font-semibold text-[#1071b5] text-[20.4px] tracking-[0] leading-[normal] flex-shrink-0 cursor-pointer" onClick={() => navigate("/")}>
            ShopSen
          </div>
        </div>

        {/* Category Dropdown */}
        <div className="relative ml-8">
          <button
            onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span className="[font-family:'Inter',Helvetica] font-medium text-[#333333] text-sm">
              Category
            </span>
            <ChevronDownIcon className={`w-4 h-4 text-[#333333] transition-transform ${showCategoryDropdown ? 'rotate-180' : ''}`} />
          </button>

          {showCategoryDropdown && (
            <div className="absolute top-full left-0 mt-2 w-[250px] bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 max-h-[400px] overflow-y-auto">
              <button
                onClick={() => {
                  setSearchParams({});
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

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 mx-6 max-w-[600px]">
          <div className="relative">
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Headphones"
              className="w-full h-[44px] bg-white rounded-[22px] border border-gray-300 pl-4 pr-12 [font-family:'Inter',Helvetica] text-[#333333] text-sm shadow-sm"
            />
            <button type="submit" className="absolute top-1/2 right-4 -translate-y-1/2">
              <SearchIcon className="w-5 h-5 text-[#333333]" />
            </button>
          </div>
        </form>

        {/* Right Icons */}
        <div className="flex items-center gap-6 ml-auto">
          <button
            onClick={() => navigate('/profile')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <UserIcon className="w-5 h-5 text-[#333333]" />
            <span className="[font-family:'Inter',Helvetica] font-medium text-[#333333] text-sm">
              Compte
            </span>
          </button>

          <button
            onClick={() => navigate('/cart')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <ShoppingCartIcon className="w-5 h-5 text-[#333333]" />
            <span className="[font-family:'Inter',Helvetica] font-medium text-[#333333] text-sm">
              Panier
            </span>
          </button>
        </div>
      </header>

      <div className="max-w-[1440px] mx-auto px-12 py-8">
        <div className="mb-8">
          <h1 className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-3xl tracking-[0] leading-[normal] mb-4">
            Catalogue de produits
          </h1>

          <form onSubmit={handleSearch} className="relative max-w-[600px]">
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Recherchez un produit..."
              className="h-12 bg-white rounded-[26.24px] border-[1.22px] border-[#33333333] shadow-[0px_2.44px_7.45px_#0000001a] pl-[29px] pr-[60px] [font-family:'Inter',Helvetica] text-[#333333]"
            />
            <button type="submit" className="absolute top-1/2 right-[20px] -translate-y-1/2">
              <SearchIcon className="w-[18px] h-[18px] text-[#333333]" />
            </button>
          </form>
        </div>

        <div className="flex gap-8">
          <aside className="w-[280px] flex-shrink-0">
            <Card className="bg-[#f5f6f6] rounded-[20px] shadow-[0px_2px_5.8px_1px_#0000001a] border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <FilterIcon className="w-5 h-5 text-[#333333]" />
                  <h2 className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-xl tracking-[0] leading-[normal]">
                    Filtres
                  </h2>
                </div>

                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-medium text-[#333333] text-sm tracking-[0] leading-[normal]">
                      Catégorie
                    </label>
                    <select
                      value={filters.categoryId}
                      onChange={(e) => setFilters({ ...filters, categoryId: e.target.value })}
                      className="h-10 bg-white rounded-lg border border-[#33333333] px-3 [font-family:'Inter',Helvetica] text-[#333333] text-sm"
                    >
                      <option value="">Toutes les catégories</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-medium text-[#333333] text-sm tracking-[0] leading-[normal]">
                      Prix minimum (FCFA)
                    </label>
                    <Input
                      type="number"
                      value={filters.minPrice}
                      onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                      placeholder="0"
                      className="h-10 bg-white rounded-lg border border-[#33333333]"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-medium text-[#333333] text-sm tracking-[0] leading-[normal]">
                      Prix maximum (FCFA)
                    </label>
                    <Input
                      type="number"
                      value={filters.maxPrice}
                      onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                      placeholder="1000000"
                      className="h-10 bg-white rounded-lg border border-[#33333333]"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-medium text-[#333333] text-sm tracking-[0] leading-[normal]">
                      Note minimum
                    </label>
                    <select
                      value={filters.minRating}
                      onChange={(e) => setFilters({ ...filters, minRating: e.target.value })}
                      className="h-10 bg-white rounded-lg border border-[#33333333] px-3 [font-family:'Inter',Helvetica] text-[#333333] text-sm"
                    >
                      <option value="">Toutes les notes</option>
                      <option value="4">4★ et plus</option>
                      <option value="3">3★ et plus</option>
                      <option value="2">2★ et plus</option>
                      <option value="1">1★ et plus</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-medium text-[#333333] text-sm tracking-[0] leading-[normal]">
                      État
                    </label>
                    <select
                      value={filters.condition}
                      onChange={(e) => setFilters({ ...filters, condition: e.target.value })}
                      className="h-10 bg-white rounded-lg border border-[#33333333] px-3 [font-family:'Inter',Helvetica] text-[#333333] text-sm"
                    >
                      <option value="">Tous les états</option>
                      <option value="NEW">Neuf</option>
                      <option value="USED">Occasion</option>
                      <option value="REFURBISHED">Reconditionné</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-3 pt-4">
                    <Button
                      onClick={applyFilters}
                      className="w-full h-10 bg-[#1071b5] rounded-lg [font-family:'Inter',Helvetica] font-semibold text-white text-sm hover:bg-[#0d5a94]"
                    >
                      Appliquer les filtres
                    </Button>
                    <Button
                      variant="outline"
                      onClick={resetFilters}
                      className="w-full h-10 bg-white rounded-lg border-[1.22px] border-[#33333333] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-sm"
                    >
                      Réinitialiser
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          <main className="flex-1">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <p className="text-xl text-[#333333]">Chargement...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64">
                <p className="text-xl text-[#333333] mb-2">Aucun produit trouvé</p>
                <p className="text-sm text-gray-500">Essayez de modifier vos filtres</p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <p className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-medium text-[#333333] text-base tracking-[0] leading-[normal]">
                    {products.length} produit{products.length > 1 ? "s" : ""} trouvé{products.length > 1 ? "s" : ""}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-8">
                  {products.map((product) => (
                    <Card
                      key={product.id}
                      className="bg-white rounded-[20px] shadow-[0px_2px_5.8px_1px_#0000001a] border-0 cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => navigate(`/products/${product.id}`)}
                    >
                      <CardContent className="p-0">
                        <div className="relative bg-[#f5f6f6] rounded-t-[20px] h-[280px] overflow-hidden">
                          <img
                            src={product.imageUrls[0] || "/image-1-2.png"}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                          
                          
                        </div>

                        <div className="p-5">
                          <h3 className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-lg tracking-[0] leading-[normal] mb-2 line-clamp-1">
                            {product.name}
                          </h3>

                          <p className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-normal text-[#333333] text-[13px] tracking-[0] leading-[normal] mb-3 line-clamp-2">
                            {product.description}
                          </p>

                          <div className="flex items-center gap-2 mb-3">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <span
                                  key={i}
                                  className={`text-base ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`}
                                >
                                  ★
                                </span>
                              ))}
                            </div>
                            <span className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-normal text-[#333333] text-[13px]">
                              ({product.rating})
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <p className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-xl tracking-[0] leading-[normal]">
                              {product.price.toLocaleString()} FCFA
                            </p>
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                              {product.condition === "NEW" && "Neuf"}
                              {product.condition === "USED" && "Occasion"}
                              {product.condition === "REFURBISHED" && "Reconditionné"}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};