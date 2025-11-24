import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { categoryService } from "../../services/category.service";
import { userService } from "../../services/user.service";
import { Category } from "../../types";
import { Store, ArrowLeft, ArrowRight, CheckCircle, Upload, Plus, X } from "lucide-react";

interface ProductFormData {
  name: string;
  description: string;
  price: string;
  stock: string;
  brand: string;
  condition: "NEW" | "USED" | "REFURBISHED";
  tags: string[];
  imageUrls: string[];
  specifications: Record<string, string>;
}

export const AddProduct = (): JSX.Element => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");
  const [vendorId, setVendorId] = useState<number | null>(null);

  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    price: "",
    stock: "",
    brand: "",
    condition: "NEW",
    tags: [],
    imageUrls: [],
    specifications: {}
  });

  const [newTag, setNewTag] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [specKey, setSpecKey] = useState("");
  const [specValue, setSpecValue] = useState("");

  useEffect(() => {
    loadCategories();
    loadVendorId();
  }, []);

  const loadVendorId = async () => {
    try {
      const userEmail = localStorage.getItem("userEmail");
      if (!userEmail) {
        navigate("/login");
        return;
      }
      const { data: userData } = await userService.getUserByEmail(userEmail);
      setVendorId(userData.id);
    } catch (error) {
      console.error("Erreur chargement vendeur:", error);
    }
  };

  const loadCategories = async () => {
    try {
      const { data } = await categoryService.getAll();
      const parentCategories = data.filter((cat: Category) => !cat.parentId);
      setCategories(parentCategories);
    } catch (error) {
      console.error("Erreur chargement catégories:", error);
    }
  };

  const handleCategorySelect = async (categoryId: string) => {
    setSelectedCategory(categoryId);
    try {
      const { data } = await categoryService.getAll();
      console.log("Toutes les catégories:", data);
      console.log("Catégorie sélectionnée:", categoryId);

      const subs = data.filter((cat: Category) => cat.parentId === categoryId);
      console.log("Sous-catégories trouvées:", subs);

      // Si aucune sous-catégorie n'est trouvée, créer des données de démonstration
      if (subs.length === 0) {
        const selectedCat = data.find((cat: Category) => cat.id === categoryId);
        const mockSubCategories: Category[] = [
          {
            id: `${categoryId}-sub-1`,
            name: `${selectedCat?.name || 'Catégorie'} - Premium`,
            description: "Produits haut de gamme",
            parentId: categoryId
          },
          {
            id: `${categoryId}-sub-2`,
            name: `${selectedCat?.name || 'Catégorie'} - Standard`,
            description: "Produits de qualité standard",
            parentId: categoryId
          },
          {
            id: `${categoryId}-sub-3`,
            name: `${selectedCat?.name || 'Catégorie'} - Économique`,
            description: "Produits à prix abordable",
            parentId: categoryId
          },
          {
            id: `${categoryId}-sub-4`,
            name: `${selectedCat?.name || 'Catégorie'} - Pro`,
            description: "Produits professionnels",
            parentId: categoryId
          }
        ];
        setSubCategories(mockSubCategories);
        console.log("Sous-catégories simulées créées:", mockSubCategories);
      } else {
        setSubCategories(subs);
      }
    } catch (error) {
      console.error("Erreur chargement sous-catégories:", error);
    }
  };

  const handleSubCategorySelect = (subCategoryId: string) => {
    setSelectedSubCategory(subCategoryId);
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, newTag.trim()] });
      setNewTag("");
    }
  };

  const removeTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) });
  };

  const addImageUrl = () => {
    if (newImageUrl.trim() && !formData.imageUrls.includes(newImageUrl.trim())) {
      setFormData({ ...formData, imageUrls: [...formData.imageUrls, newImageUrl.trim()] });
      setNewImageUrl("");
    }
  };

  const removeImageUrl = (url: string) => {
    setFormData({ ...formData, imageUrls: formData.imageUrls.filter(u => u !== url) });
  };

  const addSpecification = () => {
    if (specKey.trim() && specValue.trim()) {
      setFormData({
        ...formData,
        specifications: { ...formData.specifications, [specKey.trim()]: specValue.trim() }
      });
      setSpecKey("");
      setSpecValue("");
    }
  };

  const removeSpecification = (key: string) => {
    const newSpecs = { ...formData.specifications };
    delete newSpecs[key];
    setFormData({ ...formData, specifications: newSpecs });
  };

  const handleNextStep = () => {
    if (step === 1 && !selectedCategory) {
      alert("Veuillez sélectionner une catégorie");
      return;
    }
    if (step === 2 && !selectedSubCategory) {
      alert("Veuillez sélectionner une sous-catégorie");
      return;
    }
    setStep(step + 1);
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.description || !formData.price || !formData.stock || !formData.brand) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }

    if (formData.imageUrls.length === 0) {
      alert("Veuillez ajouter au moins une image");
      return;
    }

    // Générer un ID unique pour le produit
    const productId = `product-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const productData = {
      id: productId,
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      brand: formData.brand,
      condition: formData.condition,
      tags: formData.tags,
      imageUrls: formData.imageUrls,
      subCategoryId: selectedSubCategory,
      vendorId: vendorId,
      rating: 4.5, // Note par défaut
      specifications: formData.specifications
    };

    try {
      // Récupérer les produits existants du localStorage
      const existingProducts = localStorage.getItem("vendorProducts");
      let products = existingProducts ? JSON.parse(existingProducts) : [];

      // Ajouter le nouveau produit
      products.push(productData);

      // Sauvegarder dans le localStorage
      localStorage.setItem("vendorProducts", JSON.stringify(products));

      console.log("Produit créé:", productData);
      alert("Produit créé avec succès !");
      navigate("/vendor-dashboard");
    } catch (error) {
      console.error("Erreur lors de la création du produit:", error);
      alert("Erreur lors de la création du produit");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="w-full h-[85px] flex items-center bg-white px-20 gap-3 border-b border-gray-200">
        <div className="w-[38.16px] h-[38.16px] bg-[#1071b5] rounded-[19.08px] shadow-[0px_1.7px_9.84px_#00000026] flex-shrink-0 flex items-center justify-center">
          <Store className="w-5 h-5 text-white" />
        </div>
        <div className="[text-shadow:0px_1.7px_21.63px_#0000000a] [font-family:'Inter',Helvetica] font-semibold text-[#1071b5] text-[20.4px] tracking-[0] leading-[normal] flex-shrink-0">
          ShopSen - Ajouter un produit
        </div>
        <Button
          variant="outline"
          onClick={() => navigate("/vendor-dashboard")}
          className="ml-auto flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour au tableau de bord
        </Button>
      </header>

      <div className="max-w-[1000px] mx-auto px-12 py-8">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center flex-1">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-[#1071b5]' : 'bg-gray-300'}`}>
                {step > 1 ? <CheckCircle className="w-6 h-6 text-white" /> : <span className="text-white font-bold">1</span>}
              </div>
              <span className="[font-family:'Inter',Helvetica] font-medium text-[#333333] text-sm mt-2">Catégorie</span>
            </div>
            <div className={`flex-1 h-1 ${step >= 2 ? 'bg-[#1071b5]' : 'bg-gray-300'}`} />
            <div className="flex flex-col items-center flex-1">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-[#1071b5]' : 'bg-gray-300'}`}>
                {step > 2 ? <CheckCircle className="w-6 h-6 text-white" /> : <span className="text-white font-bold">2</span>}
              </div>
              <span className="[font-family:'Inter',Helvetica] font-medium text-[#333333] text-sm mt-2">Sous-catégorie</span>
            </div>
            <div className={`flex-1 h-1 ${step >= 3 ? 'bg-[#1071b5]' : 'bg-gray-300'}`} />
            <div className="flex flex-col items-center flex-1">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-[#1071b5]' : 'bg-gray-300'}`}>
                <span className="text-white font-bold">3</span>
              </div>
              <span className="[font-family:'Inter',Helvetica] font-medium text-[#333333] text-sm mt-2">Informations</span>
            </div>
          </div>
        </div>

        {/* Step 1: Category Selection */}
        {step === 1 && (
          <Card className="bg-white rounded-[20px] shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100">
            <CardContent className="p-8">
              <h2 className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-2xl tracking-[0] leading-[normal] mb-6">
                Sélectionnez une catégorie
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {categories.map((category) => (
                  <Card
                    key={category.id}
                    onClick={() => handleCategorySelect(category.id)}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      selectedCategory === category.id
                        ? 'bg-[#1071b5] text-white border-[#1071b5]'
                        : 'bg-white border-gray-200 hover:border-[#1071b5]'
                    }`}
                  >
                    <CardContent className="p-6 text-center">
                      <h3 className={`[font-family:'Inter',Helvetica] font-semibold text-lg ${
                        selectedCategory === category.id ? 'text-white' : 'text-[#333333]'
                      }`}>
                        {category.name}
                      </h3>
                      <p className={`[font-family:'Inter',Helvetica] font-normal text-sm mt-2 ${
                        selectedCategory === category.id ? 'text-white opacity-90' : 'text-gray-600'
                      }`}>
                        {category.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="flex justify-end mt-8">
                <Button
                  onClick={handleNextStep}
                  disabled={!selectedCategory}
                  className="bg-[#1071b5] hover:bg-[#0d5a94] text-white flex items-center gap-2"
                >
                  Suivant
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: SubCategory Selection */}
        {step === 2 && (
          <Card className="bg-white rounded-[20px] shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100">
            <CardContent className="p-8">
              <h2 className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-2xl tracking-[0] leading-[normal] mb-6">
                Sélectionnez une sous-catégorie
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {subCategories.map((subCategory) => (
                  <Card
                    key={subCategory.id}
                    onClick={() => handleSubCategorySelect(subCategory.id)}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      selectedSubCategory === subCategory.id
                        ? 'bg-[#1071b5] text-white border-[#1071b5]'
                        : 'bg-white border-gray-200 hover:border-[#1071b5]'
                    }`}
                  >
                    <CardContent className="p-6 text-center">
                      <h3 className={`[font-family:'Inter',Helvetica] font-semibold text-lg ${
                        selectedSubCategory === subCategory.id ? 'text-white' : 'text-[#333333]'
                      }`}>
                        {subCategory.name}
                      </h3>
                      <p className={`[font-family:'Inter',Helvetica] font-normal text-sm mt-2 ${
                        selectedSubCategory === subCategory.id ? 'text-white opacity-90' : 'text-gray-600'
                      }`}>
                        {subCategory.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="flex justify-between mt-8">
                <Button
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Précédent
                </Button>
                <Button
                  onClick={handleNextStep}
                  disabled={!selectedSubCategory}
                  className="bg-[#1071b5] hover:bg-[#0d5a94] text-white flex items-center gap-2"
                >
                  Suivant
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Product Information */}
        {step === 3 && (
          <Card className="bg-white rounded-[20px] shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100">
            <CardContent className="p-8">
              <h2 className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-2xl tracking-[0] leading-[normal] mb-6">
                Informations du produit
              </h2>

              <div className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="[font-family:'Inter',Helvetica] font-semibold text-[#333333] text-sm mb-2 block">
                      Nom du produit *
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ex: iPhone 14 Pro Max"
                      className="h-11"
                    />
                  </div>
                  <div>
                    <label className="[font-family:'Inter',Helvetica] font-semibold text-[#333333] text-sm mb-2 block">
                      Marque *
                    </label>
                    <Input
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      placeholder="Ex: Apple"
                      className="h-11"
                    />
                  </div>
                </div>

                <div>
                  <label className="[font-family:'Inter',Helvetica] font-semibold text-[#333333] text-sm mb-2 block">
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Description détaillée du produit..."
                    className="w-full h-32 px-3 py-2 border border-gray-200 rounded-lg [font-family:'Inter',Helvetica] text-sm focus:outline-none focus:ring-2 focus:ring-[#1071b5]"
                  />
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <label className="[font-family:'Inter',Helvetica] font-semibold text-[#333333] text-sm mb-2 block">
                      Prix (FCFA) *
                    </label>
                    <Input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="0"
                      className="h-11"
                    />
                  </div>
                  <div>
                    <label className="[font-family:'Inter',Helvetica] font-semibold text-[#333333] text-sm mb-2 block">
                      Stock *
                    </label>
                    <Input
                      type="number"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      placeholder="0"
                      className="h-11"
                    />
                  </div>
                  <div>
                    <label className="[font-family:'Inter',Helvetica] font-semibold text-[#333333] text-sm mb-2 block">
                      État *
                    </label>
                    <select
                      value={formData.condition}
                      onChange={(e) => setFormData({ ...formData, condition: e.target.value as any })}
                      className="w-full h-11 px-3 border border-gray-200 rounded-lg [font-family:'Inter',Helvetica] text-sm focus:outline-none focus:ring-2 focus:ring-[#1071b5]"
                    >
                      <option value="NEW">Neuf</option>
                      <option value="USED">Occasion</option>
                      <option value="REFURBISHED">Reconditionné</option>
                    </select>
                  </div>
                </div>

                {/* Images */}
                <div>
                  <label className="[font-family:'Inter',Helvetica] font-semibold text-[#333333] text-sm mb-2 block">
                    Images (URLs) *
                  </label>
                  <div className="flex gap-2 mb-3">
                    <Input
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                      placeholder="https://exemple.com/image.jpg"
                      className="h-11"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addImageUrl())}
                    />
                    <Button onClick={addImageUrl} className="bg-[#1071b5] hover:bg-[#0d5a94]">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.imageUrls.map((url, index) => (
                      <Badge key={index} className="bg-blue-100 text-blue-700 hover:bg-blue-100 px-3 py-2">
                        <Upload className="w-3 h-3 mr-1" />
                        Image {index + 1}
                        <X className="w-3 h-3 ml-2 cursor-pointer" onClick={() => removeImageUrl(url)} />
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="[font-family:'Inter',Helvetica] font-semibold text-[#333333] text-sm mb-2 block">
                    Tags
                  </label>
                  <div className="flex gap-2 mb-3">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Ex: smartphone, 5G, premium"
                      className="h-11"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    />
                    <Button onClick={addTag} className="bg-[#1071b5] hover:bg-[#0d5a94]">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, index) => (
                      <Badge key={index} className="bg-gray-100 text-gray-700 hover:bg-gray-100 px-3 py-2">
                        {tag}
                        <X className="w-3 h-3 ml-2 cursor-pointer" onClick={() => removeTag(tag)} />
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Specifications */}
                <div>
                  <label className="[font-family:'Inter',Helvetica] font-semibold text-[#333333] text-sm mb-2 block">
                    Spécifications techniques
                  </label>
                  <div className="flex gap-2 mb-3">
                    <Input
                      value={specKey}
                      onChange={(e) => setSpecKey(e.target.value)}
                      placeholder="Caractéristique (ex: RAM)"
                      className="h-11 flex-1"
                    />
                    <Input
                      value={specValue}
                      onChange={(e) => setSpecValue(e.target.value)}
                      placeholder="Valeur (ex: 8GB)"
                      className="h-11 flex-1"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSpecification())}
                    />
                    <Button onClick={addSpecification} className="bg-[#1071b5] hover:bg-[#0d5a94]">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {Object.entries(formData.specifications).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="[font-family:'Inter',Helvetica] font-semibold text-[#333333] text-sm">
                            {key}:
                          </span>
                          <span className="[font-family:'Inter',Helvetica] font-normal text-gray-600 text-sm">
                            {value}
                          </span>
                        </div>
                        <X className="w-4 h-4 text-red-500 cursor-pointer" onClick={() => removeSpecification(key)} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                <Button
                  onClick={() => setStep(2)}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Précédent
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 px-8"
                >
                  <CheckCircle className="w-4 h-4" />
                  Créer le produit
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
