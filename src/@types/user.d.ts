export interface IUser {
  id: number;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  picture: string | null;
  description: string;
  color: string;
  share_code: string;
}

export interface IFriend {
  giver_id: null | number;
  firstname: string;
  lastname: string;
  share_code: string;
  picture: string;
  color: string;
}
