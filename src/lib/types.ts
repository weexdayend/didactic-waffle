export interface KiosEntry {
  id: string;
  nama: string;
  kategori: string;
}

export interface DistributorEntry {
  id: string;
  nama: string;
  kategori: string;
  kios: KiosEntry[];
}

export interface GudangEntry {
  id: string;
  nama: string;
  kategori: string;
  distributor: DistributorEntry[];
}

export interface KecamatanEntry {
  id: string;
  nama: string;
  kategori: string;
  gudang: GudangEntry[];
}

export interface KotakabEntry {
  id: string;
  nama: string;
  kategori: string;
  kecamatan: KecamatanEntry[]; // Define the type of the kecamatan array
}

export type GroupedData = {
  [key: string]: {
    id: string;
    nama: string;
    kotakab: KotakabEntry[];
  };
};

export type GroupedDataTest = {
  [key: string]: {
    id: string;
    nama: string;
    kios: KiosEntry[];
  };
}