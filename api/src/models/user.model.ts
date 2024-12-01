export enum Gender {
  Male = 'm',
  Female = 'f',
  Others = 'o',
}

export enum Role {
  SuperAdmin = 'super_admin',
  ArtistManager = 'artist_manager',
  Artist = 'artist',
}

export interface User {
  id?: string;

  firstName: string;

  lastName: string;

  email: string;

  password?: string;

  phone: string;

  dob: Date;

  gender: Gender;

  role: Role;

  address: string;
}
