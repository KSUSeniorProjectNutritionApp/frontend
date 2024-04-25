import React, {createContext, useState, useContext, ReactNode} from 'react';

type AllergyToggles = {
  milk: boolean;
  eggs: boolean;
  fish: boolean;
  shellfish: boolean;
  tree_Nuts: boolean;
  peanuts: boolean;
  wheat: boolean;
  soy: boolean;
};

type AllergyContextType = {
  allergyToggles: AllergyToggles;
  setAllergyToggles: React.Dispatch<React.SetStateAction<AllergyToggles>>;
};

const AllergySettingsContext = createContext<AllergyContextType | undefined>(
  undefined,
);

export const AllergySettingsProvider: React.FC<{children: ReactNode}> = ({
  children,
}) => {
  const [allergyToggles, setAllergyToggles] = useState<AllergyToggles>({
    milk: false,
    eggs: false,
    fish: false,
    shellfish: false,
    tree_Nuts: false,
    peanuts: false,
    wheat: false,
    soy: false,
  });

  return (
    <AllergySettingsContext.Provider
      value={{allergyToggles, setAllergyToggles}}>
      {children}
    </AllergySettingsContext.Provider>
  );
};

export const useAllergySettings = () => {
  const context = useContext(AllergySettingsContext);
  if (!context) {
    throw new Error(
      'useAllergySettings must be used within a AllergySettingsProvider',
    );
  }
  return context;
};
