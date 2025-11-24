import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardContent } from "../../components/ui/card";
import { authService } from "../../services/auth.service";
import { userService } from "../../services/user.service";

export const Login = (): JSX.Element => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data } = await authService.login(email, password);
      localStorage.setItem("token", data.token);
      localStorage.setItem("userEmail", email);

      // Récupérer les informations de l'utilisateur pour obtenir son rôle
      const { data: userData } = await userService.getUserByEmail(email);
      localStorage.setItem("userRole", userData.role);

      // Rediriger selon le rôle
      if (userData.role === "VENDEUR") {
        navigate("/vendor-dashboard");
      } else {
        navigate("/");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Email ou mot de passe incorrect");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f6f6] flex items-center justify-center px-4">
      <Card className="w-full max-w-[480px] bg-white rounded-[20px] shadow-[0px_2px_5.8px_1px_#0000001a] border-0">
        <CardContent className="p-12">
          <div className="flex flex-col items-center mb-8">
            <div className="w-[60px] h-[60px] bg-[#1071b5] rounded-[30px] shadow-[0px_1.7px_9.84px_#00000026] mb-4" />
            <h1 className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#1071b5] text-[32px] tracking-[0] leading-[normal]">
              ShopSen
            </h1>
          </div>

          <h2 className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-2xl tracking-[0] leading-[normal] mb-2 text-center">
            Connexion
          </h2>

          <p className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-normal text-[#333333] text-[13px] tracking-[0] leading-[normal] mb-8 text-center">
            Accédez à votre compte ShopSen
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-medium text-[#333333] text-sm tracking-[0] leading-[normal]">
                Email
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votreemail@exemple.com"
                required
                className="h-12 bg-white rounded-lg border border-[#33333333] shadow-[0px_2px_5px_#0000001a] [font-family:'Inter',Helvetica] text-[#333333]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-medium text-[#333333] text-sm tracking-[0] leading-[normal]">
                Mot de passe
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="h-12 bg-white rounded-lg border border-[#33333333] shadow-[0px_2px_5px_#0000001a] [font-family:'Inter',Helvetica] text-[#333333]"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-[#33333333]" />
                <span className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-normal text-[#333333] text-sm tracking-[0] leading-[normal]">
                  Se souvenir de moi
                </span>
              </label>

              <button
                type="button"
                className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-medium text-[#1071b5] text-sm tracking-[0] leading-[normal] hover:underline"
              >
                Mot de passe oublié?
              </button>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-[#1071b5] rounded-[26.24px] shadow-[0px_3px_14.77px_#00000040] [text-shadow:0px_1.7px_21.63px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-white text-base tracking-[0] leading-[normal] hover:bg-[#0d5a94] disabled:opacity-50"
            >
              {loading ? "Connexion..." : "Se connecter"}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-normal text-[#333333] text-sm tracking-[0] leading-[normal]">
              Vous n'avez pas de compte?{" "}
              <button
                onClick={() => navigate("/register")}
                className="[font-family:'Inter',Helvetica] font-medium text-[#1071b5] hover:underline"
              >
                S'inscrire
              </button>
            </p>
            <p className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-normal text-[#333333] text-sm tracking-[0] leading-[normal] mt-2">
              Vous êtes un vendeur?{" "}
              <button
                onClick={() => navigate("/register-vendeur")}
                className="[font-family:'Inter',Helvetica] font-medium text-[#1071b5] hover:underline"
              >
                Créer un compte vendeur
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};