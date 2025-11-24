import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { authService } from "../../services/auth.service";
import { userService } from "../../services/user.service";
import { productService } from "../../services/product.service";
import { Product, Order } from "../../types";
import { Store, Package, DollarSign, TrendingUp, User, LogOut, Clock, CheckCircle, Truck, XCircle } from "lucide-react";

export const VendorDashboard = (): JSX.Element => {
  const navigate = useNavigate();
  const [vendorId, setVendorId] = useState<number | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalRevenue: 0,
    averageRating: 0,
    totalOrders: 0,
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

      // Si le vendeur n'a pas de produits, créer des données de démonstration
      if (vendorProducts.length === 0) {
        const mockProducts: Product[] = [
          {
  id: "sport-1",
  name: "Ballon de Football Adidas Pro",
  description: "Ballon taille 5 haute performance utilisé en compétition",
  price: 45000,
  imageUrls: ["https://th.bing.com/th/id/OIP.81whec9gozIMqk7GQPGgYwHaHa?w=172&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3"],
  subCategoryId: "68ee26ea8256e07e8ce7a422",
  vendorId: userData.id,
  stock: 20,
  rating: 4.6,
  brand: "Adidas",
  condition: "NEW",
  tags: ["football", "ballon"],
  specifications: {}
},
{
  id: "sport-2",
  name: "Raquette de Tennis Wilson Ultra",
  description: "Raquette légère avec un excellent contrôle pour joueurs intermédiaires",
  price: 95000,
  imageUrls: ["https://www.avantage-service.com/4569-large_default/wilson-ultra-100-v3-300-g.jpg"],
  subCategoryId: "68ee26ea8256e07e8ce7a422",
  vendorId: userData.id,
  stock: 15,
  rating: 4.7,
  brand: "Wilson",
  condition: "NEW",
  tags: ["tennis", "raquette"],
  specifications: {}
},
{
  id: "sport-3",
  name: "Gants de Boxe Everlast Pro",
  description: "Gants 12 oz rembourrés pour entraînement intensif",
  price: 38000,
  imageUrls: ["https://th.bing.com/th/id/R.00bc511c1c11ccf7007a200a811a5096?rik=YymIxhKhLyW1Vg&riu=http%3a%2f%2fflexequipment.com.au%2fcdn%2fshop%2ffiles%2f4532.jpg%3fv%3d1705645897&ehk=vfeYtyiZT9Y1b5BFOzN2wKmK31GPEBdZI3%2bLcHCGC8Q%3d&risl=&pid=ImgRaw&r=0"],
  subCategoryId: "68ee26ea8256e07e8ce7a422",
  vendorId: userData.id,
  stock: 25,
  rating: 4.5,
  brand: "Everlast",
  condition: "NEW",
  tags: ["boxe", "gants"],
  specifications: {}
},
{
  id: "sport-4",
  name: "Tapis de Yoga Antidérapant",
  description: "Tapis 183x61cm avec grip renforcé pour séances de yoga et fitness",
  price: 22000,
  imageUrls: ["https://http2.mlstatic.com/D_NQ_NP_926453-MLM49484880974_032022-O.webp"],
  subCategoryId: "68ee26ea8256e07e8ce7a422",
  vendorId: userData.id,
  stock: 30,
  rating: 4.6,
  brand: "Domyos",
  condition: "NEW",
  tags: ["yoga", "fitness"],
  specifications: {}
},
{
  id: "sport-5",
  name: "Ballon de Basketball Spalding Street",
  description: "Ballon outdoor résistant pour jeu en extérieur",
  price: 35000,
  imageUrls: ["https://www.ballonbasket.fr/images/produits/zoom/ballon-de-basket-spalding-tf-1000-legacy-pro-2020-taille-7_2026.jpg"],
  subCategoryId: "68ee26ea8256e07e8ce7a422",
  vendorId: userData.id,
  stock: 18,
  rating: 4.4,
  brand: "Spalding",
  condition: "NEW",
  tags: ["basketball", "ballon"],
  specifications: {}
},
{
  id: "sport-6",
  name: "Chaussures de Running Nike Air Zoom",
  description: "Chaussures légères avec amorti optimal pour longues distances",
  price: 89000,
  imageUrls: ["https://th.bing.com/th/id/OIP.81whec9gozIMqk7GQPGgYwHaHa?w=172&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3"],
  subCategoryId: "68ee26ea8256e07e8ce7a422",
  vendorId: userData.id,
  stock: 22,
  rating: 4.8,
  brand: "Nike",
  condition: "NEW",
  tags: ["running", "chaussures"],
  specifications: {}
},
{
  id: "sport-7",
  name: "Haltères Ajustables 10KG",
  description: "Paires d’haltères réglables pour entraînement musculaire",
  price: 75000,
  imageUrls: ["https://media.cdnws.com/_i/127542/677/3718/78/haltere-hexagonale-10-kg-x1.jpeg"],
  subCategoryId: "68ee26ea8256e07e8ce7a422",
  vendorId: userData.id,
  stock: 12,
  rating: 4.7,
  brand: "Domyos",
  condition: "NEW",
  tags: ["musculation", "haltères"],
  specifications: {}
},
{
  id: "sport-8",
  name: "Vélo d’Appartement Magnétique",
  description: "Vélo avec résistance réglable pour cardio à domicile",
  price: 185000,
  imageUrls: ["https://contents.mediadecathlon.com/m15561702/k$17934290824b2447a57f7bcc69e5581c/sq/velo-dappartement-magnetique-zipro-boost-pour-fitness-et-cardio.jpg?format=auto&f=800x0"],
  subCategoryId: "68ee26ea8256e07e8ce7a422",
  vendorId: userData.id,
  stock: 7,
  rating: 4.6,
  brand: "Care Fitness",
  condition: "NEW",
  tags: ["cardio", "vélo"],
  specifications: {}
}

        ];

        setProducts(mockProducts);

        // Créer des commandes simulées
        const mockOrders: Order[] = [
          {
            id: "order-1",
            userId: 1001,
            items: [
              { productId: "sport-1", quantity: 2, unitPrice: 45000 },
              { productId: "sport-4", quantity: 1, unitPrice: 22000 }
            ],
            total: 112000,
            status: "DELIVERED",
            shippingAddress: "Dakar, Liberté 6",
            paymentMethod: "Wave",
            createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: "order-2",
            userId: 1002,
            items: [
              { productId: "sport-6", quantity: 1, unitPrice: 89000 }
            ],
            total: 89000,
            status: "SHIPPED",
            shippingAddress: "Dakar, Almadies",
            paymentMethod: "Orange Money",
            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: "order-3",
            userId: 1003,
            items: [
              { productId: "sport-2", quantity: 1, unitPrice: 95000 },
              { productId: "sport-1", quantity: 1, unitPrice: 45000 }
            ],
            total: 140000,
            status: "PAID",
            shippingAddress: "Dakar, Mermoz",
            paymentMethod: "Visa",
            createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: "order-4",
            userId: 1004,
            items: [
              { productId: "sport-8", quantity: 1, unitPrice: 185000 }
            ],
            total: 185000,
            status: "CREATED",
            shippingAddress: "Dakar, Ouakam",
            paymentMethod: "Wave",
            createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString()
          },
          {
            id: "order-5",
            userId: 1005,
            items: [
              { productId: "sport-3", quantity: 2, unitPrice: 38000 },
              { productId: "sport-7", quantity: 1, unitPrice: 75000 }
            ],
            total: 151000,
            status: "DELIVERED",
            shippingAddress: "Dakar, Plateau",
            paymentMethod: "Orange Money",
            createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];

        setOrders(mockOrders);

        // Calculer les statistiques avec les données de démonstration
        const totalProducts = mockProducts.length;
        const totalRevenue = mockOrders
          .filter(order => order.status === "DELIVERED")
          .reduce((sum, order) => sum + order.total, 0);
        const averageRating =
          mockProducts.reduce((sum, product) => sum + product.rating, 0) / totalProducts;

        setStats({
          totalProducts,
          totalRevenue,
          averageRating: Math.round(averageRating * 10) / 10,
          totalOrders: mockOrders.length,
        });
      } else {
        setProducts(vendorProducts);

        // Calculer les statistiques avec les données réelles
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
          totalOrders: 0,
        });
      }
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
        <div className="grid grid-cols-4 gap-6 mb-12">
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
                    Revenus Livrés
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

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-[20px] shadow-[0px_2px_5.8px_1px_#0000001a] border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="[font-family:'Inter',Helvetica] font-medium text-[#333333] text-sm mb-2">
                    Commandes
                  </p>
                  <p className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-bold text-purple-700 text-4xl">
                    {stats.totalOrders}
                  </p>
                  <p className="[font-family:'Inter',Helvetica] font-normal text-[#333333] text-xs">
                    Total
                  </p>
                </div>
                <Truck className="w-12 h-12 text-purple-700 opacity-50" />
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

        {/* Commandes récentes */}
        {orders.length > 0 && (
          <div className="mb-12">
            <h2 className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-2xl tracking-[0] leading-[normal] mb-6">
              Commandes récentes ({orders.length})
            </h2>

            <Card className="bg-white rounded-[20px] shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-left [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-sm">
                          N° Commande
                        </th>
                        <th className="px-6 py-4 text-left [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-sm">
                          Articles
                        </th>
                        <th className="px-6 py-4 text-left [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-sm">
                          Total
                        </th>
                        <th className="px-6 py-4 text-left [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-sm">
                          Statut
                        </th>
                        <th className="px-6 py-4 text-left [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-sm">
                          Paiement
                        </th>
                        <th className="px-6 py-4 text-left [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-sm">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <span className="[font-family:'Inter',Helvetica] font-medium text-[#1071b5] text-sm">
                              {order.id}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="[font-family:'Inter',Helvetica] font-normal text-[#333333] text-sm">
                              {order.items.length} article{order.items.length > 1 ? 's' : ''}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="[font-family:'Inter',Helvetica] font-semibold text-[#333333] text-sm">
                              {order.total.toLocaleString()} FCFA
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <Badge
                              className={`
                                ${order.status === 'DELIVERED' ? 'bg-green-100 text-green-700 hover:bg-green-100' : ''}
                                ${order.status === 'SHIPPED' ? 'bg-blue-100 text-blue-700 hover:bg-blue-100' : ''}
                                ${order.status === 'PAID' ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100' : ''}
                                ${order.status === 'CREATED' ? 'bg-gray-100 text-gray-700 hover:bg-gray-100' : ''}
                                ${order.status === 'CANCELLED' ? 'bg-red-100 text-red-700 hover:bg-red-100' : ''}
                                [font-family:'Inter',Helvetica] font-medium text-xs px-3 py-1
                              `}
                            >
                              <div className="flex items-center gap-1">
                                {order.status === 'DELIVERED' && <CheckCircle className="w-3 h-3" />}
                                {order.status === 'SHIPPED' && <Truck className="w-3 h-3" />}
                                {order.status === 'PAID' && <Clock className="w-3 h-3" />}
                                {order.status === 'CREATED' && <Clock className="w-3 h-3" />}
                                {order.status === 'CANCELLED' && <XCircle className="w-3 h-3" />}
                                {order.status === 'DELIVERED' && 'Livrée'}
                                {order.status === 'SHIPPED' && 'Expédiée'}
                                {order.status === 'PAID' && 'Payée'}
                                {order.status === 'CREATED' && 'En attente'}
                                {order.status === 'CANCELLED' && 'Annulée'}
                              </div>
                            </Badge>
                          </td>
                          <td className="px-6 py-4">
                            <span className="[font-family:'Inter',Helvetica] font-normal text-[#333333] text-sm">
                              {order.paymentMethod}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="[font-family:'Inter',Helvetica] font-normal text-gray-600 text-sm">
                              {new Date(order.createdAt).toLocaleDateString('fr-FR', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

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
