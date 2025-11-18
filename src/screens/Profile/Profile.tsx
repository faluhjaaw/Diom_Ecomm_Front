import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardContent } from "../../components/ui/card";
import { authService } from "../../services/auth.service";

export const Profile = (): JSX.Element => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    adresse: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // TODO: Charger les données utilisateur depuis le backend
    // Pour l'instant, données fictives
    setFormData({
      prenom: "Prénom",
      nom: "Nom",
      email: "user@example.com",
      telephone: "+221 XX XXX XX XX",
      adresse: "Adresse complète",
    });
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await authService.logout(token);
      }
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.error("Erreur déconnexion:", error);
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: Implémenter la mise à jour du profil
      alert("Profil mis à jour avec succès");
      setEditing(false);
    } catch (error) {
      console.error("Erreur mise à jour profil:", error);
      alert("Erreur lors de la mise à jour");
    } finally {
      setLoading(false);
    }
  };

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

        <nav className="ml-auto flex items-center gap-6">
          <button
            onClick={() => navigate("/orders")}
            className="[text-shadow:0px_1.7px_21.63px_#0000000a] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-[17px] hover:text-[#1071b5]"
          >
            Mes commandes
          </button>
          <button
            onClick={() => navigate("/cart")}
            className="[text-shadow:0px_1.7px_21.63px_#0000000a] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-[17px] hover:text-[#1071b5]"
          >
            Panier
          </button>
        </nav>
      </header>

      <div className="max-w-[800px] mx-auto px-12 py-8">
        <h1 className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-3xl tracking-[0] leading-[normal] mb-8">
          Mon Profil
        </h1>

        <div className="flex flex-col gap-6">
          <Card className="bg-[#f5f6f6] rounded-[20px] shadow-[0px_2px_5.8px_1px_#0000001a] border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-xl tracking-[0] leading-[normal]">
                  Informations personnelles
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
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-medium text-[#333333] text-sm tracking-[0] leading-[normal]">
                        Prénom
                      </label>
                      <Input
                        type="text"
                        value={formData.prenom}
                        onChange={(e) =>
                          setFormData({ ...formData, prenom: e.target.value })
                        }
                        disabled={!editing}
                        className="h-12 bg-white rounded-lg border border-[#33333333] disabled:opacity-60"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-medium text-[#333333] text-sm tracking-[0] leading-[normal]">
                        Nom
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
                    <p className="text-xs text-gray-500">
                      L'email ne peut pas être modifié
                    </p>
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
                      Adresse
                    </label>
                    <Input
                      type="text"
                      value={formData.adresse}
                      onChange={(e) =>
                        setFormData({ ...formData, adresse: e.target.value })
                      }
                      disabled={!editing}
                      className="h-12 bg-white rounded-lg border border-[#33333333] disabled:opacity-60"
                    />
                  </div>

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
                  onClick={() => navigate("/orders")}
                  className="w-full h-12 justify-start bg-white rounded-lg border-[1.22px] border-[#33333333] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-base hover:bg-gray-50"
                >
                  Mes commandes
                </Button>

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

          <Card className="bg-red-50 rounded-[20px] shadow-[0px_2px_5.8px_1px_#0000001a] border border-red-200">
            <CardContent className="p-6">
              <h2 className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-red-700 text-xl tracking-[0] leading-[normal] mb-4">
                Zone dangereuse
              </h2>

              <Button
                onClick={handleLogout}
                className="w-full h-12 bg-red-600 rounded-[26.24px] shadow-[0px_3px_14.77px_#00000040] [font-family:'Inter',Helvetica] font-semibold text-white text-base hover:bg-red-700"
              >
                Se déconnecter
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};