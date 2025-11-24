import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { cartService } from "../../services/cart.service";
import { userService } from "../../services/user.service";
import { productService } from "../../services/product.service";
import { Cart, Product } from "../../types";
import { Trash2Icon, ShoppingCartIcon, UserIcon, PackageIcon } from "lucide-react";

interface CartItemWithProduct {
  productId: string;
  quantity: number;
  unitPrice: number;
  product?: Product;
}

export const CartPage = (): JSX.Element => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<Cart | null>(null);
  const [cartItemsWithProducts, setCartItemsWithProducts] = useState<CartItemWithProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    initializeCart();
  }, []);

  const initializeCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      // Récupérer l'userId depuis le localStorage via l'email
      const userEmail = localStorage.getItem("userEmail");
      if (!userEmail) {
        console.error("Email utilisateur introuvable");
        navigate("/login");
        return;
      }

      const { data: userData } = await userService.getUserByEmail(userEmail);
      setUserId(userData.id);

      // Récupérer le panier
      await fetchCart(userData.id);
    } catch (error) {
      console.error("Erreur initialisation panier:", error);
      setLoading(false);
    }
  };

  const fetchCart = async (userIdParam: number) => {
    try {
      const { data } = await cartService.getOrCreate(userIdParam);
      setCart(data);

      // Enrichir les items avec les informations des produits
      if (data.items && data.items.length > 0) {
        const itemsWithProducts = await Promise.all(
          data.items.map(async (item): Promise<CartItemWithProduct> => {
            try {
              const { data: product } = await productService.getById(item.productId);
              return { ...item, product };
            } catch (error) {
              console.error(`Erreur chargement produit ${item.productId}:`, error);
              return { ...item, product: undefined };
            }
          })
        );
        setCartItemsWithProducts(itemsWithProducts);
      } else {
        setCartItemsWithProducts([]);
      }
    } catch (error) {
      console.error("Erreur chargement panier:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (productId: string, quantity: number) => {
    if (!userId) return;

    try {
      await cartService.updateQuantity(userId, productId, quantity);
      await fetchCart(userId);
    } catch (error) {
      console.error("Erreur mise à jour quantité:", error);
    }
  };

  const handleRemoveItem = async (productId: string) => {
    if (!userId) return;

    try {
      await cartService.removeItem(userId, productId);
      await fetchCart(userId);
    } catch (error) {
      console.error("Erreur suppression article:", error);
    }
  };

  const handleClearCart = async () => {
    if (!userId) return;
    if (!confirm("Êtes-vous sûr de vouloir vider le panier?")) return;

    try {
      await cartService.clear(userId);
      await fetchCart(userId);
    } catch (error) {
      console.error("Erreur vidage panier:", error);
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
      <header className="w-full h-[85px] bg-white border-b border-gray-200 px-8">
        <div className="max-w-[1400px] mx-auto px-12 h-full flex items-center gap-3">
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

          <nav className="ml-auto flex items-center gap-8">
            <div className="flex items-center gap-[11px]">
              <PackageIcon
                className="w-5 h-5 text-[#333333] hover:cursor-pointer"
                onClick={() => navigate('/orders')}
              />
              <button
                onClick={() => navigate("/orders")}
                className="[text-shadow:0px_1.7px_21.63px_#0000000a] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-[17px] tracking-[0] leading-[normal] hover:text-[#1071b5] transition-colors"
              >
                Commandes
              </button>
            </div>

            <div className="flex items-center gap-[11px]">
              <UserIcon
                className="w-5 h-5 text-[#333333] hover:cursor-pointer"
                onClick={() => navigate('/profile')}
              />
              <button
                onClick={() => navigate("/profile")}
                className="[text-shadow:0px_1.7px_21.63px_#0000000a] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-[17px] tracking-[0] leading-[normal] hover:text-[#1071b5] transition-colors"
              >
                Compte
              </button>
            </div>
          </nav>
        </div>
      </header>

      <div className="max-w-[1200px] mx-auto px-12 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-3xl tracking-[0] leading-[normal]">
            Mon Panier
          </h1>
          {cart && cart.items.length > 0 && (
            <Button
              variant="outline"
              onClick={handleClearCart}
              className="h-10 px-6 rounded-lg border-[1.22px] border-red-500 text-red-500 hover:bg-red-50"
            >
              Vider le panier
            </Button>
          )}
        </div>

        {!cart || cart.items.length === 0 ? (
          <Card className="bg-[#f5f6f6] rounded-[20px] shadow-[0px_2px_5.8px_1px_#0000001a] border-0">
            <CardContent className="p-16 flex flex-col items-center justify-center">
              <ShoppingCartIcon className="w-24 h-24 mb-6 text-gray-400" />
              <h2 className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-2xl tracking-[0] leading-[normal] mb-2">
                Votre panier est vide
              </h2>
              <p className="[font-family:'Inter',Helvetica] font-normal text-[#333333] text-base mb-6">
                Découvrez nos produits et commencez vos achats
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
          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-2">
              <div className="flex flex-col gap-4">
                {cartItemsWithProducts.map((item) => (
                  <Card
                    key={item.productId}
                    className="bg-[#f5f6f6] rounded-[20px] shadow-[0px_2px_5.8px_1px_#0000001a] border-0"
                  >
                    <CardContent className="p-6">
                      <div className="flex gap-6">
                        <div
                          className="w-32 h-32 bg-white rounded-lg overflow-hidden flex-shrink-0 cursor-pointer"
                          onClick={() => navigate(`/products/${item.productId}`)}
                        >
                          <img
                            src={item.product?.imageUrls[0] || "/image-1-2.png"}
                            alt={item.product?.name || "Product"}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1">
                          <h3
                            className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-lg tracking-[0] leading-[normal] mb-2 cursor-pointer hover:text-[#1071b5] transition-colors"
                            onClick={() => navigate(`/products/${item.productId}`)}
                          >
                            {item.product?.name || `Produit #${item.productId}`}
                          </h3>

                          {item.product?.description && (
                            <p className="[font-family:'Inter',Helvetica] font-normal text-[#666] text-sm mb-2 line-clamp-2">
                              {item.product.description}
                            </p>
                          )}

                          <p className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#1071b5] text-xl tracking-[0] leading-[normal] mb-4">
                            {item.unitPrice.toLocaleString()} FCFA
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center border border-[#33333333] rounded-lg overflow-hidden">
                              <button
                                onClick={() =>
                                  handleUpdateQuantity(
                                    item.productId,
                                    Math.max(1, item.quantity - 1)
                                  )
                                }
                                className="w-10 h-10 flex items-center justify-center bg-white hover:bg-gray-100 [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-lg"
                              >
                                -
                              </button>
                              <span className="w-14 h-10 flex items-center justify-center bg-white [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-base">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  handleUpdateQuantity(
                                    item.productId,
                                    item.quantity + 1
                                  )
                                }
                                className="w-10 h-10 flex items-center justify-center bg-white hover:bg-gray-100 [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-lg"
                              >
                                +
                              </button>
                            </div>

                            <button
                              onClick={() => handleRemoveItem(item.productId)}
                              className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2Icon className="w-5 h-5 text-red-500" />
                            </button>
                          </div>
                        </div>

                        <div className="flex flex-col items-end justify-between">
                          <p className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-xl tracking-[0] leading-[normal]">
                            {(item.unitPrice * item.quantity).toLocaleString()}{" "}
                            FCFA
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <Card className="bg-[#f5f6f6] rounded-[20px] shadow-[0px_2px_5.8px_1px_#0000001a] border-0 sticky top-8">
                <CardContent className="p-6">
                  <h2 className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-xl tracking-[0] leading-[normal] mb-6">
                    Récapitulatif
                  </h2>

                  <div className="flex flex-col gap-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="[font-family:'Inter',Helvetica] font-normal text-[#333333] text-base">
                        Sous-total ({cart.items.length} article{cart.items.length > 1 ? 's' : ''})
                      </span>
                      <span className="[font-family:'Inter',Helvetica] font-semibold text-[#333333] text-base">
                        {cart.total.toLocaleString()} FCFA
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="[font-family:'Inter',Helvetica] font-normal text-[#333333] text-base">
                        Livraison
                      </span>
                      <span className="[font-family:'Inter',Helvetica] font-semibold text-green-600 text-base">
                        Gratuite
                      </span>
                    </div>

                    <div className="border-t border-gray-300 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="[font-family:'Inter',Helvetica] font-semibold text-[#333333] text-xl">
                          Total
                        </span>
                        <span className="[font-family:'Inter',Helvetica] font-semibold text-[#1071b5] text-2xl">
                          {cart.total.toLocaleString()} FCFA
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => navigate("/checkout")}
                    className="w-full h-12 bg-[#1071b5] rounded-[26.24px] shadow-[0px_3px_14.77px_#00000040] [text-shadow:0px_1.7px_21.63px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-white text-base hover:bg-[#0d5a94]"
                  >
                    Procéder au paiement
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => navigate("/products")}
                    className="w-full h-10 mt-3 bg-white rounded-lg border-[1.22px] border-[#33333333] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-sm"
                  >
                    Continuer mes achats
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
