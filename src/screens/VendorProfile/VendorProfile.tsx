import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardContent } from "../../components/ui/card";
import { authService } from "../../services/auth.service";
import { userService } from "../../services/user.service";
import { vendorService } from "../../services/vendor.service";
import { ArrowLeftIcon, Store } from "lucide-react";

export const VendorProfile = (): JSX.Element => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [vendorId, setVendorId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    telephone: "",
    bio: "",
    nomBoutique: "",
    photoUrl: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const loadVendorData = async () => {
      try {
        // Récupérer l'email de l'utilisateur depuis le localStorage
        const userEmail = localStorage.getItem("userEmail");
        if (!userEmail) {
          console.error("Email utilisateur introuvable dans le localStorage");
          navigate("/login");
          return;
        }

        // Appeler l'endpoint GET /api/users/email/{email}
        const { data: userData } = await userService.getUserByEmail(userEmail);
        setVendorId(userData.id);

        try {
          // Récupérer les informations du vendeur
          const { data: vendorData } = await vendorService.getById(userData.id);
          setFormData({
            nom: vendorData.nom || userData.prenom + " " + userData.nom || "",
            email: vendorData.email || userData.email || "",
            telephone: vendorData.telephone || userData.telephone || "",
            bio: vendorData.bio || "",
            nomBoutique: vendorData.nomBoutique || "",
            photoUrl: vendorData.photoUrl || "",
          });
        } catch (vendorError) {
          // Si le profil vendeur n'existe pas encore, utiliser les données utilisateur
          console.log("Profil vendeur non trouvé, utilisation des données utilisateur");
          setFormData({
            nom: userData.prenom + " " + userData.nom,
            email: userData.email,
            telephone: userData.telephone,
            bio: "",
            nomBoutique: "",
            photoUrl: "",
          });
        }
      } catch (error) {
        console.error("Erreur chargement profil vendeur:", error);
        alert("Erreur lors du chargement du profil. Veuillez réessayer.");
      } finally {
        setPageLoading(false);
      }
    };

    loadVendorData();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await authService.logout(token);
      }
      localStorage.removeItem("token");
      localStorage.removeItem("userEmail");
      navigate("/login");
    } catch (error) {
      console.error("Erreur déconnexion:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("userEmail");
      navigate("/login");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vendorId) {
      alert("ID vendeur non disponible. Veuillez vous reconnecter.");
      return;
    }

    // Validation des champs obligatoires
    if (!formData.nom.trim()) {
      alert("Le nom du vendeur est obligatoire");
      return;
    }

    if (!formData.nomBoutique.trim()) {
      alert("Le nom de la boutique est obligatoire");
      return;
    }

    if (!formData.telephone.trim()) {
      alert("Le téléphone est obligatoire");
      return;
    }

    setLoading(true);

    try {
      await vendorService.update(vendorId, {
        nom: formData.nom,
        telephone: formData.telephone,
        bio: formData.bio,
        nomBoutique: formData.nomBoutique,
        photoUrl: formData.photoUrl,
        email: formData.email, // Inclure l'email même s'il n'est pas modifiable
      });
      alert("✅ Profil mis à jour avec succès!");
      setEditing(false);
      // Recharger les données pour confirmer la mise à jour
      const { data: vendorData } = await vendorService.getById(vendorId);
      setFormData({
        nom: vendorData.nom || "",
        email: vendorData.email || "",
        telephone: vendorData.telephone || "",
        bio: vendorData.bio || "",
        nomBoutique: vendorData.nomBoutique || "",
        photoUrl: vendorData.photoUrl || "",
      });
    } catch (error: any) {
      console.error("Erreur mise à jour profil:", error);
      const errorMessage = error.response?.data?.message || "Erreur lors de la mise à jour du profil";
      alert(`❌ ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#1071b5] mx-auto mb-4"></div>
          <p className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-medium text-[#333333] text-lg">
            Chargement du profil...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="w-full h-[85px] flex items-center bg-white px-20 gap-3 border-b border-gray-200">
        <div
          className="w-[38.16px] h-[38.16px] bg-[#1071b5] rounded-[19.08px] shadow-[0px_1.7px_9.84px_#00000026] flex-shrink-0 cursor-pointer flex items-center justify-center"
          onClick={() => navigate("/vendor-dashboard")}
        >
          <Store className="w-5 h-5 text-white" />
        </div>
        <div
          className="[text-shadow:0px_1.7px_21.63px_#0000000a] [font-family:'Inter',Helvetica] font-semibold text-[#1071b5] text-[20.4px] tracking-[0] leading-[normal] flex-shrink-0 cursor-pointer"
          onClick={() => navigate("/vendor-dashboard")}
        >
          ShopSen - Espace Vendeur
        </div>

        <nav className="ml-auto flex items-center gap-6">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="h-10 px-6 bg-white rounded-lg border-[1.22px] border-[#33333333] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-sm hover:bg-gray-50"
          >
            Déconnexion
          </Button>
        </nav>
      </header>

      <div className="max-w-[900px] mx-auto px-12 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity"
        >
          <ArrowLeftIcon className="w-5 h-5 text-[#333333]" />
          <span className="[text-shadow:0px_1.7px_21.63px_#0000000a] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-[17px] tracking-[0] leading-[normal]">
            Retour
          </span>
        </button>

        <div className="flex items-center gap-3 mb-8">
          <Store className="w-8 h-8 text-[#1071b5]" />
          <h1 className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-3xl tracking-[0] leading-[normal]">
            Profil Vendeur
          </h1>
        </div>

        <div className="flex flex-col gap-6">
          <Card className="bg-[#f5f6f6] rounded-[20px] shadow-[0px_2px_5.8px_1px_#0000001a] border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-xl tracking-[0] leading-[normal]">
                  Informations de la boutique
                </h2>
                {!editing && (
                  <Button
                    onClick={() => setEditing(true)}
                    variant="outline"
                    className="h-10 px-6 bg-white rounded-lg border-[1.22px] border-[#33333333] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-sm"
                  >
                    Modifier
                  </Button>
                )}
              </div>

              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-medium text-[#333333] text-sm tracking-[0] leading-[normal]">
                      Nom de la boutique
                    </label>
                    <Input
                      type="text"
                      value={formData.nomBoutique}
                      onChange={(e) =>
                        setFormData({ ...formData, nomBoutique: e.target.value })
                      }
                      disabled={!editing}
                      className="h-12 bg-white rounded-lg border border-[#33333333] disabled:opacity-60"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-medium text-[#333333] text-sm tracking-[0] leading-[normal]">
                        Nom du vendeur
                      </label>
                      <Input
                        type="text"
                        value={formData.nom}
                        onChange={(e) =>
                          setFormData({ ...formData, nom: e.target.value })
                        }
                        disabled={!editing}
                        className="h-12 bg-white rounded-lg border border-[#33333333] disabled:opacity-60"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-medium text-[#333333] text-sm tracking-[0] leading-[normal]">
                        Email
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        disabled
                        className="h-12 bg-gray-100 rounded-lg border border-[#33333333] opacity-60 cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-medium text-[#333333] text-sm tracking-[0] leading-[normal]">
                      Téléphone
                    </label>
                    <Input
                      type="tel"
                      value={formData.telephone}
                      onChange={(e) =>
                        setFormData({ ...formData, telephone: e.target.value })
                      }
                      disabled={!editing}
                      className="h-12 bg-white rounded-lg border border-[#33333333] disabled:opacity-60"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-medium text-[#333333] text-sm tracking-[0] leading-[normal]">
                      Bio / Description
                    </label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) =>
                        setFormData({ ...formData, bio: e.target.value })
                      }
                      disabled={!editing}
                      rows={4}
                      className="p-3 bg-white rounded-lg border border-[#33333333] disabled:opacity-60 [font-family:'Inter',Helvetica] text-[#333333] text-sm resize-none"
                      placeholder="Décrivez votre boutique et vos produits..."
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-medium text-[#333333] text-sm tracking-[0] leading-[normal]">
                      URL de la photo de profil
                    </label>
                    <Input
                      type="url"
                      value={formData.photoUrl}
                      onChange={(e) =>
                        setFormData({ ...formData, photoUrl: e.target.value })
                      }
                      disabled={!editing}
                      className="h-12 bg-white rounded-lg border border-[#33333333] disabled:opacity-60"
                      placeholder="https://exemple.com/photo.jpg"
                    />
                  </div>

                  {formData.photoUrl && (
                    <div className="flex flex-col gap-2">
                      <label className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-medium text-[#333333] text-sm tracking-[0] leading-[normal]">
                        Aperçu de la photo
                      </label>
                      <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={formData.photoUrl}
                          alt="Photo de profil"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder.png";
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {editing && (
                    <div className="flex gap-3">
                      <Button
                        type="submit"
                        disabled={loading}
                        className="flex-1 h-12 bg-[#1071b5] rounded-[26.24px] shadow-[0px_3px_14.77px_#00000040] [font-family:'Inter',Helvetica] font-semibold text-white text-base hover:bg-[#0d5a94] disabled:opacity-50"
                      >
                        {loading ? "Enregistrement..." : "Enregistrer"}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setEditing(false)}
                        className="flex-1 h-12 bg-white rounded-[26.24px] border-[1.22px] border-[#33333333] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-base"
                      >
                        Annuler
                      </Button>
                    </div>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="bg-[#f5f6f6] rounded-[20px] shadow-[0px_2px_5.8px_1px_#0000001a] border-0">
            <CardContent className="p-6">
              <h2 className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-xl tracking-[0] leading-[normal] mb-6">
                Liens rapides
              </h2>

              <div className="flex flex-col gap-3">

                <Button
                  variant="outline"
                  onClick={() => navigate("/reviews")}
                  className="w-full h-12 justify-start bg-white rounded-lg border-[1.22px] border-[#33333333] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-base hover:bg-gray-50"
                >
                  Mes avis
                </Button>

                <Button
                  variant="outline"
                  className="w-full h-12 justify-start bg-white rounded-lg border-[1.22px] border-[#33333333] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-base hover:bg-gray-50"
                >
                  Changer le mot de passe
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
