
export type Home = {
    id: string;
    creator: string;
    title: string;
    description: string;
    price: string;
    image: File | null;
    location: {city: string; country: string};
    category: string;
    offers: string[];
    guests: number;
    rooms: number;
    bathrooms: number;
}


export interface SelectFieldProps {
    id: string;
    label: string;
    value: string;
    options: { value: string; label: string }[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  }

export interface CheckboxProps {
  
    id: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }

export interface OffersFieldProps {
    selectedOffers: string[];
    setSelectedOffers: React.Dispatch<React.SetStateAction<string[]>>;
  }

  export interface TextareaFieldProps {
    id: string;
    label: string;
    value: string;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  }

  export interface CounterProps {
    label: string;
    value: number;
    onChange: (count: number) => void;
  }




 export interface InputFieldProps {

    id: string;
  
    label: string;
  
    type: string 
  
    placeholder: string;
  
    value: string;
  
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  
  }

  