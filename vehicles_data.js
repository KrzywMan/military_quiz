// Baza pojazdów bojowych dla Quizu Militarnego
// Zawiera konfigurację zapytań do dynamicznego wyszukiwania w internecie oraz zapasowe linki CDN
const VEHICLES_DATABASE = {
  "bwp 1": {
    id: "bwp 1",
    displayName: "BWP-1",
    wikiTitle: "BMP-1",
    type: "Bojowy Wóz Piechoty (gąsienicowy)",
    year: "1966",
    searchQuery: "BMP-1",
    images: [
      "images/bwp_1.jpg",
      "images/bwp_1_1.jpg"
    ],
    onlineImages: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/BWP-1_Baltops_2016_0283.jpg/800px-BWP-1_Baltops_2016_0283.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Parola_Tank_Museum_131_-_BMP-1K_%2837682181945%29.jpg/800px-Parola_Tank_Museum_131_-_BMP-1K_%2837682181945%29.jpg"
    ]
  },
  "bwp 2": {
    id: "bwp 2",
    displayName: "BWP-2",
    wikiTitle: "BMP-2",
    type: "Bojowy Wóz Piechoty (armata 30mm 2A42)",
    year: "1980",
    searchQuery: "BMP-2",
    images: [
      "images/bwp_2.jpg"
    ],
    onlineImages: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Army2016demo-007.jpg/800px-Army2016demo-007.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/BMP-2_IFV_at_Engineering_Technologies_2012_part_1-14.jpg/800px-BMP-2_IFV_at_Engineering_Technologies_2012_part_1-14.jpg"
    ]
  },
  "bwp 3": {
    id: "bwp 3",
    displayName: "BWP-3",
    wikiTitle: "BMP-3",
    type: "Bojowy Wóz Piechoty (armata 100mm + 30mm)",
    year: "1987",
    searchQuery: "BMP-3",
    images: [
      "images/bwp_3.jpg"
    ],
    onlineImages: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/BMP-3_infantry_fighting_vehicle_at_Engineering_Technologies_2012_01.jpg/800px-BMP-3_infantry_fighting_vehicle_at_Engineering_Technologies_2012_01.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Army2016demo-011.jpg/800px-Army2016demo-011.jpg"
    ]
  },
  "bwp 4": {
    id: "bwp 4",
    displayName: "BWP-4 (Borsuk)",
    wikiTitle: "BWP_Borsuk",
    type: "Nowoczesny Bojowy Wóz Piechoty",
    year: "2022",
    searchQuery: "BWP Borsuk",
    images: [
      "images/bwp_4.jpg"
    ],
    onlineImages: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/BWP_Borsuk_-_221114-Z-YU201-1007.jpg/800px-BWP_Borsuk_-_221114-Z-YU201-1007.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Polish_Army_BWP_Borsuk_right_side_NATO_Days_Ostrava-2023.jpg/800px-Polish_Army_BWP_Borsuk_right_side_NATO_Days_Ostrava-2023.jpg"
    ]
  },
  "bmd 1": {
    id: "bmd 1",
    displayName: "BMD-1",
    wikiTitle: "BMD-1",
    type: "Bojowy Wóz Desantu (lekki, desantowany z samolotów)",
    year: "1969",
    searchQuery: "BMD-1",
    images: [
      "images/bmd_1.jpg"
    ],
    onlineImages: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/BMD-1%2C_National_Museum_of_the_Great_Patriotic_War.jpg/800px-BMD-1%2C_National_Museum_of_the_Great_Patriotic_War.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Vdvcompetition11.jpg/800px-Vdvcompetition11.jpg"
    ]
  },
  "bmd 2": {
    id: "bmd 2",
    displayName: "BMD-2",
    wikiTitle: "BMD-2",
    type: "Bojowy Wóz Desantu (armata 30mm 2A42)",
    year: "1985",
    searchQuery: "BMD-2",
    images: [
      "images/bmd_2.jpg"
    ],
    onlineImages: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/VDVHistorymuseum-17.jpg/800px-VDVHistorymuseum-17.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/BMD-2_airborne_combat_vehicle.jpg/800px-BMD-2_airborne_combat_vehicle.jpg"
    ]
  },
  "bmd 3": {
    id: "bmd 3",
    displayName: "BMD-3",
    wikiTitle: "BMD-3",
    type: "Bojowy Wóz Desantu nowej generacji",
    year: "1990",
    searchQuery: "BMD-3",
    images: [
      "images/bmd_3.jpg",
      "images/bmd_3_1.jpg"
    ],
    onlineImages: [
      "https://upload.wikimedia.org/wikipedia/commons/d/d1/BMD-3_1.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/BMD-3_Army-2022_2022-08-20_2657.jpg/800px-BMD-3_Army-2022_2022-08-20_2657.jpg"
    ]
  },
  "bmd 4": {
    id: "bmd 4",
    displayName: "BMD-4",
    wikiTitle: "BMD-4",
    type: "Bojowy Wóz Desantu (moduł Bachcza-U)",
    year: "2004",
    searchQuery: "BMD-4",
    images: [
      "images/bmd_4.jpg",
      "images/bmd_4_2.jpg"
    ],
    onlineImages: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/TankBiathlon14final-56.jpg/800px-TankBiathlon14final-56.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/4/49/2008_Moscow_Victory_Day_Parade_-_BMD-4.jpg"
    ]
  },
  "btr 60": {
    id: "btr 60",
    displayName: "BTR-60",
    wikiTitle: "BTR-60",
    type: "Kołowy Transporter Opancerzony 8x8 (podwójny silnik)",
    year: "1959",
    searchQuery: "BTR-60",
    images: [
      "images/btr_60.jpg",
      "images/btr_60_2.jpg"
    ],
    onlineImages: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/BTR-60PB_DA-ST-89-06597.jpg/800px-BTR-60PB_DA-ST-89-06597.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/8/83/BTR-60PB_NVA.JPG"
    ]
  },
  "btr 70": {
    id: "btr 70",
    displayName: "BTR-70",
    wikiTitle: "BTR-70",
    type: "Kołowy Transporter Opancerzony 8x8 (drzwi boczne dolne)",
    year: "1972",
    searchQuery: "BTR-70",
    images: [
      "images/btr_70.jpg"
    ],
    onlineImages: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/BTR70_004.jpg/800px-BTR70_004.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/2015-05-05._%D0%A0%D0%B5%D0%BF%D0%B5%D1%82%D0%B8%D1%86%D0%B8%D1%8F_%D0%BF%D0%B0%D1%80%D0%B0%D0%B4%D0%B0_%D0%9F%D0%BE%D0%B1%D0%B5%D0%B4%D1%8B_086.jpg/800px-2015-05-05._%D0%A0%D0%B5%D0%BF%D0%B5%D1%82%D0%B8%D1%86%D0%B8%D1%8F_%D0%BF%D0%B0%D1%80%D0%B0%D0%B4%D0%B0_%D0%9F%D0%BE%D0%B1%D0%B5%D0%B4%D1%8B_086.jpg"
    ]
  },
  "btr 80": {
    id: "btr 80",
    displayName: "BTR-80",
    wikiTitle: "BTR-80",
    type: "Kołowy Transporter Opancerzony 8x8 (jeden silnik wysokoprężny, dzielone drzwi)",
    year: "1986",
    searchQuery: "BTR-80",
    images: [
      "images/btr_80.jpg",
      "images/btr_80_2.jpg"
    ],
    onlineImages: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Gyumri_-_tank.jpg/800px-Gyumri_-_tank.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/2011_Moscow_Victory_Day_Parade_%28360-06%29_%28cropped%29.jpg/800px-2011_Moscow_Victory_Day_Parade_%28360-06%29_%28cropped%29.jpg"
    ]
  },
  "btr 82a": {
    id: "btr 82a",
    displayName: "BTR-82A",
    wikiTitle: "BTR-82A",
    type: "Kołowy Transporter Opancerzony (wieża BPPU z armatą 30mm 2A72)",
    year: "2013",
    searchQuery: "BTR-82",
    images: [
      "images/btr_82a.jpg"
    ],
    onlineImages: [
      "https://upload.wikimedia.org/wikipedia/commons/c/c3/BTR-82AT_during_the_%22Armiya_2021%22_exhibition.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/BTR-82_%2841072268395%29.jpg/800px-BTR-82_%2841072268395%29.jpg"
    ]
  },
  "btr 90": {
    id: "btr 90",
    displayName: "BTR-90",
    wikiTitle: "BTR-90",
    type: "Ciężki Kołowy Transporter Opancerzony 8x8 (Rostok)",
    year: "1994",
    searchQuery: "BTR-90",
    images: [
      "images/btr_90.jpg",
      "images/btr_90_1.jpg"
    ],
    onlineImages: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/TB2015ExhibitionP1-21.jpg/800px-TB2015ExhibitionP1-21.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/BTR-90_side.jpg/800px-BTR-90_side.jpg"
    ]
  }
};

const VEHICLE_KEYS = Object.keys(VEHICLES_DATABASE);
