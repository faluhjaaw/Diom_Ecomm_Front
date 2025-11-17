import { ChevronDownIcon, SearchIcon } from "lucide-react";
import React from "react";
import { Input } from "../../../../components/ui/input";

const navigationItems = [
  { label: "Category", hasDropdown: true },
  { label: "Deals", hasDropdown: false },
  { label: "Nouveautes", hasDropdown: false },
];

export const OffersSection = (): JSX.Element => {
  return (
    <header className="w-full h-[85px] flex items-center bg-white px-7 gap-3">
      <div className="w-[38.16px] h-[38.16px] bg-[#1071b5] rounded-[19.08px] shadow-[0px_1.7px_9.84px_#00000026] flex-shrink-0" />

      <div className="[text-shadow:0px_1.7px_21.63px_#0000000a] [font-family:'Inter',Helvetica] font-semibold text-[#1071b5] text-[20.4px] tracking-[0] leading-[normal] flex-shrink-0">
        ShopSen
      </div>

      <nav className="flex items-center gap-10 ml-[55px]">
        {navigationItems.map((item, index) => (
          <div key={index} className="flex items-center gap-[3.6px]">
            <button className="[text-shadow:0px_1.7px_21.63px_#0000000a] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-[17px] tracking-[0] leading-[normal] hover:text-[#1071b5] transition-colors">
              {item.label}
            </button>
            {item.hasDropdown && (
              <ChevronDownIcon className="w-[25.01px] h-[16.11px] text-[#333333]" />
            )}
          </div>
        ))}
      </nav>

      <div className="relative ml-[70px] flex-shrink-0">
        <div className="w-[370.06px] h-[52.47px] shadow-[0px_3px_14.77px_#00000040] rounded-[26.24px]">
          <Input
            type="text"
            placeholder="Recherchez un produit..."
            className="w-full h-full bg-white rounded-[26.24px] border-0 pl-[29px] pr-[60px] [font-family:'Montserrat',Helvetica] font-semibold text-[10.5px] placeholder:text-[#c2c6cc]"
          />
          <SearchIcon className="absolute top-1/2 right-[20px] -translate-y-1/2 w-[18px] h-[18px] text-[#333333]" />
        </div>
      </div>

      <div className="flex items-center gap-[11px] ml-auto">
        <img
          className="w-[22.05px] h-[25.07px] object-cover"
          alt="Profile"
          src="/profiiile-1.png"
        />
        <button className="[text-shadow:0px_1.7px_21.63px_#0000000a] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-[17px] tracking-[0] leading-[normal] hover:text-[#1071b5] transition-colors">
          Compte
        </button>
      </div>

      <div className="flex items-center gap-[5.7px] ml-[30.9px]">
        <img
          className="w-[29.62px] h-[26px] object-cover"
          alt="Cart"
          src="/carrt-1.png"
        />
        <button className="[text-shadow:0px_1.7px_21.63px_#0000000a] [font-family:'Inter',Helvetica] font-semibold text-[#333333] text-[17px] tracking-[0] leading-[normal] hover:text-[#1071b5] transition-colors">
          Panier
        </button>
      </div>
    </header>
  );
};
