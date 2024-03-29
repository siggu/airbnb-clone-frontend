export interface IRoomPhotoPhoto {
  pk: string;
  file: string;
  description: string;
}

export interface IRoomList {
  pk: number;
  name: string;
  country: string;
  city: string;
  price: number;
  rating: number | string;
  is_owner: boolean;
  photos: IRoomPhotoPhoto[];
}

export interface IExperienceList {
  pk: number;
  name: string;
  country: string;
  city: string;
  price: number;
  rating: number | string;
  is_host: boolean;
  photos: IRoomPhotoPhoto[];
}

export interface IRoomOwner {
  name: string;
  avatar: string;
  username: string;
}

export interface IAmenity {
  pk: number;
  name: string;
  description: string;
}

export interface ICategory {
  pk: number;
  name: string;
  kind: string;
}

export interface IPerk {
  pk: number;
  name: string;
  detail: string;
  explanation: string;
}

export interface IRoomDetail extends IRoomList {
  created_at: string;
  updated_at: string;
  rooms: number;
  toilets: number;
  description: string;
  address: string;
  pet_friendly: boolean;
  kind: string;
  is_owner: boolean;
  is_liked: boolean;
  category: ICategory;
  owner: IRoomOwner;
  amenities: IAmenity[];
}

export interface IExperienceDetail extends IExperienceList {
  created_at: string;
  updated_at: string;
  address: string;
  pet_friendly: boolean;
  is_host: boolean;
  is_liked: boolean;
  start: TimeRanges;
  end: TimeRanges;
  category: ICategory;
  host: IRoomOwner;
  perks: IPerk[];
}

export interface IReview {
  payload: string;
  rating: number | string;
  user: IRoomOwner;
}

export interface IUser {
  last_login: string;
  username: string;
  email: string;
  date_joined: string;
  avatar: string;
  name: string;
  is_host: boolean;
  gender: string;
  language: string;
  currency: string;
}
