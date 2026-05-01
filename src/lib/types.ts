export interface Registration {
  id: number;
  name: string;
  phone: string;
  phone1: string;
  phone2: string;
  phone3: string;
  interest_type: string;
  age: string;
  city: string;
  district: string;
  dong: string;
  agreed: number;
  created_at: string;
  updated_at: string;
}

export interface RegistrationInput {
  name: string;
  phone1: string;
  phone2: string;
  phone3: string;
  interestType: string;
  age: string;
  city: string;
  district: string;
  dong: string;
  agreed: boolean;
}

export interface RegistrationListResponse {
  data: Registration[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface StatsResponse {
  totalRegistrations: number;
  todayRegistrations: number;
  byInterestType: { type: string; count: number }[];
  byAge: { age: string; count: number }[];
  byCity: { city: string; count: number }[];
  recentTrend: { date: string; count: number }[];
}
