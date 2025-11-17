import React from "react";
import { BestSellersSection } from "./sections/BestSellersSection";
import { BoutiqueSection } from "./sections/BoutiqueSection";
import { BrandShowcaseSection } from "./sections/BrandShowcaseSection";
import { CategorySection } from "./sections/CategorySection";
import { ComponentNodeSection } from "./sections/ComponentNodeSection";
import { DailyDealsSection } from "./sections/DailyDealsSection";
import { FeaturedProductsSection } from "./sections/FeaturedProductsSection";
import { HeroBannerSection } from "./sections/HeroBannerSection";
import { LandingPageSection } from "./sections/LandingPageSection";
import { OffersSection } from "./sections/OffersSection";
import { ProductGridSection } from "./sections/ProductGridSection";
import { PromotionsSection } from "./sections/PromotionsSection";
import { SpecialOffersSection } from "./sections/SpecialOffersSection";

const footerCategories = [
  { label: "Fashion" },
  { label: "Education" },
  { label: "Livres" },
  { label: "Jouets" },
  { label: "Meubles" },
];

const footerAboutUs = [
  { label: "Fashion" },
  { label: "Education" },
  { label: "Livres" },
  { label: "Jouets" },
  { label: "Meubles" },
];

const footerServices = [
  { label: "Carte cadeau" },
  { label: "Mobile App" },
  { label: "Shipping & delivery" },
  { label: "Order & Pickup" },
  { label: "Account Signup" },
];

const footerHelp = [
  { label: "Shopcart Help" },
  { label: "Returns" },
  { label: "Track Orders" },
  { label: "Contact us" },
  { label: "Feedback" },
];

const paymentMethods = [
  { src: "/image-18-2.png", alt: "Payment method 1" },
  { src: "/image-20.png", alt: "Payment method 2" },
  { src: "/image-20-2.png", alt: "Payment method 3" },
];

const socialLinks = [
  { label: "Deviens vendeur" },
  { label: "Deviens vendeur" },
  { label: "Deviens vendeur" },
];

