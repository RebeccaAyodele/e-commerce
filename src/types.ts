type Dimensions = {
  width: number;
  height: number;
  depth: number
}

export type Review = {
  rating: number;
  comment: string;
  date: string; // ISO date string
  reviewerName: string;
  reviewerEmail: string;
};

export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tag: string[];
  brand: string;
  sku?: string;
  weight?: number;
   dimensions?: Dimensions
  warrantyInformation?: string;
  shippingInformation?: string;
  availabilityStatus?: string;
  reviews?: Review[];
  returnsPolicy?: string;
  minimumOrderQuantity?: number;
  images: string;
  thumbnail?: string;
  qrCode?: string;
}
