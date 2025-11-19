// src/screens/Reviews/Reviews.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { avisService } from "../../services/avis.service";
import { Review } from "../../types";
import { ArrowLeft, Star } from "lucide-react";
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
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <Button
          onClick={handleBack}
          variant="ghost"
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Retour
        </Button>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-semibold text-[#333333] mb-6">
            Mes Avis
          </h1>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1071b5]"></div>
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-12">
              <div className="mb-4">
                <Star className="w-16 h-16 mx-auto text-gray-300" />
              </div>
              <p className="text-gray-500 text-lg mb-4">
                Vous n'avez pas encore laissé d'avis
              </p>
              <p className="text-gray-400 text-sm mb-6">
                Partagez votre expérience avec d'autres acheteurs
              </p>
              <Button
                onClick={() => navigate("/orders")}
                className="bg-[#1071b5] hover:bg-[#0d5a8f] text-white"
              >
                Voir mes commandes
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="border border-gray-200 rounded-lg p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg text-[#333333]">
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
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
