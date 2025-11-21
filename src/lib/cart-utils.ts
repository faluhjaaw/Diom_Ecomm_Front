// src/lib/cart-utils.ts
import { cartService } from '../services/cart.service';
import { userService } from '../services/user.service';

export interface AddToCartParams {
  productId: string;
  quantity: number;
  unitPrice: number;
}

export const addToCart = async (params: AddToCartParams): Promise<{ success: boolean; message: string }> => {
  try {
    // Vérifier l'authentification
    const token = localStorage.getItem("token");
    if (!token) {
      return {
        success: false,
        message: "Vous devez être connecté pour ajouter des articles au panier"
      };
    }

    // Récupérer l'userId
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      return {
        success: false,
        message: "Session invalide. Veuillez vous reconnecter."
      };
    }

    const { data: userData } = await userService.getUserByEmail(userEmail);

    // Ajouter au panier
    await cartService.addItem(
      userData.id,
      params.productId,
      params.quantity,
      params.unitPrice
    );

    return {
      success: true,
      message: "Produit ajouté au panier avec succès"
    };
  } catch (error: any) {
    console.error("Erreur ajout au panier:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Erreur lors de l'ajout au panier"
    };
  }
};