export const Accueil = (): JSX.Element => {
  return (
    <div className="bg-white overflow-hidden w-full min-w-[1440px] flex flex-col">
      <OffersSection />
      <LandingPageSection />
      <CategorySection />
      <DailyDealsSection />
      <BrandShowcaseSection />
      <SpecialOffersSection />
      <PromotionsSection />
      <BoutiqueSection />
      <BestSellersSection />
      <FeaturedProductsSection />

      <section className="w-full px-[54px] py-8">
        <h2 className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-3xl tracking-[0] leading-[normal]">
          Des services pour vous aider à faire vos achats
        </h2>
      </section>

      <ProductGridSection />
      <ComponentNodeSection />
      <HeroBannerSection />

      <footer className="w-full px-[73px] py-12 flex flex-col gap-8">
        <div className="flex items-start gap-8">
          <div className="w-[38px] h-[38px] bg-[#1071b5] rounded-[19.08px] shadow-[0px_1.7px_9.84px_#00000026]" />
          <div className="flex-1">
            <h3 className="[text-shadow:0px_1.7px_21.63px_#0000000a] [font-family:'Inter',Helvetica] font-semibold text-[#1071b5] text-[20.4px] tracking-[0] leading-[normal] mb-4">
              ShopSen
            </h3>
            <p className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-normal text-[#333333] text-[13px] tracking-[0] leading-[normal]">
              perso xawma louma fiiy binde
            </p>
          </div>
        </div>

        <div className="flex gap-[159px]">
          <div className="flex flex-col gap-6">
            <h4 className="[text-shadow:0px_2.07px_26.41px_#0000000a] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-[15.9px] tracking-[0] leading-[normal] whitespace-nowrap">
              Categories
            </h4>
            <div className="flex flex-col gap-6">
              {footerCategories.map((item, index) => (
                <div
                  key={`category-${index}`}
                  className="[text-shadow:0px_2px_23px_#00000026] font-normal text-[13px] [font-family:'Inter',Helvetica] text-[#333333] tracking-[0] leading-[normal]"
                >
                  {item.label}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="[text-shadow:0px_2.07px_26.41px_#0000000a] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-[15.9px] tracking-[0] leading-[normal] whitespace-nowrap">
              About us
            </h4>
            <div className="flex flex-col gap-6">
              {footerAboutUs.map((item, index) => (
                <div
                  key={`about-${index}`}
                  className="[text-shadow:0px_2px_23px_#00000026] font-normal text-[13px] [font-family:'Inter',Helvetica] text-[#333333] tracking-[0] leading-[normal]"
                >
                  {item.label}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="[text-shadow:0px_2.07px_26.41px_#0000000a] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-[15.9px] tracking-[0] leading-[normal] whitespace-nowrap">
              Services
            </h4>
            <div className="flex flex-col gap-6">
              {footerServices.map((item, index) => (
                <div
                  key={`service-${index}`}
                  className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-normal text-[#333333] text-[13px] tracking-[0] leading-[normal]"
                >
                  {item.label}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="[text-shadow:0px_2.07px_26.41px_#0000000a] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-[15.9px] tracking-[0] leading-[normal] whitespace-nowrap">
              Help
            </h4>
            <div className="flex flex-col gap-6">
              {footerHelp.map((item, index) => (
                <div
                  key={`help-${index}`}
                  className="[text-shadow:0px_2px_23px_#00000026] [font-family:'Inter',Helvetica] font-normal text-[#333333] text-[13px] tracking-[0] leading-[normal]"
                >
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h4 className="[text-shadow:0px_2.07px_26.41px_#0000000a] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-[15.9px] tracking-[0] leading-[normal] whitespace-nowrap">
            Moyens de paiement acceptés
          </h4>
          <div className="flex gap-[27px]">
            <div className="w-20 h-[42px] rounded-[10px] flex bg-white overflow-hidden border-[1.22px] border-solid border-[#33333333] shadow-[0px_2.44px_7.45px_#0000001a]">
              <img
                className="mt-[5px] w-[30px] h-[31.68px] ml-[25px] object-cover"
                alt="Payment method"
                src="/image-18-2.png"
              />
            </div>
            <div className="w-20 h-[42px] bg-white rounded-[10px] border-[1.22px] border-solid border-[#33333333] shadow-[0px_2.44px_7.45px_#0000001a] flex items-center justify-center">
              <img
                className="w-6 h-7 object-cover"
                alt="Payment method"
                src="/image-20.png"
              />
            </div>
            <div className="w-20 h-[42px] flex bg-white rounded-[10px] overflow-hidden border-[1.22px] border-solid border-[#33333333] shadow-[0px_2.44px_7.45px_#0000001a]">
              <img
                className="mt-[9px] w-[46px] h-6 ml-[17px] object-cover"
                alt="Payment method"
                src="/image-20-2.png"
              />
            </div>
          </div>
          <div className="flex gap-[27px]">
            <div className="w-20 h-[42px] flex bg-white rounded-[10px] overflow-hidden border-[1.22px] border-solid border-[#33333333] shadow-[0px_2.44px_7.45px_#0000001a]">
              <img
                className="mt-[5px] w-[30px] h-[31.68px] ml-[25px] object-cover"
                alt="Payment method"
                src="/image-18-2.png"
              />
            </div>
            <div className="w-20 h-[42px] bg-white rounded-[10px] border-[1.22px] border-solid border-[#33333333] shadow-[0px_2.44px_7.45px_#0000001a] flex items-center justify-center">
              <img
                className="w-6 h-7 object-cover"
                alt="Payment method"
                src="/image-20.png"
              />
            </div>
            <div className="w-20 h-[42px] flex bg-white rounded-[10px] overflow-hidden border-[1.22px] border-solid border-[#33333333] shadow-[0px_2.44px_7.45px_#0000001a]">
              <img
                className="mt-[9px] w-[46px] h-6 ml-[17px] object-cover"
                alt="Payment method"
                src="/image-20-2.png"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-[205px] pt-8">
          {socialLinks.map((link, index) => (
            <div
              key={`social-${index}`}
              className="flex items-center gap-[35px]"
            >
              <div className="w-6 h-6 bg-[#1071b5] rounded-xl shadow-[0px_1.07px_6.19px_#00000026]" />
              <span className="[text-shadow:0px_2.07px_26.41px_#0000000a] [font-family:'Inter',Helvetica] font-medium text-[#333333] text-[15.9px] tracking-[0] leading-[normal] whitespace-nowrap">
                {link.label}
              </span>
            </div>
          ))}
          <div className="ml-auto [text-shadow:0px_2.07px_26.41px_#0000000a] [font-family:'Inter',Helvetica] font-medium text-[#333333] text-[15.9px] tracking-[0] leading-[normal] whitespace-nowrap">
            All rights reserved to MFD &amp; ASN
          </div>
        </div>
      </footer>
    </div>
  );
};
