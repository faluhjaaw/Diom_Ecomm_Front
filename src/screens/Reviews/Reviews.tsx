// src/screens/Reviews/Reviews.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { avisService } from "../../services/avis.service";
import { Review } from "../../types";
import { ArrowLeftIcon, Star, ShoppingCartIcon, PackageIcon, UserIcon } from "lucide-react";
import { Button } from "../../components/ui/button";

export const Reviews = (): JSX.Element => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    // For now, this is a placeholder as we need proper backend integration
    setLoading(false);
  }, [orderId]);

  const handleBack = () => {
    if (orderId) {
      navigate("/orders");
    } else {
      navigate("/profile");
    }
  };

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

          <div className="flex items-center gap-[11px]">
            <PackageIcon className="w-5 h-5 text-[#333333] hover: cursor-pointer"
              onClick={() => navigate('/orders')}
            />
            <button
              onClick={() => navigate("/orders")}
              className="[text-shadow:0px_1.7px_21.63px_#0000000a] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-[17px] tracking-[0] leading-[normal] hover:text-[#1071b5] transition-colors"
            >
              Mes commandes
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
          onClick={handleBack}
          className="flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity"
        >
          <ArrowLeftIcon className="w-5 h-5 text-[#333333]" />
          <span className="[text-shadow:0px_1.7px_21.63px_#0000000a] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-[17px] tracking-[0] leading-[normal]">
            Retour
          </span>
        </button>

        <h1 className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-3xl tracking-[0] leading-[normal] mb-8">
          Mes Avis
        </h1>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1071b5]"></div>
          </div>
        ) : reviews.length === 0 ? (
          <div className="bg-[#f5f6f6] rounded-[20px] shadow-[0px_2px_5.8px_1px_#0000001a] border-0 p-16 text-center">
            <div className="mb-4">
              <Star className="w-16 h-16 mx-auto text-gray-300" />
            </div>
            <p className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-xl mb-2">
              Aucun avis pour le moment
            </p>
            <p className="[font-family:'Inter',Helvetica] font-normal text-[#333333] text-base mb-6">
              Partagez votre expérience avec d'autres acheteurs
            </p>
            <Button
              onClick={() => navigate("/orders")}
              className="h-12 px-8 bg-[#1071b5] rounded-[26.24px] shadow-[0px_3px_14.77px_#00000040] [font-family:'Inter',Helvetica] font-semibold text-white text-base hover:bg-[#0d5a94]"
            >
              Voir mes commandes
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-[#f5f6f6] rounded-[20px] shadow-[0px_2px_5.8px_1px_#0000001a] border-0 p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-lg tracking-[0] leading-[normal]">
                      Product Name
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < review.rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="[font-family:'Inter',Helvetica] font-normal text-[#333333] text-sm leading-[1.6]">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
