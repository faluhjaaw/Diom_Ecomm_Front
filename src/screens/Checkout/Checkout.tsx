import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardContent } from "../../components/ui/card";
import { cartService } from "../../services/cart.service";
import { orderService } from "../../services/order.service";
import { Cart } from "../../types";

export const Checkout = (): JSX.Element => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    shippingAddress: "",
    paymentMethod: "CARD",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvv: "",
  });

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const userId = 1; // TODO: Get from auth context
      const { data } = await cartService.getOrCreate(userId);
      
      if (!data.items || data.items.length === 0) {
        navigate("/cart");
        return;
      }
      
      setCart(data);
    } catch (error) {
      console.error("Erreur chargement panier:", error);
      navigate("/cart");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const userId = 1; // TODO: Get from auth context
      
      await orderService.createFromCart(cart!.id, userId, formData.paymentMethod);
      
      await cartService.clear(userId);
      
      navigate("/orders", { state: { orderSuccess: true } });
    } catch (error: any) {
      console.error("Erreur création commande:", error);
      alert(error.response?.data?.message || "Erreur lors de la commande");
    } finally {
      setSubmitting(false);
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
      <header className="w-full h-[85px] flex items-center bg-white px-7 gap-3 border-b border-gray-200">
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
      </header>

      <div className="max-w-[1200px] mx-auto px-12 py-8">
        <button
          onClick={() => navigate("/cart")}
          className="mb-6 [text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-medium text-[#1071b5] text-sm hover:underline"
        >
          ← Retour au panier
        </button>

        <h1 className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-3xl tracking-[0] leading-[normal] mb-8">
          Finaliser ma commande
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-2 flex flex-col gap-6">
              <Card className="bg-[#f5f6f6] rounded-[20px] shadow-[0px_2px_5.8px_1px_#0000001a] border-0">
                <CardContent className="p-6">
                  <h2 className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-xl tracking-[0] leading-[normal] mb-6">
                    Adresse de livraison
                  </h2>

                  <div className="flex flex-col gap-2">
                    <label className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-medium text-[#333333] text-sm tracking-[0] leading-[normal]">
                      Adresse complète
                    </label>
                    <textarea
                      value={formData.shippingAddress}
                      onChange={(e) =>
                        setFormData({ ...formData, shippingAddress: e.target.value })
                      }
                      required
                      rows={3}
                      placeholder="Rue, ville, code postal, pays"
                      className="w-full p-3 bg-white rounded-lg border border-[#33333333] shadow-[0px_2px_5px_#0000001a] [font-family:'Inter',Helvetica] text-[#333333] resize-none"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#f5f6f6] rounded-[20px] shadow-[0px_2px_5.8px_1px_#0000001a] border-0">
                <CardContent className="p-6">
                  <h2 className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-xl tracking-[0] leading-[normal] mb-6">
                    Méthode de paiement
                  </h2>

                  <div className="flex flex-col gap-4 mb-6">
                    <label className="flex items-center gap-3 p-4 bg-white rounded-lg border border-[#33333333] cursor-pointer hover:border-[#1071b5]">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="CARD"
                        checked={formData.paymentMethod === "CARD"}
                        onChange={(e) =>
                          setFormData({ ...formData, paymentMethod: e.target.value })
                        }
                        className="w-4 h-4"
                      />
                      <span className="[font-family:'Inter',Helvetica] font-medium text-[#333333] text-base">
                        Carte bancaire
                      </span>
                    </label>

                    <label className="flex items-center gap-3 p-4 bg-white rounded-lg border border-[#33333333] cursor-pointer hover:border-[#1071b5]">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="MOBILE_MONEY"
                        checked={formData.paymentMethod === "MOBILE_MONEY"}
                        onChange={(e) =>
                          setFormData({ ...formData, paymentMethod: e.target.value })
                        }
                        className="w-4 h-4"
                      />
                      <span className="[font-family:'Inter',Helvetica] font-medium text-[#333333] text-base">
                        Mobile Money
                      </span>
                    </label>

                    <label className="flex items-center gap-3 p-4 bg-white rounded-lg border border-[#33333333] cursor-pointer hover:border-[#1071b5]">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="CASH"
                        checked={formData.paymentMethod === "CASH"}
                        onChange={(e) =>
                          setFormData({ ...formData, paymentMethod: e.target.value })
                        }
                        className="w-4 h-4"
                      />
                      <span className="[font-family:'Inter',Helvetica] font-medium text-[#333333] text-base">
                        Paiement à la livraison
                      </span>
                    </label>
                  </div>

                  {formData.paymentMethod === "CARD" && (
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-2">
                        <label className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-medium text-[#333333] text-sm tracking-[0] leading-[normal]">
                          Numéro de carte
                        </label>
                        <Input
                          type="text"
                          value={formData.cardNumber}
                          onChange={(e) =>
                            setFormData({ ...formData, cardNumber: e.target.value })
                          }
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          required={formData.paymentMethod === "CARD"}
                          className="h-12 bg-white rounded-lg border border-[#33333333]"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-medium text-[#333333] text-sm tracking-[0] leading-[normal]">
                          Nom sur la carte
                        </label>
                        <Input
                          type="text"
                          value={formData.cardName}
                          onChange={(e) =>
                            setFormData({ ...formData, cardName: e.target.value })
                          }
                          placeholder="PRENOM NOM"
                          required={formData.paymentMethod === "CARD"}
                          className="h-12 bg-white rounded-lg border border-[#33333333]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                          <label className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-medium text-[#333333] text-sm tracking-[0] leading-[normal]">
                            Date d'expiration
                          </label>
                          <Input
                            type="text"
                            value={formData.cardExpiry}
                            onChange={(e) =>
                              setFormData({ ...formData, cardExpiry: e.target.value })
                            }
                            placeholder="MM/AA"
                            maxLength={5}
                            required={formData.paymentMethod === "CARD"}
                            className="h-12 bg-white rounded-lg border border-[#33333333]"
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-medium text-[#333333] text-sm tracking-[0] leading-[normal]">
                            CVV
                          </label>
                          <Input
                            type="text"
                            value={formData.cardCvv}
                            onChange={(e) =>
                              setFormData({ ...formData, cardCvv: e.target.value })
                            }
                            placeholder="123"
                            maxLength={3}
                            required={formData.paymentMethod === "CARD"}
                            className="h-12 bg-white rounded-lg border border-[#33333333]"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="bg-[#f5f6f6] rounded-[20px] shadow-[0px_2px_5.8px_1px_#0000001a] border-0 sticky top-8">
                <CardContent className="p-6">
                  <h2 className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-xl tracking-[0] leading-[normal] mb-6">
                    Récapitulatif
                  </h2>

                  <div className="flex flex-col gap-3 mb-6">
                    {cart?.items.map((item) => (
                      <div key={item.productId} className="flex justify-between items-center text-sm">
                        <span className="[font-family:'Inter',Helvetica] font-normal text-[#333333]">
                          {item.quantity}x Produit #{item.productId.slice(0, 8)}
                        </span>
                        <span className="[font-family:'Inter',Helvetica] font-semibold text-[#333333]">
                          {(item.unitPrice * item.quantity).toLocaleString()} FCFA
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-300 pt-4 mb-6">
                    <div className="flex justify-between items-center mb-3">
                      <span className="[font-family:'Inter',Helvetica] font-normal text-[#333333] text-base">
                        Sous-total
                      </span>
                      <span className="[font-family:'Inter',Helvetica] font-semibold text-[#333333] text-base">
                        {cart?.total.toLocaleString()} FCFA
                      </span>
                    </div>

                    <div className="flex justify-between items-center mb-4">
                      <span className="[font-family:'Inter',Helvetica] font-normal text-[#333333] text-base">
                        Livraison
                      </span>
                      <span className="[font-family:'Inter',Helvetica] font-semibold text-green-600 text-base">
                        Gratuite
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="[font-family:'Inter',Helvetica] font-semibold text-[#333333] text-xl">
                        Total
                      </span>
                      <span className="[font-family:'Inter',Helvetica] font-semibold text-[#1071b5] text-2xl">
                        {cart?.total.toLocaleString()} FCFA
                      </span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full h-12 bg-[#1071b5] rounded-[26.24px] shadow-[0px_3px_14.77px_#00000040] [text-shadow:0px_1.7px_21.63px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-white text-base hover:bg-[#0d5a94] disabled:opacity-50"
                  >
                    {submitting ? "Traitement..." : "Confirmer la commande"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};