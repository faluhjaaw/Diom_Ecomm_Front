import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { orderService } from "../../services/order.service";
import { Order } from "../../types";
import { PackageIcon, CheckCircleIcon, ShoppingCartIcon, UserIcon, ArrowLeftIcon } from "lucide-react";

export const Orders = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (location.state?.orderSuccess) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    }
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const userId = 1; // TODO: Get from auth context
      // Note: L'API ne fournit pas d'endpoint pour récupérer toutes les commandes d'un user
      // Il faudrait l'ajouter au backend ou utiliser un endpoint existant
      setOrders([]);
    } catch (error) {
      console.error("Erreur chargement commandes:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { color: string; label: string }> = {
      CREATED: { color: "bg-gray-100 text-gray-700", label: "Créée" },
      PAID: { color: "bg-blue-100 text-blue-700", label: "Payée" },
      SHIPPED: { color: "bg-purple-100 text-purple-700", label: "Expédiée" },
      DELIVERED: { color: "bg-green-100 text-green-700", label: "Livrée" },
      CANCELLED: { color: "bg-red-100 text-red-700", label: "Annulée" },
    };

    const config = statusConfig[status] || statusConfig.CREATED;
    return <Badge className={config.color}>{config.label}</Badge>;
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
        <div
          className="w-[38.16px] h-[38.16px] bg-[#1071b5] rounded-[19.08px] shadow-[0px_1.7px_9.84px_#00000026] flex-shrink-0 cursor-pointer"
          onClick={() => navigate("/")}
        />
        <div
          className="[text-shadow:0px_1.7px_21.63px_#0000000a] [font-family:'Inter',Helvetica] font-semibold text-[#1071b5] text-[20.4px] tracking-[0] leading-[normal] flex-shrink-0 cursor-pointer"
          onClick={() => navigate("/")}
        >
          ShopSen
        </div>

        <nav className="ml-auto flex items-center gap-6">
          <div className="flex items-center gap-[11px]">
            <UserIcon className="w-5 h-5 text-[#333333] hover: cursor-pointer"
              onClick={() => navigate('/profile')}
            />
            <button
              onClick={() => navigate("/profile")}
              className="[text-shadow:0px_1.7px_21.63px_#0000000a] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-[17px] tracking-[0] leading-[normal] hover:text-[#1071b5] transition-colors"
            >
              Profil
            </button>
          </div>

          <div className="flex items-center gap-[5.7px]">
            <ShoppingCartIcon className="w-5 h-5 text-[#333333] hover: cursor-pointer"
              onClick={() => navigate('/cart')}
            />
            <button
              onClick={() => navigate("/cart")}
              className="[text-shadow:0px_1.7px_21.63px_#0000000a] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-[17px] tracking-[0] leading-[normal] hover:text-[#1071b5] transition-colors"
            >
              Panier
            </button>
          </div>
        </nav>
      </header>

      <div className="max-w-[1200px] mx-auto px-12 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity"
        >
          <ArrowLeftIcon className="w-5 h-5 text-[#333333]" />
          <span className="[text-shadow:0px_1.7px_21.63px_#0000000a] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-[17px] tracking-[0] leading-[normal]">
            Retour
          </span>
        </button>

        {showSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-[20px] flex items-center gap-3">
            <CheckCircleIcon className="w-6 h-6 text-green-600" />
            <p className="[font-family:'Inter',Helvetica] font-medium text-green-700">
              Commande confirmée avec succès! Vous recevrez un email de confirmation.
            </p>
          </div>
        )}

        <h1 className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-3xl tracking-[0] leading-[normal] mb-8">
          Mes commandes
        </h1>

        {orders.length === 0 ? (
          <Card className="bg-[#f5f6f6] rounded-[20px] shadow-[0px_2px_5.8px_1px_#0000001a] border-0">
            <CardContent className="p-16 flex flex-col items-center justify-center">
              <PackageIcon className="w-24 h-24 mb-6 text-gray-400" />
              <h2 className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-2xl tracking-[0] leading-[normal] mb-2">
                Aucune commande
              </h2>
              <p className="[font-family:'Inter',Helvetica] font-normal text-[#333333] text-base mb-6">
                Vous n'avez pas encore passé de commande
              </p>
              <Button
                onClick={() => navigate("/products")}
                className="h-12 px-8 bg-[#1071b5] rounded-[26.24px] shadow-[0px_3px_14.77px_#00000040] [font-family:'Inter',Helvetica] font-semibold text-white text-base hover:bg-[#0d5a94]"
              >
                Découvrir nos produits
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="flex flex-col gap-6">
            {orders.map((order) => (
              <Card
                key={order.id}
                className="bg-[#f5f6f6] rounded-[20px] shadow-[0px_2px_5.8px_1px_#0000001a] border-0"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-lg tracking-[0] leading-[normal]">
                          Commande #{order.id.slice(0, 8)}
                        </h3>
                        {getStatusBadge(order.status)}
                      </div>
                      <p className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString("fr-FR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#1071b5] text-2xl tracking-[0] leading-[normal]">
                        {order.total.toLocaleString()} FCFA
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {order.items.length} article{order.items.length > 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-gray-300 pt-4 mb-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="[font-family:'Inter',Helvetica] font-medium text-[#333333] mb-1">
                          Adresse de livraison
                        </p>
                        <p className="[font-family:'Inter',Helvetica] font-normal text-gray-600">
                          {order.shippingAddress || "Non spécifiée"}
                        </p>
                      </div>
                      <div>
                        <p className="[font-family:'Inter',Helvetica] font-medium text-[#333333] mb-1">
                          Méthode de paiement
                        </p>
                        <p className="[font-family:'Inter',Helvetica] font-normal text-gray-600">
                          {order.paymentMethod === "CARD" && "Carte bancaire"}
                          {order.paymentMethod === "MOBILE_MONEY" && "Mobile Money"}
                          {order.paymentMethod === "CASH" && "Paiement à la livraison"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="h-10 px-6 bg-white rounded-lg border-[1.22px] border-[#33333333] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-sm hover:bg-gray-50"
                    >
                      Voir les détails
                    </Button>
                    {order.status === "DELIVERED" && (
                      <Button
                        onClick={() => navigate(`/reviews?orderId=${order.id}`)}
                        className="h-10 px-6 bg-[#1071b5] rounded-lg [font-family:'Inter',Helvetica] font-semibold text-white text-sm hover:bg-[#0d5a94]"
                      >
                        Laisser un avis
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};