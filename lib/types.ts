
export type Home = {
    title: string;
    description: string;
    price: string;
    image: File | null;
    location: []
    category: string;
    offers: string[];
    guests: number;
    rooms: number;
    bathrooms: number;
}




 export interface InputFieldProps {

    id: string;
  
    label: string;
  
    type: string;
  
    placeholder: string;
  
    value: string;
  
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  
  }

  