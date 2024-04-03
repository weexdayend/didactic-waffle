import { DistributorEntry, GroupedData, GroupedDataTest, GudangEntry, KecamatanEntry, KiosEntry, KotakabEntry } from "@/lib/types";

export function getMatch(wilayah: any[], mapping: any[], provinsiIds: string[], id: string) {
  return mapping
    .filter(entry => {
      return entry[id] && provinsiIds.includes(entry[id]);
    })
    .filter(entry => {
      const wilayahEntry = wilayah.find(w => w.kode === entry[id]);
      return wilayahEntry?.kategori === entry.kategori;
    })
    .map(entry => {
        const wilayahEntry = wilayah.find(w => w.kode === entry[id]);
        return {
          ...entry,
          kode: wilayahEntry?.kode,
          name: wilayahEntry?.nama,
        };
    });
}

export function populatedKiosData(matchDistributor: any[], matchKios: any[]) {
  const groupedData: GroupedDataTest = {};

  matchDistributor.forEach(distributorEntry => {
    if (distributorEntry && distributorEntry.id && distributorEntry.name) {
      const distributorName = distributorEntry.name; // Define distributorName inside the loop
      groupedData[distributorName] = {
        id: distributorEntry.id_distributor,
        nama: distributorEntry.name,
        kios: []
      };

      // Filter and map kios entries related to the current distributor
      const kiosForDistributor = matchKios
        .filter(kiosEntry => kiosEntry.name && kiosEntry.id_distributor === distributorEntry.id_distributor)
        .map(kiosEntry => ({
          id: kiosEntry.id_kios,
          nama: kiosEntry.name,
          kategori: kiosEntry.kategori
        }));

      // Push the filtered kios entries into groupedData
      groupedData[distributorName].kios.push(...kiosForDistributor);
    }
  });

  return groupedData;
}

export function populateGroupedData(
  matchProvinsi: any[], 
  matchKotaKabupaten: any[], 
  matchKecamatan: any[], 
  matchGudang: any[],
  matchDistributor: any[],
  matchKios: any[]) {
  const groupedData: GroupedData = {};

  matchProvinsi.forEach(provinsiEntry => {
  if (provinsiEntry && provinsiEntry.id && provinsiEntry.name) {
      const provinsiName = provinsiEntry.name;
      groupedData[provinsiName] = {
        id: provinsiEntry.kode,
        nama: provinsiName, 
        kotakab: [] 
      };

      matchKotaKabupaten.forEach(kotaKabupatenEntry => {
          if (
            kotaKabupatenEntry.name && 
            kotaKabupatenEntry.id_provinsi === provinsiEntry.id_provinsi
          ) {
            const kotakabEntry: KotakabEntry = {
              id: kotaKabupatenEntry.kode,
              nama: kotaKabupatenEntry.name,
              kategori: kotaKabupatenEntry.kategori,
              kecamatan: [] 
            };

            matchKecamatan.forEach(kecamatanEntry => {
                if (
                  kecamatanEntry.name && 
                  kecamatanEntry.id_kabupaten === kotaKabupatenEntry.id_kabupaten &&
                  kecamatanEntry.id_kecamatan === kecamatanEntry.id_kecamatan
                ) {
                    const kecEntry: KecamatanEntry = {
                      id: kecamatanEntry.kode,
                      nama: kecamatanEntry.name,
                      kategori: kecamatanEntry.kategori,
                      gudang: []
                    }

                    matchGudang.forEach(gudangEntry => {
                      console.log(gudangEntry)
                      if (
                        gudangEntry.name &&
                        gudangEntry.id_kecamatan === kecamatanEntry.id_kecamatan &&
                        gudangEntry.id_gudang === gudangEntry.id_gudang
                      ) {
                        const gudsEntry: GudangEntry = {
                          id: gudangEntry.kode,
                          nama: gudangEntry.name,
                          kategori: gudangEntry.kategori,
                          distributor: []
                        }
                        
                        matchDistributor.forEach(distributorEntry => {
                          if (
                            distributorEntry.name &&
                            distributorEntry.id_kecamatan === kecamatanEntry.id_kecamatan &&
                            distributorEntry.id_gudang === gudangEntry.id_gudang &&
                            distributorEntry.id_distributor === distributorEntry.id_distributor
                          ) {
                            const distrEntry: DistributorEntry = {
                              id: distributorEntry.kode,
                              nama: distributorEntry.name,
                              kategori: distributorEntry.kategori,
                              kios: []
                            }

                            matchKios.forEach(kiosEntry => {
                              if (
                                kiosEntry.name &&
                                kiosEntry.id_kecamatan === kecamatanEntry.id_kecamatan &&
                                kiosEntry.id_gudang === gudangEntry.id_gudang &&
                                kiosEntry.id_distributor === distributorEntry.id_distributor &&
                                kiosEntry.id_kios === kiosEntry.id_kios
                              ) {
                                const stallEntry: KiosEntry = {
                                  id: kiosEntry.kode,
                                  nama: kiosEntry.name,
                                  kategori: kiosEntry.kategori
                                }

                                distrEntry.kios.push(stallEntry)
                              }
                            })

                            gudsEntry.distributor.push(distrEntry)
                          }
                        })

                        kecEntry.gudang.push(gudsEntry)
                      }
                    })

                    // matchDistributor.forEach(distributorEntry => {
                    //   console.log(distributorEntry)
                    //   if (
                    //     distributorEntry.name &&
                    //     distributorEntry.id_provinsi === provinsiEntry.id_provinsi &&
                    //     distributorEntry.id_kabupaten === kotaKabupatenEntry.id_kabupaten &&
                    //     distributorEntry.id_kecamatan === kecamatanEntry.id_kecamatan
                    //   ) {
                    //     const distrEntry: DistributorEntry = {
                    //       id: distributorEntry.kode,
                    //       nama: distributorEntry.name,
                    //       kategori: distributorEntry.kategori,
                    //       kios: []
                    //     }
  
                    //     kecEntry.distributor.push(distrEntry);
                    //   }
                    // })

                  kotakabEntry.kecamatan.push(kecEntry);
                }
            });

            groupedData[provinsiName].kotakab.push(kotakabEntry);
          }
        }
      );
    }
  });

  return groupedData;
}