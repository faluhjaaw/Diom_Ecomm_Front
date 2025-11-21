import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { productService } from "../../services/product.service";
import { avisService } from "../../services/avis.service";
import { Product } from "../../types";
import { addToCart } from "../../lib/cart-utils";

export const ProductDetail = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    if (id) {
      fetchProduct();
      fetchReviews();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      const { data } = await productService.getById(id!);
      setProduct(data);
    } catch (error) {
      console.error("Erreur chargement produit:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const [reviewsRes, averageRes] = await Promise.all([
        avisService.getByProduct(id!),
        avisService.getAverage(id!),
      ]);
      setReviews(reviewsRes.data);
      setAverageRating(averageRes.data);
    } catch (error) {
      console.error("Erreur chargement avis:", error);
    }
  };

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    if (!product) return;

    setAddingToCart(true);

    const result = await addToCart({
      productId: product.id,
      quantity: quantity,
      unitPrice: product.price
    });

    setAddingToCart(false);

    if (result.success) {
      alert(result.message);
    } else {
      alert(result.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-2xl text-[#333333]">Chargement...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <p className="text-2xl text-[#333333] mb-4">Produit non trouvé</p>
        <Button onClick={() => navigate("/products")}>
          Retour au catalogue
        </Button>
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

      <div className="max-w-[1440px] mx-auto px-12 py-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 [text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-medium text-[#1071b5] text-sm hover:underline"
        >
          ← Retour
        </button>

        <div className="grid grid-cols-2 gap-12 mb-12">
          <div>
            <Card className="bg-[#f5f6f6] rounded-[20px] shadow-[0px_2px_5.8px_1px_#0000001a] border-0 mb-4">
              <CardContent className="p-0 relative h-[500px]">
                <img
                  src={product.imageUrls[selectedImage] || "/image-1-2.png"}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-[20px]"
                />
              </CardContent>
            </Card>

            {product.imageUrls.length > 1 && (
              <div className="flex gap-4">
                {product.imageUrls.map((img, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-24 h-24 bg-[#f5f6f6] rounded-lg overflow-hidden cursor-pointer ${
                      selectedImage === index ? "ring-2 ring-[#1071b5]" : ""
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="mb-4">
              <Badge variant="outline" className="mb-2">
                {product.brand}
              </Badge>
              {product.condition === "NEW" && (
                <Badge className="ml-2 bg-green-100 text-green-700">Neuf</Badge>
              )}
              {product.condition === "USED" && (
                <Badge className="ml-2 bg-orange-100 text-orange-700">
                  Occasion
                </Badge>
              )}
              {product.condition === "REFURBISHED" && (
                <Badge className="ml-2 bg-blue-100 text-blue-700">
                  Reconditionné
                </Badge>
              )}
            </div>

            <h1 className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-4xl tracking-[0] leading-[normal] mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-2xl ${
                      i < Math.floor(averageRating || product.rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-normal text-[#333333] text-base">
                ({reviews.length} avis)
              </span>
            </div>

            <p className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-normal text-[#333333] text-base tracking-[0] leading-[1.6] mb-8">
              {product.description}
            </p>

            <div className="mb-8">
              <p className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#1071b5] text-5xl tracking-[0] leading-[normal]">
                {product.price.toLocaleString()} FCFA
              </p>
              {product.stock < 10 && product.stock > 0 && (
                <p className="text-orange-600 text-sm mt-2">
                  Plus que {product.stock} en stock!
                </p>
              )}
              {product.stock === 0 && (
                <p className="text-red-600 text-sm mt-2">Rupture de stock</p>
              )}
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center border border-[#33333333] rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 flex items-center justify-center bg-[#f5f6f6] hover:bg-gray-200 [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-xl"
                >
                  -
                </button>
                <span className="w-16 h-12 flex items-center justify-center [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-lg">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity(Math.min(product.stock, quantity + 1))
                  }
                  className="w-12 h-12 flex items-center justify-center bg-[#f5f6f6] hover:bg-gray-200 [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-xl"
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>

              <Button
                onClick={handleAddToCart}
                disabled={product.stock === 0 || addingToCart}
                className="flex-1 h-12 bg-[#1071b5] rounded-[26.24px] shadow-[0px_3px_14.77px_#00000040] [text-shadow:0px_1.7px_21.63px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-white text-base hover:bg-[#0d5a94] disabled:opacity-50"
              >
                {addingToCart ? "Ajout en cours..." : "Ajouter au panier"}
              </Button>
            </div>

            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {product.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {product.specifications &&
              Object.keys(product.specifications).length > 0 && (
                <Card className="bg-[#f5f6f6] rounded-[20px] shadow-[0px_2px_5.8px_1px_#0000001a] border-0">
                  <CardContent className="p-6">
                    <h3 className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-xl tracking-[0] leading-[normal] mb-4">
                      Spécifications
                    </h3>
                    <div className="flex flex-col gap-3">
                      {Object.entries(product.specifications).map(
                        ([key, value]: [string, any]) => (
                          <div
                            key={key}
                            className="flex justify-between items-center border-b border-gray-200 pb-2"
                          >
                            <span className="[font-family:'Inter',Helvetica] font-medium text-[#333333] text-sm">
                              {key}
                            </span>
                            <span className="[font-family:'Inter',Helvetica] font-normal text-[#333333] text-sm">
                              {value.value || value}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
          </div>
        </div>

        <div>
          <h2 className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-2xl tracking-[0] leading-[normal] mb-6">
            Avis clients ({reviews.length})
          </h2>

          {reviews.length === 0 ? (
            <Card className="bg-[#f5f6f6] rounded-[20px] shadow-[0px_2px_5.8px_1px_#0000001a] border-0">
              <CardContent className="p-8 text-center">
                <p className="[font-family:'Inter',Helvetica] font-normal text-[#333333] text-base">
                  Aucun avis pour le moment. Soyez le premier à donner votre
                  avis!
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="flex flex-col gap-4">
              {reviews.map((review) => (
                <Card
                  key={review.id}
                  className="bg-[#f5f6f6] rounded-[20px] shadow-[0px_2px_5.8px_1px_#0000001a] border-0"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-base ${
                                i < review.note
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(review.date).toLocaleDateString("fr-FR")}
                      </span>
                    </div>
                    <p className="[font-family:'Inter',Helvetica] font-normal text-[#333333] text-sm leading-[1.6]">
                      {review.commentaire}
                    </p>
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