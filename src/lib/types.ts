export type Review = {
  id: string;
  author: string;
  title: string;
  body: string;
  rating: 1 | 2 | 3 | 4 | 5;
  createdAt: string; // ISO date
};

export type Company = {
  name: string;
  domain: string;
  category: string;
  description: string;
  website: string;
  address: string;
};
