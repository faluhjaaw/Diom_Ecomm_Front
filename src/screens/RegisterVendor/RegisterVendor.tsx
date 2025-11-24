import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardContent } from "../../components/ui/card";
import { authService } from "../../services/auth.service";
import { Store } from "lucide-react";

type Step = "email" | "otp" | "complete";

export const RegisterVendor = (): JSX.Element => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    password: "",
    confirmPassword: "",
    telephone: "",
    adresse: "",
    role: "VENDEUR" as "ADMIN" | "CUSTOMER" | "VENDEUR",
  });

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await authService.register1(email);
      setStep("otp");
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors de l'envoi du code");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await authService.verify(email, otp);
      setStep("complete");
    } catch (err: any) {
      setError(err.response?.data?.message || "Code incorrect");
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    if (formData.password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }

    setLoading(true);

    try {
      await authService.register2({
        prenom: formData.prenom,
        nom: formData.nom,
        email,
        password: formData.password,
        telephone: formData.telephone,
        adresse: formData.adresse,
        role: formData.role,
      });
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  const renderEmailStep = () => (
    <form onSubmit={handleSendOTP} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-medium text-[#333333] text-sm tracking-[0] leading-[normal]">
          Adresse email professionnelle
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

      <Button
        type="submit"
        disabled={loading}
        className="w-full h-12 bg-[#1071b5] rounded-[26.24px] shadow-[0px_3px_14.77px_#00000040] [text-shadow:0px_1.7px_21.63px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-white text-base tracking-[0] leading-[normal] hover:bg-[#0d5a94] disabled:opacity-50"
      >
        {loading ? "Envoi..." : "Envoyer le code de vérification"}
      </Button>
    </form>
  );

  const renderOTPStep = () => (
    <form onSubmit={handleVerifyOTP} className="flex flex-col gap-6">
      <div className="mb-4">
        <p className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-normal text-[#333333] text-sm tracking-[0] leading-[normal]">
          Un code de vérification a été envoyé à <strong>{email}</strong>
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-medium text-[#333333] text-sm tracking-[0] leading-[normal]">
          Code de vérification
        </label>
        <Input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="000000"
          required
          maxLength={6}
          className="h-12 bg-white rounded-lg border border-[#33333333] shadow-[0px_2px_5px_#0000001a] [font-family:'Inter',Helvetica] text-[#333333] text-center text-xl tracking-widest"
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full h-12 bg-[#1071b5] rounded-[26.24px] shadow-[0px_3px_14.77px_#00000040] [text-shadow:0px_1.7px_21.63px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-white text-base tracking-[0] leading-[normal] hover:bg-[#0d5a94] disabled:opacity-50"
      >
        {loading ? "Vérification..." : "Vérifier le code"}
      </Button>

      <button
        type="button"
        onClick={() => setStep("email")}
        className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-medium text-[#1071b5] text-sm tracking-[0] leading-[normal] hover:underline"
      >
        Modifier l'email
      </button>
    </form>
  );

  const renderCompleteStep = () => (
    <form onSubmit={handleCompleteRegistration} className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-medium text-[#333333] text-sm tracking-[0] leading-[normal]">
            Prénom
          </label>
          <Input
            type="text"
            value={formData.prenom}
            onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
            placeholder="Prénom"
            required
            className="h-12 bg-white rounded-lg border border-[#33333333] shadow-[0px_2px_5px_#0000001a] [font-family:'Inter',Helvetica] text-[#333333]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-medium text-[#333333] text-sm tracking-[0] leading-[normal]">
            Nom
          </label>
          <Input
            type="text"
            value={formData.nom}
            onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
            placeholder="Nom"
            required
            className="h-12 bg-white rounded-lg border border-[#33333333] shadow-[0px_2px_5px_#0000001a] [font-family:'Inter',Helvetica] text-[#333333]"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-medium text-[#333333] text-sm tracking-[0] leading-[normal]">
          Téléphone professionnel
        </label>
        <Input
          type="tel"
          value={formData.telephone}
          onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
          placeholder="+221 XX XXX XX XX"
          required
          className="h-12 bg-white rounded-lg border border-[#33333333] shadow-[0px_2px_5px_#0000001a] [font-family:'Inter',Helvetica] text-[#333333]"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-medium text-[#333333] text-sm tracking-[0] leading-[normal]">
          Adresse de la boutique
        </label>
        <Input
          type="text"
          value={formData.adresse}
          onChange={(e) => setFormData({ ...formData, adresse: e.target.value })}
          placeholder="Adresse complète de votre boutique"
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
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          placeholder="••••••••"
          required
          minLength={6}
          className="h-12 bg-white rounded-lg border border-[#33333333] shadow-[0px_2px_5px_#0000001a] [font-family:'Inter',Helvetica] text-[#333333]"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-medium text-[#333333] text-sm tracking-[0] leading-[normal]">
          Confirmer le mot de passe
        </label>
        <Input
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          placeholder="••••••••"
          required
          minLength={6}
          className="h-12 bg-white rounded-lg border border-[#33333333] shadow-[0px_2px_5px_#0000001a] [font-family:'Inter',Helvetica] text-[#333333]"
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full h-12 bg-[#1071b5] rounded-[26.24px] shadow-[0px_3px_14.77px_#00000040] [text-shadow:0px_1.7px_21.63px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-white text-base tracking-[0] leading-[normal] hover:bg-[#0d5a94] disabled:opacity-50"
      >
        {loading ? "Inscription..." : "Créer mon compte vendeur"}
      </Button>
    </form>
  );

  return (
    <div className="min-h-screen bg-[#f5f6f6] flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-[580px] bg-white rounded-[20px] shadow-[0px_2px_5.8px_1px_#0000001a] border-0">
        <CardContent className="p-12">
          <div className="flex flex-col items-center mb-8">
            <div className="w-[60px] h-[60px] bg-[#1071b5] rounded-[30px] shadow-[0px_1.7px_9.84px_#00000026] mb-4 flex items-center justify-center">
              <Store className="w-8 h-8 text-white" />
            </div>
            <h1 className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#1071b5] text-[32px] tracking-[0] leading-[normal]">
              ShopSen
            </h1>
            <p className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-medium text-[#333333] text-base mt-2">
              Espace Vendeur
            </p>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step === "email" ? "bg-[#1071b5]" : "bg-[#86dcff]"}`}>
                <span className="text-white font-semibold">1</span>
              </div>
              <div className={`h-1 w-16 ${step !== "email" ? "bg-[#86dcff]" : "bg-gray-300"}`} />
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step === "otp" ? "bg-[#1071b5]" : step === "complete" ? "bg-[#86dcff]" : "bg-gray-300"}`}>
                <span className={`${step === "email" ? "text-gray-500" : "text-white"} font-semibold`}>2</span>
              </div>
              <div className={`h-1 w-16 ${step === "complete" ? "bg-[#86dcff]" : "bg-gray-300"}`} />
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step === "complete" ? "bg-[#1071b5]" : "bg-gray-300"}`}>
                <span className={`${step !== "complete" ? "text-gray-500" : "text-white"} font-semibold`}>3</span>
              </div>
            </div>
          </div>

          <h2 className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-2xl tracking-[0] leading-[normal] mb-2 text-center">
            {step === "email" && "Devenir Vendeur"}
            {step === "otp" && "Vérification"}
            {step === "complete" && "Informations professionnelles"}
          </h2>

          <p className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-normal text-[#333333] text-[13px] tracking-[0] leading-[normal] mb-8 text-center">
            {step === "email" && "Rejoignez notre plateforme et vendez vos produits"}
            {step === "otp" && "Entrez le code reçu par email"}
            {step === "complete" && "Complétez votre profil vendeur"}
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {step === "email" && renderEmailStep()}
          {step === "otp" && renderOTPStep()}
          {step === "complete" && renderCompleteStep()}

          <div className="mt-8 text-center">
            <p className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-normal text-[#333333] text-sm tracking-[0] leading-[normal]">
              Vous avez déjà un compte?{" "}
              <button
                onClick={() => navigate("/login")}
                className="[font-family:'Inter',Helvetica] font-medium text-[#1071b5] hover:underline"
              >
                Se connecter
              </button>
            </p>
            <p className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-normal text-[#333333] text-sm tracking-[0] leading-[normal] mt-2">
              Vous êtes un client?{" "}
              <button
                onClick={() => navigate("/register")}
                className="[font-family:'Inter',Helvetica] font-medium text-[#1071b5] hover:underline"
              >
                Créer un compte client
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
