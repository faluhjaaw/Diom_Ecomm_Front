import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { authService } from "../../services/auth.service";
import { userService } from "../../services/user.service";
import { productService } from "../../services/product.service";
import { Product } from "../../types";
import { Store, Package, DollarSign, TrendingUp, User, LogOut } from "lucide-react";

export const VendorDashboard = (): JSX.Element => {
  const navigate = useNavigate();
  const [vendorId, setVendorId] = useState<number | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalRevenue: 0,
    averageRating: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("userRole");

    if (!token || userRole !== "VENDEUR") {
      navigate("/login");
      return;
    }

    loadDashboardData();
  }, [navigate]);

  const loadDashboardData = async () => {
    try {
      const userEmail = localStorage.getItem("userEmail");
      if (!userEmail) {
        navigate("/login");
        return;
      }

      const { data: userData } = await userService.getUserByEmail(userEmail);
      setVendorId(userData.id);

      // Récupérer tous les produits et filtrer par vendorId
      const { data: allProducts } = await productService.getAll();
      const vendorProducts = allProducts.filter(
        (product: Product) => product.vendorId === userData.id
      );
      setProducts(vendorProducts);

      // Calculer les statistiques
      const totalProducts = vendorProducts.length;
      const totalRevenue = vendorProducts.reduce(
        (sum: number, product: Product) => sum + product.price * (10 - product.stock),
        0
      );
      const averageRating =
        vendorProducts.reduce((sum: number, product: Product) => sum + product.rating, 0) /
        (totalProducts || 1);

      setStats({
        totalProducts,
        totalRevenue,
        averageRating: Math.round(averageRating * 10) / 10,
      });
    } catch (error) {
      console.error("Erreur chargement dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await authService.logout(token);
      }
      localStorage.removeItem("token");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userRole");
      navigate("/login");
    } catch (error) {
      console.error("Erreur déconnexion:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userRole");
      navigate("/login");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-2xl text-[#333333]">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="w-full h-[85px] flex items-center bg-white px-20 gap-3 border-b border-gray-200">
        <div className="w-[38.16px] h-[38.16px] bg-[#1071b5] rounded-[19.08px] shadow-[0px_1.7px_9.84px_#00000026] flex-shrink-0 flex items-center justify-center">
          <Store className="w-5 h-5 text-white" />
        </div>
        <div className="[text-shadow:0px_1.7px_21.63px_#0000000a] [font-family:'Inter',Helvetica] font-semibold text-[#1071b5] text-[20.4px] tracking-[0] leading-[normal] flex-shrink-0">
          ShopSen - Espace Vendeur
        </div>

        <nav className="ml-auto flex items-center gap-6">
          <div className="flex items-center gap-[11px]">
            <User
              className="w-5 h-5 text-[#333333] hover:cursor-pointer"
              onClick={() => navigate("/vendor-profile")}
            />
            <button
              onClick={() => navigate("/vendor-profile")}
              className="[text-shadow:0px_1.7px_21.63px_#0000000a] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-[17px] tracking-[0] leading-[normal] hover:text-[#1071b5] transition-colors"
            >
              Mon Profil
            </button>
          </div>

          <div className="flex items-center gap-[11px]">
            <LogOut
              className="w-5 h-5 text-[#333333] hover:cursor-pointer"
              onClick={handleLogout}
            />
            <button
              onClick={handleLogout}
              className="[text-shadow:0px_1.7px_21.63px_#0000000a] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-[17px] tracking-[0] leading-[normal] hover:text-[#1071b5] transition-colors"
            >
              Déconnexion
            </button>
          </div>
        </nav>
      </header>

      <div className="max-w-[1400px] mx-auto px-12 py-8">
        <h1 className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-4xl tracking-[0] leading-[normal] mb-8">
          Tableau de bord
        </h1>

        {/* Statistiques */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-[20px] shadow-[0px_2px_5.8px_1px_#0000001a] border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="[font-family:'Inter',Helvetica] font-medium text-[#333333] text-sm mb-2">
                    Total Produits
                  </p>
                  <p className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-bold text-[#1071b5] text-4xl">
                    {stats.totalProducts}
                  </p>
                </div>
                <Package className="w-12 h-12 text-[#1071b5] opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 rounded-[20px] shadow-[0px_2px_5.8px_1px_#0000001a] border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="[font-family:'Inter',Helvetica] font-medium text-[#333333] text-sm mb-2">
                    Revenus Estimés
                  </p>
                  <p className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-bold text-green-700 text-4xl">
                    {stats.totalRevenue.toLocaleString()}
                  </p>
                  <p className="[font-family:'Inter',Helvetica] font-normal text-[#333333] text-xs">
                    FCFA
                  </p>
                </div>
                <DollarSign className="w-12 h-12 text-green-700 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-[20px] shadow-[0px_2px_5.8px_1px_#0000001a] border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="[font-family:'Inter',Helvetica] font-medium text-[#333333] text-sm mb-2">
                    Note Moyenne
                  </p>
                  <p className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-bold text-yellow-700 text-4xl">
                    {stats.averageRating}
                  </p>
                  <p className="[font-family:'Inter',Helvetica] font-normal text-[#333333] text-xs">
                    / 5 étoiles
                  </p>
                </div>
                <TrendingUp className="w-12 h-12 text-yellow-700 opacity-50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions rapides */}
        <div className="mb-12">
          <h2 className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-2xl tracking-[0] leading-[normal] mb-6">
            Actions rapides
          </h2>
          <div className="grid grid-cols-3 gap-6">
            <Button
              onClick={() => navigate("/vendor-profile")}
              className="h-16 bg-[#1071b5] rounded-[20px] shadow-[0px_3px_14.77px_#00000040] [font-family:'Inter',Helvetica] font-semibold text-white text-base hover:bg-[#0d5a94]"
            >
              Gérer mon profil
            </Button>
            <Button
              variant="outline"
              className="h-16 bg-white rounded-[20px] border-[1.22px] border-[#33333333] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-base hover:bg-gray-50"
            >
              Ajouter un produit
            </Button>
            <Button
              variant="outline"
              className="h-16 bg-white rounded-[20px] border-[1.22px] border-[#33333333] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-base hover:bg-gray-50"
            >
              Voir les commandes
            </Button>
          </div>
        </div>

        {/* Liste des produits */}
        <div>
          <h2 className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-2xl tracking-[0] leading-[normal] mb-6">
            Mes produits ({products.length})
          </h2>

          {products.length === 0 ? (
            <Card className="bg-[#f5f6f6] rounded-[20px] shadow-[0px_2px_5.8px_1px_#0000001a] border-0">
              <CardContent className="p-16 text-center">
                <Package className="w-24 h-24 mx-auto mb-6 text-gray-400" />
                <h3 className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-2xl tracking-[0] leading-[normal] mb-2">
                  Aucun produit
                </h3>
                <p className="[font-family:'Inter',Helvetica] font-normal text-[#333333] text-base mb-6">
                  Commencez par ajouter votre premier produit
                </p>
                <Button className="h-12 px-8 bg-[#1071b5] rounded-[26.24px] shadow-[0px_3px_14.77px_#00000040] [font-family:'Inter',Helvetica] font-semibold text-white text-base hover:bg-[#0d5a94]">
                  Ajouter un produit
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-4 gap-6">
              {products.map((product) => (
                <Card
                  key={product.id}
                  className="bg-[#f5f6f6] rounded-[20px] overflow-hidden shadow-[0px_2px_5.8px_1px_#0000001a] border-0 cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => navigate(`/products/${product.id}`)}
                >
                  <CardContent className="p-0">
                    <img
                      className="w-full h-[200px] object-cover"
                      alt={product.name}
                      src={product.imageUrls[0] || "/image-1-2.png"}
                    />
                    <div className="p-4">
                      <h3 className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-lg tracking-[0] leading-[normal] mb-2 line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="[font-family:'Inter',Helvetica] font-normal text-[#333333] text-sm mb-2 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between mb-2">
                        <p className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-bold text-[#1071b5] text-xl">
                          {product.price.toLocaleString()} FCFA
                        </p>
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-400">★</span>
                          <span className="[font-family:'Inter',Helvetica] font-medium text-[#333333] text-sm">
                            {product.rating}
                          </span>
                        </div>
                      </div>
                      <p className="[font-family:'Inter',Helvetica] font-normal text-gray-600 text-xs">
                        Stock: {product.stock}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
