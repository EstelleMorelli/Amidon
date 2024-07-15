export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  created_at: string;
  updated_at: null | string;
  media: { url: undefined | string }[];
}

export interface IFriendProduct {
  firstname: string;
  id: number;
  lastname: string;
  color: string;
  picture: string;
  own_products: null | IProduct[];
}

export interface ICurrentProduct {
  booker: null | {
    id: number;
    firstname: string;
    lastname: string;
    color: string;
    picture: string | null;
  };
  id: number;
  title: string;
  description: string;
  price: number | string;
  created_at: string;
  updated_at: null | string;
  media: { url: undefined | string }[];
  owner: {
    firstname: string;
    id: number;
    lastname: string;
    picture: string | null;
  };
}

export interface ISelfProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  created_at: string;
  updated_at: null | string;
  booker: null | {
    id: number;
    firstname: string;
    lastname: string;
    picture: string | undefined;
    color: string;
  };
  media: { url: undefined | string }[];
}
