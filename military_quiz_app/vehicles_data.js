// Baza sprzętu wojskowego dla Quizu Militarnego (149 pojazdów i systemów bojowych)
// Obsługuje dynamiczne wyszukiwanie w locie w Wikimedia/Wikipedia API oraz bezpieczne fallbacki

const VEHICLES_DATABASE = {
  "9s52m-polyana-d4m": {
    "id": "9s52m-polyana-d4m",
    "displayName": "9S52M POLYANA-D4M",
    "searchQuery": "Polyana-D4",
    "wikiTitle": "Polyana-D4",
    "type": "System automatyzacji dowodzenia OPL brygady",
    "year": "1990",
    "images": [],
    "onlineImages": []
  },
  "9s52m1-polyana-d4m1": {
    "id": "9s52m1-polyana-d4m1",
    "displayName": "9S52M1 POLYANA-D4M1",
    "searchQuery": "Polyana-D4M1",
    "wikiTitle": "Polyana-D4M1",
    "type": "Zautomatyzowany system dowodzenia OPL",
    "year": "2000",
    "images": [],
    "onlineImages": []
  },
  "polyana-s": {
    "id": "polyana-s",
    "displayName": "POLYANA-S",
    "searchQuery": "Polyana-D4",
    "wikiTitle": "Polyana-D4",
    "type": "Zautomatyzowany system dowodzenia Wojsk Obrony Powietrznej",
    "year": "1986",
    "images": [],
    "onlineImages": []
  },
  "34l6-senezh-m1e": {
    "id": "34l6-senezh-m1e",
    "displayName": "34L6 SENEZH-M1E",
    "searchQuery": "Senezh",
    "wikiTitle": "Senezh",
    "type": "Zautomatyzowany system dowodzenia pułku rakietowego",
    "year": "1985",
    "images": [],
    "onlineImages": []
  },
  "9s932-barnault-t": {
    "id": "9s932-barnault-t",
    "displayName": "9S932 BARNAULT-T",
    "searchQuery": "Barnaul-T",
    "wikiTitle": "Barnaul-T",
    "type": "Wóz dowodzenia i kierowania ogniem OPL (9S932-1)",
    "year": "2009",
    "images": [],
    "onlineImages": []
  },
  "9s737m-ran-ir-me": {
    "id": "9s737m-ran-ir-me",
    "displayName": "9S737M RANŻIR-ME",
    "searchQuery": "Ranzhir",
    "wikiTitle": "Ranzhir",
    "type": "Wóz dowodzenia baterii OPL Ranzhir-M",
    "year": "1995",
    "images": [],
    "onlineImages": []
  },
  "9s737m-ran-ir-mk": {
    "id": "9s737m-ran-ir-mk",
    "displayName": "9S737M RANŻIR-MK",
    "searchQuery": "9S737",
    "wikiTitle": "9S737",
    "type": "Kołowy wóz dowodzenia baterii OPL (na podwoziu kołowym)",
    "year": "2000",
    "images": [],
    "onlineImages": []
  },
  "9s737-ran-ir": {
    "id": "9s737-ran-ir",
    "displayName": "9S737 RANŻIR",
    "searchQuery": "9S737",
    "wikiTitle": "9S737",
    "type": "Zunifikowany bateryjny wóz dowodzenia OPL",
    "year": "1989",
    "images": [],
    "onlineImages": []
  },
  "pu-12-m6": {
    "id": "pu-12-m6",
    "displayName": "PU-12-M6",
    "searchQuery": "PU-12M",
    "wikiTitle": "PU-12M",
    "type": "Wóz dowodzenia obrony przeciwlotniczej (na podwoziu BTR)",
    "year": "1972",
    "images": [],
    "onlineImages": []
  },
  "pu-12-m7": {
    "id": "pu-12-m7",
    "displayName": "PU-12-M7",
    "searchQuery": "PU-12",
    "wikiTitle": "PU-12",
    "type": "Zmodernizowany wóz dowodzenia baterii OPL",
    "year": "1985",
    "images": [],
    "onlineImages": []
  },
  "sborka-m1-9s80m1-ppru-m1": {
    "id": "sborka-m1-9s80m1-ppru-m1",
    "displayName": "SBORKA-M1 /9S80M1, PPRU-M1/",
    "searchQuery": "PPRU-1",
    "wikiTitle": "PPRU-1",
    "type": "Ruchomy punkt rozpoznania i dowodzenia OPL Sborka",
    "year": "1985",
    "images": [],
    "onlineImages": []
  },
  "sborka-m1-2-9s80m1-2-ppru-m1-2": {
    "id": "sborka-m1-2-9s80m1-2-ppru-m1-2",
    "displayName": "SBORKA-M1-2 /9S80M1-2, PPRU-M1-2/",
    "searchQuery": "9S80",
    "wikiTitle": "9S80",
    "type": "Zmodernizowany wóz rozpoznania i dowodzenia OPL",
    "year": "1992",
    "images": [],
    "onlineImages": []
  },
  "kapustnik-bm": {
    "id": "kapustnik-bm",
    "displayName": "KAPUSTNIK-BM",
    "searchQuery": "1V153",
    "wikiTitle": "1V153",
    "type": "Zautomatyzowany wóz kierowania ogniem artylerii (1V152/1V153)",
    "year": "1990",
    "images": [],
    "onlineImages": []
  },
  "vivary": {
    "id": "vivary",
    "displayName": "VIVARY",
    "searchQuery": "BM-30 Smerch",
    "wikiTitle": "BM-30_Smerch",
    "type": "Zautomatyzowany system dowodzenia brygadą BM-30 Smiercz",
    "year": "1990",
    "images": [],
    "onlineImages": []
  },
  "9k32m-strza-a-2m2-sa-7b-grail-b": {
    "id": "9k32m-strza-a-2m2-sa-7b-grail-b",
    "displayName": "9K32M STRZAŁA-2M2 (SA-7B GRAIL-B)",
    "searchQuery": "Strela-2",
    "wikiTitle": "Strela-2",
    "type": "Przenośny przeciwlotniczy zestaw rakietowy",
    "year": "1970",
    "images": [],
    "onlineImages": []
  },
  "9k34-strza-a-3-sa-14-gremlin": {
    "id": "9k34-strza-a-3-sa-14-gremlin",
    "displayName": "9K34 STRZAŁA-3 (SA-14 GREMLIN)",
    "searchQuery": "Strela-3",
    "wikiTitle": "Strela-3",
    "type": "Przenośny przeciwlotniczy zestaw rakietowy",
    "year": "1974",
    "images": [],
    "onlineImages": []
  },
  "9k38-ig-a-sa-16-gimlet": {
    "id": "9k38-ig-a-sa-16-gimlet",
    "displayName": "9K38 IGŁA (SA-16 GIMLET)",
    "searchQuery": "9K38 Igla",
    "wikiTitle": "9K38_Igla",
    "type": "Przenośny przeciwlotniczy zestaw rakietowy",
    "year": "1981",
    "images": [],
    "onlineImages": []
  },
  "9m38-ig-a-1m-1e-sa-18-grouse": {
    "id": "9m38-ig-a-1m-1e-sa-18-grouse",
    "displayName": "9M38 IGŁA-1M/1E (SA-18 GROUSE)",
    "searchQuery": "Igla-1",
    "wikiTitle": "Igla-1",
    "type": "Przenośny przeciwlotniczy zestaw rakietowy",
    "year": "1983",
    "images": [],
    "onlineImages": []
  },
  "9k338-ig-a-super-sa-24-grinch": {
    "id": "9k338-ig-a-super-sa-24-grinch",
    "displayName": "9K338 IGŁA-SUPER (SA-24 GRINCH)",
    "searchQuery": "Igla-S",
    "wikiTitle": "Igla-S",
    "type": "Przenośny przeciwlotniczy zestaw rakietowy nowej generacji",
    "year": "2004",
    "images": [],
    "onlineImages": []
  },
  "9k333-wierba-sa-25": {
    "id": "9k333-wierba-sa-25",
    "displayName": "9K333 WIERBA (SA-25)",
    "searchQuery": "9K333 Verba",
    "wikiTitle": "9K333_Verba",
    "type": "Najnowocześniejszy rosyjski MANPADS z głowicą 3-zakresową",
    "year": "2014",
    "images": [],
    "onlineImages": []
  },
  "9k33m3-osa-sa-8-gecko": {
    "id": "9k33m3-osa-sa-8-gecko",
    "displayName": "9K33M3 OSA (SA-8 GECKO)",
    "searchQuery": "9K33 Osa",
    "wikiTitle": "9K33_Osa",
    "type": "Samobieżny przeciwlotniczy zestaw rakietowy 6x6",
    "year": "1980",
    "images": [],
    "onlineImages": []
  },
  "9k31-strza-a-1m-sa-9-gaskin": {
    "id": "9k31-strza-a-1m-sa-9-gaskin",
    "displayName": "9K31 STRZAŁA-1M (SA-9 GASKIN)",
    "searchQuery": "9K31 Strela-1",
    "wikiTitle": "9K31_Strela-1",
    "type": "Samobieżny rakietowy zestaw przeciwlotniczy na BRDM-2",
    "year": "1970",
    "images": [],
    "onlineImages": []
  },
  "9k35-strza-a-10-sa-13-gopher": {
    "id": "9k35-strza-a-10-sa-13-gopher",
    "displayName": "9K35 STRZAŁA-10 (SA-13 GOPHER)",
    "searchQuery": "9K35 Strela-10",
    "wikiTitle": "9K35_Strela-10",
    "type": "Samobieżny przeciwlotniczy zestaw rakietowy na MT-LB",
    "year": "1976",
    "images": [],
    "onlineImages": []
  },
  "tor-m-1-m2e-sa-15-gauntlet": {
    "id": "tor-m-1-m2e-sa-15-gauntlet",
    "displayName": "TOR M-1/M2E (SA-15 GAUNTLET)",
    "searchQuery": "Tor missile system",
    "wikiTitle": "Tor_missile_system",
    "type": "Samobieżny rakietowy system przeciwlotniczy bliskiego zasięgu",
    "year": "1991",
    "images": [],
    "onlineImages": []
  },
  "2s6m1-tunguska-m1-sa-19-grisom": {
    "id": "2s6m1-tunguska-m1-sa-19-grisom",
    "displayName": "2S6M1 TUNGUSKA-M1 (SA-19 GRISOM)",
    "searchQuery": "2K22 Tunguska",
    "wikiTitle": "2K22_Tunguska",
    "type": "Samobieżny rakietowo-artyleryjski zestaw przeciwlotniczy",
    "year": "2003",
    "images": [],
    "onlineImages": []
  },
  "pancyr-s1-sa-22-greyhound": {
    "id": "pancyr-s1-sa-22-greyhound",
    "displayName": "PANCYR-S1 (SA-22 GREYHOUND)",
    "searchQuery": "Pantsir-S1",
    "wikiTitle": "Pantsir-S1",
    "type": "Samobieżny rakietowo-artyleryjski zestaw przeciwlotniczy",
    "year": "2010",
    "images": [],
    "onlineImages": []
  },
  "2k11-krug-m1-sa-4b-ganef-m1": {
    "id": "2k11-krug-m1-sa-4b-ganef-m1",
    "displayName": "2K11 KRUG M1 (SA-4b GANEF M1)",
    "searchQuery": "2K11 Krug",
    "wikiTitle": "2K11_Krug",
    "type": "Samobieżny przeciwlotniczy system rakietowy średniego zasięgu",
    "year": "1971",
    "images": [],
    "onlineImages": []
  },
  "2k12-kub-sa-6-gainful": {
    "id": "2k12-kub-sa-6-gainful",
    "displayName": "2K12 KUB (SA-6 GAINFUL)",
    "searchQuery": "2K12 Kub",
    "wikiTitle": "2K12_Kub",
    "type": "Samobieżny zestaw rakietowy OPL średniego zasięgu",
    "year": "1967",
    "images": [],
    "onlineImages": []
  },
  "buk-m-1-sa-11-gadfly": {
    "id": "buk-m-1-sa-11-gadfly",
    "displayName": "BUK-M-1 (SA-11 GADFLY)",
    "searchQuery": "Buk missile system",
    "wikiTitle": "Buk_missile_system",
    "type": "Samobieżny przeciwlotniczy system rakietowy średniego zasięgu",
    "year": "1983",
    "images": [],
    "onlineImages": []
  },
  "buk-m1-2-m2-m2e-m3-sa-17-grizzly": {
    "id": "buk-m1-2-m2-m2e-m3-sa-17-grizzly",
    "displayName": "BUK-M1-2, M2, M2E, M3 (SA-17 GRIZZLY)",
    "searchQuery": "Buk-M2",
    "wikiTitle": "Buk-M2",
    "type": "Nowoczesny samobieżny system rakietowy OPL",
    "year": "2008",
    "images": [],
    "onlineImages": []
  },
  "s-350-e-vityaz": {
    "id": "s-350-e-vityaz",
    "displayName": "S-350 E VITYAZ",
    "searchQuery": "S-350 missile system",
    "wikiTitle": "S-350_missile_system",
    "type": "Przeciwlotniczy i przeciwrakietowy system rakietowy średniego zasięgu",
    "year": "2019",
    "images": [],
    "onlineImages": []
  },
  "system-s-300": {
    "id": "system-s-300",
    "displayName": "SYSTEM S-300",
    "searchQuery": "S-300 missile system",
    "wikiTitle": "S-300_missile_system",
    "type": "Długodystansowy system rakietowy ziemia-powietrze",
    "year": "1978",
    "images": [],
    "onlineImages": []
  },
  "s-300w-sa-12a-gladiator-sa-12b-giant": {
    "id": "s-300w-sa-12a-gladiator-sa-12b-giant",
    "displayName": "S-300W (SA-12A GLADIATOR / SA-12B GIANT)",
    "searchQuery": "S-300V missile system",
    "wikiTitle": "S-300V_missile_system",
    "type": "Samobieżny gąsienicowy system obrony przeciwlotniczej i przeciwrakietowej",
    "year": "1988",
    "images": [],
    "onlineImages": []
  },
  "s-300-pmu-1-sa-20a-gargoyle-a": {
    "id": "s-300-pmu-1-sa-20a-gargoyle-a",
    "displayName": "S-300 PMU 1 (SA-20A GARGOYLE A)",
    "searchQuery": "S-300PMU",
    "wikiTitle": "S-300PMU",
    "type": "Zmodernizowany eksportowy system rakietowy dalekiego zasięgu",
    "year": "1993",
    "images": [],
    "onlineImages": []
  },
  "s-300-pmu-2-sa-20b-gargoyle-b": {
    "id": "s-300-pmu-2-sa-20b-gargoyle-b",
    "displayName": "S-300 PMU 2 (SA-20B GARGOYLE B)",
    "searchQuery": "S-300PMU-2",
    "wikiTitle": "S-300PMU-2",
    "type": "Zaawansowany system obrony powietrznej Faworit",
    "year": "1997",
    "images": [],
    "onlineImages": []
  },
  "s-400-sa-21-triumf": {
    "id": "s-400-sa-21-triumf",
    "displayName": "S-400 (SA-21 TRIUMF)",
    "searchQuery": "S-400 missile system",
    "wikiTitle": "S-400_missile_system",
    "type": "Zaawansowany system rakietowy dalekiego zasięgu Triumf",
    "year": "2007",
    "images": [],
    "onlineImages": []
  },
  "9k72-r-17-elbrus-ss-1c-scud-b": {
    "id": "9k72-r-17-elbrus-ss-1c-scud-b",
    "displayName": "9K72 R-17 ELBRUS (SS-1C SCUD-B)",
    "searchQuery": "Scud",
    "wikiTitle": "Scud",
    "type": "Operacyjno-taktyczny zestaw rakietowy ziemia-ziemia",
    "year": "1964",
    "images": [],
    "onlineImages": []
  },
  "9p129-toczka-ss-21-scarab": {
    "id": "9p129-toczka-ss-21-scarab",
    "displayName": "9P129 TOCZKA (SS-21 SCARAB)",
    "searchQuery": "OTR-21 Tochka",
    "wikiTitle": "OTR-21_Tochka",
    "type": "Taktyczny zestaw rakietowy ziemia-ziemia 9K79",
    "year": "1975",
    "images": [],
    "onlineImages": []
  },
  "9k720-iskander-ss-26-stone": {
    "id": "9k720-iskander-ss-26-stone",
    "displayName": "9K720 ISKANDER (SS-26 STONE)",
    "searchQuery": "9K720 Iskander",
    "wikiTitle": "9K720_Iskander",
    "type": "Operacyjno-taktyczny rakietowy kompleks balistyczny i manewrujący",
    "year": "2006",
    "images": [],
    "onlineImages": []
  },
  "2s1-go-dzik": {
    "id": "2s1-go-dzik",
    "displayName": "2S1 GOŹDZIK",
    "searchQuery": "2S1 Gvozdika",
    "wikiTitle": "2S1_Gvozdika",
    "type": "Samobieżna haubica 122 mm na podwoziu gąsienicowym",
    "year": "1971",
    "images": [],
    "onlineImages": []
  },
  "2s3-akacja": {
    "id": "2s3-akacja",
    "displayName": "2S3 AKACJA",
    "searchQuery": "2S3 Akatsiya",
    "wikiTitle": "2S3_Akatsiya",
    "type": "Samobieżna haubica 152 mm",
    "year": "1971",
    "images": [],
    "onlineImages": []
  },
  "2s4-tulipan": {
    "id": "2s4-tulipan",
    "displayName": "2S4 TULIPAN",
    "searchQuery": "2S4 Tyulpan",
    "wikiTitle": "2S4_Tyulpan",
    "type": "Ciężki samobieżny moździerz 240 mm",
    "year": "1972",
    "images": [],
    "onlineImages": []
  },
  "2s5-hiacynt": {
    "id": "2s5-hiacynt",
    "displayName": "2S5 HIACYNT",
    "searchQuery": "2S5 Giatsint-S",
    "wikiTitle": "2S5_Giatsint-S",
    "type": "Samobieżna armata polowa 152 mm",
    "year": "1978",
    "images": [],
    "onlineImages": []
  },
  "2s7-pion": {
    "id": "2s7-pion",
    "displayName": "2S7 PION",
    "searchQuery": "2S7 Pion",
    "wikiTitle": "2S7_Pion",
    "type": "Ciężka samobieżna armata 203 mm",
    "year": "1975",
    "images": [],
    "onlineImages": []
  },
  "2s9-nona": {
    "id": "2s9-nona",
    "displayName": "2S9 NONA",
    "searchQuery": "2S9 Nona",
    "wikiTitle": "2S9_Nona",
    "type": "Samobieżny moździerz desantowy 120 mm na podwoziu BTR-D",
    "year": "1981",
    "images": [],
    "onlineImages": []
  },
  "2s19-msta-s": {
    "id": "2s19-msta-s",
    "displayName": "2S19 MSTA-S",
    "searchQuery": "2S19 Msta",
    "wikiTitle": "2S19_Msta",
    "type": "Samobieżna haubica 152 mm",
    "year": "1989",
    "images": [],
    "onlineImages": []
  },
  "2s23-nona-svk": {
    "id": "2s23-nona-svk",
    "displayName": "2S23 NONA-SVK",
    "searchQuery": "2S23 Nona-SVK",
    "wikiTitle": "2S23_Nona-SVK",
    "type": "Samobieżny moździerz 120 mm na podwoziu kołowym BTR-80",
    "year": "1990",
    "images": [],
    "onlineImages": []
  },
  "2s35-koalicja-sw": {
    "id": "2s35-koalicja-sw",
    "displayName": "2S35 KOALICJA-SW",
    "searchQuery": "2S35 Koalitsiya-SV",
    "wikiTitle": "2S35_Koalitsiya-SV",
    "type": "Najnowocześniejsza rosyjska haubica samobieżna 152 mm",
    "year": "2015",
    "images": [],
    "onlineImages": []
  },
  "2a36-hiacynt-b": {
    "id": "2a36-hiacynt-b",
    "displayName": "2A36 HIACYNT-B",
    "searchQuery": "2A36 Giatsint-B",
    "wikiTitle": "2A36_Giatsint-B",
    "type": "Holowana armata polowa 152 mm dalekiego zasięgu",
    "year": "1976",
    "images": [],
    "onlineImages": []
  },
  "2a65-msta-b": {
    "id": "2a65-msta-b",
    "displayName": "2A65 MSTA-B",
    "searchQuery": "2A65 Msta-B",
    "wikiTitle": "2A65_Msta-B",
    "type": "Holowana haubica 152 mm",
    "year": "1987",
    "images": [],
    "onlineImages": []
  },
  "nona-b": {
    "id": "nona-b",
    "displayName": "NONA-B",
    "searchQuery": "2B16 Nona-K",
    "wikiTitle": "2B16_Nona-K",
    "type": "Holowany moździerz / działo 120 mm 2B16",
    "year": "1986",
    "images": [],
    "onlineImages": []
  },
  "d-20": {
    "id": "d-20",
    "displayName": "D-20",
    "searchQuery": "152 mm howitzer D-20",
    "wikiTitle": "152_mm_howitzer_D-20",
    "type": "Holowana haubicoarmata 152 mm wz. 1955",
    "year": "1955",
    "images": [],
    "onlineImages": []
  },
  "d-30": {
    "id": "d-30",
    "displayName": "D-30",
    "searchQuery": "122 mm howitzer 2A18 (D-30)",
    "wikiTitle": "122_mm_howitzer_2A18_(D-30)",
    "type": "Holowana haubica 122 mm o charakterystycznym trójnożnym łożu",
    "year": "1960",
    "images": [],
    "onlineImages": []
  },
  "2b9-wasilok": {
    "id": "2b9-wasilok",
    "displayName": "2B9 WASILOK",
    "searchQuery": "2B9 Vasilek",
    "wikiTitle": "2B9_Vasilek",
    "type": "Automatyczny moździerz 82 mm ładowany kasetowo",
    "year": "1970",
    "images": [],
    "onlineImages": []
  },
  "bm-21-grad": {
    "id": "bm-21-grad",
    "displayName": "BM-21 GRAD",
    "searchQuery": "BM-21 Grad",
    "wikiTitle": "BM-21_Grad",
    "type": "Wieloprowadnicowa wyrzutnia rakietowa 122 mm",
    "year": "1963",
    "images": [],
    "onlineImages": []
  },
  "bm-21a-belgrad": {
    "id": "bm-21a-belgrad",
    "displayName": "BM-21A BelGRAD",
    "searchQuery": "BM-21A BelGrad",
    "wikiTitle": "BM-21A_BelGrad",
    "type": "Białoruska modernizacja wyrzutni Grad na podwoziu MAZ",
    "year": "2001",
    "images": [],
    "onlineImages": []
  },
  "bm-27-uragan": {
    "id": "bm-27-uragan",
    "displayName": "BM-27 URAGAN",
    "searchQuery": "BM-27 Uragan",
    "wikiTitle": "BM-27_Uragan",
    "type": "Ciężka wyrzutnia rakietowa 220 mm na podwoziu ZIŁ-135",
    "year": "1975",
    "images": [],
    "onlineImages": []
  },
  "bm-30-smiercz": {
    "id": "bm-30-smiercz",
    "displayName": "BM-30 SMIERCZ",
    "searchQuery": "BM-30 Smerch",
    "wikiTitle": "BM-30_Smerch",
    "type": "Ciężki system artylerii rakietowej 300 mm",
    "year": "1989",
    "images": [],
    "onlineImages": []
  },
  "tornado-g": {
    "id": "tornado-g",
    "displayName": "TORNADO-G",
    "searchQuery": "9A53-G Tornado",
    "wikiTitle": "9A53-G_Tornado",
    "type": "Nowoczesny rosyjski system artylerii rakietowej 122 mm",
    "year": "2012",
    "images": [],
    "onlineImages": []
  },
  "tornado-u": {
    "id": "tornado-u",
    "displayName": "TORNADO-U",
    "searchQuery": "Ural-63704",
    "wikiTitle": "Ural-63704",
    "type": "Opancerzone ciężarowe podwozie wojskowe Ural Tornado-U",
    "year": "2015",
    "images": [],
    "onlineImages": []
  },
  "tornado-s": {
    "id": "tornado-s",
    "displayName": "TORNADO-S",
    "searchQuery": "9A54 Tornado-S",
    "wikiTitle": "9A54_Tornado-S",
    "type": "Zmodernizowany precyzyjny system rakietowy 300 mm",
    "year": "2016",
    "images": [],
    "onlineImages": []
  },
  "tos-1-buratino": {
    "id": "tos-1-buratino",
    "displayName": "TOS-1 BURATINO",
    "searchQuery": "TOS-1",
    "wikiTitle": "TOS-1",
    "type": "Ciężki miotacz ognia / artyleria rakietowa termobaryczna 220 mm",
    "year": "1988",
    "images": [],
    "onlineImages": []
  },
  "bmd-1": {
    "id": "bmd-1",
    "displayName": "BMD-1",
    "searchQuery": "BMD-1",
    "wikiTitle": "BMD-1",
    "type": "Bojowy wóz desantu gąsienicowy",
    "year": "1969",
    "images": [],
    "onlineImages": [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/BMD-1%2C_National_Museum_of_the_Great_Patriotic_War.jpg/800px-BMD-1%2C_National_Museum_of_the_Great_Patriotic_War.jpg"
    ]
  },
  "bmd-2": {
    "id": "bmd-2",
    "displayName": "BMD-2",
    "searchQuery": "BMD-2",
    "wikiTitle": "BMD-2",
    "type": "Bojowy wóz desantu z armatą 30 mm",
    "year": "1985",
    "images": [],
    "onlineImages": [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/VDVHistorymuseum-17.jpg/800px-VDVHistorymuseum-17.jpg"
    ]
  },
  "bmd-3": {
    "id": "bmd-3",
    "displayName": "BMD-3",
    "searchQuery": "BMD-3",
    "wikiTitle": "BMD-3",
    "type": "Bojowy wóz desantu nowej generacji",
    "year": "1990",
    "images": [],
    "onlineImages": [
      "https://upload.wikimedia.org/wikipedia/commons/d/d1/BMD-3_1.jpg"
    ]
  },
  "bmd-4": {
    "id": "bmd-4",
    "displayName": "BMD-4",
    "searchQuery": "BMD-4",
    "wikiTitle": "BMD-4",
    "type": "Bojowy wóz desantu z modułem wieżowym 100 mm + 30 mm",
    "year": "2004",
    "images": [],
    "onlineImages": [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/TankBiathlon14final-56.jpg/800px-TankBiathlon14final-56.jpg"
    ]
  },
  "btr-mdm-rakuszka": {
    "id": "btr-mdm-rakuszka",
    "displayName": "BTR-MDM RAKUSZKA",
    "searchQuery": "BTR-MDM Rakushka",
    "wikiTitle": "BTR-MDM_Rakushka",
    "type": "Wielozadaniowy gąsienicowy transporter opancerzony wojsk desantowych",
    "year": "2015",
    "images": [],
    "onlineImages": []
  },
  "btrd": {
    "id": "btrd",
    "displayName": "BTRD",
    "searchQuery": "BTR-D",
    "wikiTitle": "BTR-D",
    "type": "Wielozadaniowy desantowy transporter opancerzony",
    "year": "1974",
    "images": [],
    "onlineImages": []
  },
  "bmp-1": {
    "id": "bmp-1",
    "displayName": "BMP-1",
    "searchQuery": "BMP-1",
    "wikiTitle": "BMP-1",
    "type": "Bojowy wóz piechoty (armata 73 mm Grom)",
    "year": "1966",
    "images": [],
    "onlineImages": [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/BWP-1_Baltops_2016_0283.jpg/800px-BWP-1_Baltops_2016_0283.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Parola_Tank_Museum_131_-_BMP-1K_%2837682181945%29.jpg/800px-Parola_Tank_Museum_131_-_BMP-1K_%2837682181945%29.jpg"
    ]
  },
  "bmp-2": {
    "id": "bmp-2",
    "displayName": "BMP-2",
    "searchQuery": "BMP-2",
    "wikiTitle": "BMP-2",
    "type": "Bojowy wóz piechoty (armata automatyczna 30 mm)",
    "year": "1980",
    "images": [],
    "onlineImages": [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Army2016demo-007.jpg/800px-Army2016demo-007.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/BMP-2_IFV_at_Engineering_Technologies_2012_part_1-14.jpg/800px-BMP-2_IFV_at_Engineering_Technologies_2012_part_1-14.jpg"
    ]
  },
  "bmp-3": {
    "id": "bmp-3",
    "displayName": "BMP-3",
    "searchQuery": "BMP-3",
    "wikiTitle": "BMP-3",
    "type": "Bojowy wóz piechoty (armata 100 mm sprzężona z 30 mm)",
    "year": "1987",
    "images": [],
    "onlineImages": [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/BMP-3_infantry_fighting_vehicle_at_Engineering_Technologies_2012_01.jpg/800px-BMP-3_infantry_fighting_vehicle_at_Engineering_Technologies_2012_01.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Army2016demo-011.jpg/800px-Army2016demo-011.jpg"
    ]
  },
  "bmp-kurganiec-25": {
    "id": "bmp-kurganiec-25",
    "displayName": "BMP KURGANIEC-25",
    "searchQuery": "Kurganets-25",
    "wikiTitle": "Kurganets-25",
    "type": "Nowej generacji rosyjski bojowy wóz piechoty",
    "year": "2015",
    "images": [],
    "onlineImages": []
  },
  "bmp-t-t-15-terminator-2": {
    "id": "bmp-t-t-15-terminator-2",
    "displayName": "BMP-T „T-15” (Terminator-2)",
    "searchQuery": "T-15 Armata",
    "wikiTitle": "T-15_Armata",
    "type": "Ciężki bojowy wóz piechoty na platformie Armata / BMPT",
    "year": "2015",
    "images": [],
    "onlineImages": []
  },
  "btr-60": {
    "id": "btr-60",
    "displayName": "BTR-60",
    "searchQuery": "BTR-60",
    "wikiTitle": "BTR-60",
    "type": "Kołowy transporter opancerzony 8x8",
    "year": "1959",
    "images": [],
    "onlineImages": [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/BTR-60PB_DA-ST-89-06597.jpg/800px-BTR-60PB_DA-ST-89-06597.jpg"
    ]
  },
  "btr-70": {
    "id": "btr-70",
    "displayName": "BTR-70",
    "searchQuery": "BTR-70",
    "wikiTitle": "BTR-70",
    "type": "Kołowy transporter opancerzony 8x8",
    "year": "1972",
    "images": [],
    "onlineImages": [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/BTR70_004.jpg/800px-BTR70_004.jpg"
    ]
  },
  "btr-80": {
    "id": "btr-80",
    "displayName": "BTR-80",
    "searchQuery": "BTR-80",
    "wikiTitle": "BTR-80",
    "type": "Kołowy transporter opancerzony 8x8 z silnikiem diesla",
    "year": "1986",
    "images": [],
    "onlineImages": [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Gyumri_-_tank.jpg/800px-Gyumri_-_tank.jpg"
    ]
  },
  "btr-82a": {
    "id": "btr-82a",
    "displayName": "BTR-82A",
    "searchQuery": "BTR-82",
    "wikiTitle": "BTR-82",
    "type": "Kołowy transporter opancerzony z wieżą 30 mm BPPU",
    "year": "2013",
    "images": [],
    "onlineImages": [
      "https://upload.wikimedia.org/wikipedia/commons/c/c3/BTR-82AT_during_the_%22Armiya_2021%22_exhibition.jpg"
    ]
  },
  "btr-90": {
    "id": "btr-90",
    "displayName": "BTR-90",
    "searchQuery": "BTR-90",
    "wikiTitle": "BTR-90",
    "type": "Ciężki kołowy transporter opancerzony 8x8 Rostok",
    "year": "1994",
    "images": [],
    "onlineImages": [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/TB2015ExhibitionP1-21.jpg/800px-TB2015ExhibitionP1-21.jpg"
    ]
  },
  "kto-bumerang": {
    "id": "kto-bumerang",
    "displayName": "KTO - BUMERANG",
    "searchQuery": "VPK-7829 Bumerang",
    "wikiTitle": "VPK-7829_Bumerang",
    "type": "Nowoczesny kołowy wóz bojowy / transporter opancerzony 8x8",
    "year": "2015",
    "images": [],
    "onlineImages": []
  },
  "bwp-4-borsuk": {
    "id": "bwp-4-borsuk",
    "displayName": "BWP-4 (Borsuk)",
    "searchQuery": "BWP Borsuk",
    "wikiTitle": "BWP_Borsuk",
    "type": "Polski nowoczesny pływający bojowy wóz piechoty",
    "year": "2022",
    "images": [],
    "onlineImages": [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/BWP_Borsuk_-_221114-Z-YU201-1007.jpg/800px-BWP_Borsuk_-_221114-Z-YU201-1007.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Polish_Army_BWP_Borsuk_right_side_NATO_Days_Ostrava-2023.jpg/800px-Polish_Army_BWP_Borsuk_right_side_NATO_Days_Ostrava-2023.jpg"
    ]
  },
  "t-64b": {
    "id": "t-64b",
    "displayName": "T-64B",
    "searchQuery": "T-64",
    "wikiTitle": "T-64",
    "type": "Czołg podstawowy z automatem ładowania i SKO 1A33",
    "year": "1976",
    "images": [],
    "onlineImages": []
  },
  "t-72": {
    "id": "t-72",
    "displayName": "T-72",
    "searchQuery": "T-72",
    "wikiTitle": "T-72",
    "type": "Czołg podstawowy II generacji Ural",
    "year": "1973",
    "images": [],
    "onlineImages": []
  },
  "t-72b-1": {
    "id": "t-72b-1",
    "displayName": "T-72B-1",
    "searchQuery": "T-72",
    "wikiTitle": "T-72",
    "type": "Wariant czołgu T-72B bez systemu naprowadzania rakiet",
    "year": "1985",
    "images": [],
    "onlineImages": []
  },
  "t-72b-2": {
    "id": "t-72b-2",
    "displayName": "T-72B-2",
    "searchQuery": "T-72B2 Rogatka",
    "wikiTitle": "T-72B2_Rogatka",
    "type": "Modernizacja czołgu T-72 z pancerzem Relikt (Rogatka)",
    "year": "2006",
    "images": [],
    "onlineImages": []
  },
  "t-72b-3": {
    "id": "t-72b-3",
    "displayName": "T-72B-3",
    "searchQuery": "T-72B3",
    "wikiTitle": "T-72B3",
    "type": "Głęboka modernizacja czołgu T-72 z celownikiem Sosna-U",
    "year": "2011",
    "images": [],
    "onlineImages": []
  },
  "t-80u": {
    "id": "t-80u",
    "displayName": "T-80U",
    "searchQuery": "T-80",
    "wikiTitle": "T-80",
    "type": "Czołg podstawowy z turbiną gazową i pancerzem Kontakt-5",
    "year": "1985",
    "images": [],
    "onlineImages": []
  },
  "t-90a": {
    "id": "t-90a",
    "displayName": "T-90A",
    "searchQuery": "T-90",
    "wikiTitle": "T-90",
    "type": "Rosyjski czołg podstawowy ze spawaną wieżą i systemem Sztora-1",
    "year": "2004",
    "images": [],
    "onlineImages": []
  },
  "t-14-amata": {
    "id": "t-14-amata",
    "displayName": "T-14 AMATA",
    "searchQuery": "T-14 Armata",
    "wikiTitle": "T-14_Armata",
    "type": "Czołg podstawowy nowej generacji z bezzałogową wieżą",
    "year": "2015",
    "images": [],
    "onlineImages": []
  },
  "mt-12-ta-12-rapira": {
    "id": "mt-12-ta-12-rapira",
    "displayName": "MT-12/TA-12 RAPIRA",
    "searchQuery": "T-12 antitank gun",
    "wikiTitle": "T-12_antitank_gun",
    "type": "Gładkolufowa armata przeciwpancerna 100 mm",
    "year": "1970",
    "images": [],
    "onlineImages": []
  },
  "2a45-sprut-b": {
    "id": "2a45-sprut-b",
    "displayName": "2A45 SPRUT-B",
    "searchQuery": "2A45 Sprut-B",
    "wikiTitle": "2A45_Sprut-B",
    "type": "Gładkolufowa armata przeciwpancerna 125 mm z napędem pomocniczym",
    "year": "1989",
    "images": [],
    "onlineImages": []
  },
  "9p149-szturm-s": {
    "id": "9p149-szturm-s",
    "displayName": "9P149 SZTURM-S",
    "searchQuery": "9K114 Shturm",
    "wikiTitle": "9K114_Shturm",
    "type": "Samobieżny niszczyciel czołgów na podwoziu MT-LB",
    "year": "1979",
    "images": [],
    "onlineImages": []
  },
  "9p157-chryzantema-s": {
    "id": "9p157-chryzantema-s",
    "displayName": "9P157 CHRYZANTEMA-S",
    "searchQuery": "Khrizantema",
    "wikiTitle": "Khrizantema",
    "type": "Samobieżny niszczyciel czołgów na podwoziu BMP-3 z radarem",
    "year": "2005",
    "images": [],
    "onlineImages": []
  },
  "9p162-kornet-t": {
    "id": "9p162-kornet-t",
    "displayName": "9P162 KORNET-T",
    "searchQuery": "Kornet-T",
    "wikiTitle": "Kornet-T",
    "type": "Samobieżna wyrzutnia pocisków ppk Kornet na BMP-3",
    "year": "2012",
    "images": [],
    "onlineImages": []
  },
  "kornet-d": {
    "id": "kornet-d",
    "displayName": "KORNET-D",
    "searchQuery": "Kornet-D",
    "wikiTitle": "Kornet-D",
    "type": "Samobieżny kołowy system przeciwpancerny na podwoziu Tigr",
    "year": "2011",
    "images": [],
    "onlineImages": []
  },
  "2s25-sprut-sd": {
    "id": "2s25-sprut-sd",
    "displayName": "2S25 SPRUT-SD",
    "searchQuery": "2S25 Sprut-SD",
    "wikiTitle": "2S25_Sprut-SD",
    "type": "Samobieżne lądowodesantowe działo przeciwpancerne 125 mm",
    "year": "2005",
    "images": [],
    "onlineImages": []
  },
  "psnr-1-credo-1": {
    "id": "psnr-1-credo-1",
    "displayName": "PSNR-1 (CREDO-1)",
    "searchQuery": "PSNR-1",
    "wikiTitle": "PSNR-1",
    "type": "Przenośna stacja radiolokacyjnej obserwacji pola walki",
    "year": "1970",
    "images": [],
    "onlineImages": []
  },
  "snar-10-1l244-2-credo-1e": {
    "id": "snar-10-1l244-2-credo-1e",
    "displayName": "SNAR-10 (1L244-2 CREDO-1E)",
    "searchQuery": "SNAR-10",
    "wikiTitle": "SNAR-10",
    "type": "Stacja radiolokacyjna rozpoznania celów naziemnych Jaguar",
    "year": "1973",
    "images": [],
    "onlineImages": []
  },
  "snar-10m1-1rl232-2m": {
    "id": "snar-10m1-1rl232-2m",
    "displayName": "SNAR-10M1 (1RL232-2M)",
    "searchQuery": "SNAR-10M1",
    "wikiTitle": "SNAR-10M1",
    "type": "Zmodernizowany radar rozpoznania celów ruchomych Pantera",
    "year": "2004",
    "images": [],
    "onlineImages": []
  },
  "1l219-zoopark-1": {
    "id": "1l219-zoopark-1",
    "displayName": "1L219 ZOOPARK-1",
    "searchQuery": "Zoopark-1",
    "wikiTitle": "Zoopark-1",
    "type": "Radiolokacyjny kompleks rozpoznania pozycji artylerii",
    "year": "1989",
    "images": [],
    "onlineImages": []
  },
  "1l220u-zoopark-2": {
    "id": "1l220u-zoopark-2",
    "displayName": "1L220U ZOOPARK-2",
    "searchQuery": "1L220U Zoopark-2",
    "wikiTitle": "1L220U_Zoopark-2",
    "type": "Radiolokacyjny zestaw rozpoznania artyleryjskiego dalekiego zasięgu",
    "year": "2007",
    "images": [],
    "onlineImages": []
  },
  "nebo-u": {
    "id": "nebo-u",
    "displayName": "NEBO-U",
    "searchQuery": "55Zh6U Nebo-U",
    "wikiTitle": "55Zh6U_Nebo-U",
    "type": "Radar wczesnego ostrzegania metrowego zakresu fal",
    "year": "1995",
    "images": [],
    "onlineImages": []
  },
  "nebo-m-55zhm-rlm-m": {
    "id": "nebo-m-55zhm-rlm-m",
    "displayName": "NEBO-M (55ZhM RLM-M)",
    "searchQuery": "55Zh6M Nebo-M",
    "wikiTitle": "55Zh6M_Nebo-M",
    "type": "Wielopasmowy mobilny radar obrony powietrznej",
    "year": "2012",
    "images": [],
    "onlineImages": []
  },
  "nebo-sv-1-13": {
    "id": "nebo-sv-1-13",
    "displayName": "NEBO-SV (1Ł13)",
    "searchQuery": "1L13 Nebo-SV",
    "wikiTitle": "1L13_Nebo-SV",
    "type": "Mobilny radar wczesnego ostrzegania OPL wojsk lądowych",
    "year": "1985",
    "images": [],
    "onlineImages": []
  },
  "nebo-ue-55z6": {
    "id": "nebo-ue-55z6",
    "displayName": "NEBO-UE (55Z6)",
    "searchQuery": "55Zh6UE",
    "wikiTitle": "55Zh6UE",
    "type": "Trójwspółrzędny radar obserwacji przestrzeni powietrznej",
    "year": "2000",
    "images": [],
    "onlineImages": []
  },
  "kasta-2e1-39n6": {
    "id": "kasta-2e1-39n6",
    "displayName": "KASTA 2E1 (39N6)",
    "searchQuery": "Kasta 2E1",
    "wikiTitle": "Kasta_2E1",
    "type": "Mobilny radar małych wysokości do wykrywania celów niskolecących",
    "year": "1989",
    "images": [],
    "onlineImages": []
  },
  "kasta-2-2-39n6": {
    "id": "kasta-2-2-39n6",
    "displayName": "KASTA 2-2 (39N6)",
    "searchQuery": "Kasta 2E2",
    "wikiTitle": "Kasta_2E2",
    "type": "Trójwspółrzędny mobilny radar do wykrywania celów niskolecących",
    "year": "1995",
    "images": [],
    "onlineImages": []
  },
  "p-35": {
    "id": "p-35",
    "displayName": "P-35",
    "searchQuery": "P-35 radar",
    "wikiTitle": "P-35_radar",
    "type": "Trójwspółrzędna stacja radiolokacyjna wczesnego wykrywania",
    "year": "1958",
    "images": [],
    "onlineImages": []
  },
  "vostok-d-e": {
    "id": "vostok-d-e",
    "displayName": "VOSTOK-D/E",
    "searchQuery": "Vostok radar",
    "wikiTitle": "Vostok_radar",
    "type": "Białoruski mobilny radar wczesnego wykrywania celów stealth",
    "year": "2007",
    "images": [],
    "onlineImages": []
  },
  "1l117m": {
    "id": "1l117m",
    "displayName": "1L117M",
    "searchQuery": "1L117 radar",
    "wikiTitle": "1L117_radar",
    "type": "Trójwspółrzędny radar kontroli przestrzeni powietrznej",
    "year": "1998",
    "images": [],
    "onlineImages": []
  },
  "rezonans-ne": {
    "id": "rezonans-ne",
    "displayName": "REZONANS-NE",
    "searchQuery": "Rezonans-NE",
    "wikiTitle": "Rezonans-NE",
    "type": "Stacjonarny radar wczesnego wykrywania celów hipersonicznych i stealth",
    "year": "2005",
    "images": [],
    "onlineImages": []
  },
  "desna-m-22zh6": {
    "id": "desna-m-22zh6",
    "displayName": "DESNA-M (22Zh6)",
    "searchQuery": "22Zh6 radar",
    "wikiTitle": "22Zh6_radar",
    "type": "Trójwspółrzędna stacja radiolokacyjna dalekiego zasięgu",
    "year": "1990",
    "images": [],
    "onlineImages": []
  },
  "gamma-de-67n6e": {
    "id": "gamma-de-67n6e",
    "displayName": "GAMMA-DE (67N6E)",
    "searchQuery": "Gamma-DE",
    "wikiTitle": "Gamma-DE",
    "type": "Mobilny trójwspółrzędny radar obrony przeciwlotniczej",
    "year": "2000",
    "images": [],
    "onlineImages": []
  },
  "gamma-s1e-64l6e": {
    "id": "gamma-s1e-64l6e",
    "displayName": "GAMMA-S1E (64L6E)",
    "searchQuery": "Gamma-S1E",
    "wikiTitle": "Gamma-S1E",
    "type": "Mobilny radar średniego i dalekiego zasięgu 64L6E",
    "year": "2003",
    "images": [],
    "onlineImages": []
  },
  "provitnik-ge-59n6-e": {
    "id": "provitnik-ge-59n6-e",
    "displayName": "PROVITNIK-GE (59N6-E)",
    "searchQuery": "59N6-E Protivnik-GE",
    "wikiTitle": "59N6-E_Protivnik-GE",
    "type": "Trójwspółrzędny radar obserwacyjny przestrzeni powietrznej",
    "year": "2000",
    "images": [],
    "onlineImages": []
  },
  "oborona-14": {
    "id": "oborona-14",
    "displayName": "OBORONA-14",
    "searchQuery": "Oborona-14",
    "wikiTitle": "Oborona-14",
    "type": "Stacja radiolokacyjna wczesnego ostrzegania 5N84A",
    "year": "1974",
    "images": [],
    "onlineImages": []
  },
  "mi-6-hook": {
    "id": "mi-6-hook",
    "displayName": "Mi-6 HOOK",
    "searchQuery": "Mil Mi-6",
    "wikiTitle": "Mil_Mi-6",
    "type": "Ciężki śmigłowiec transportowy o dużej ładowności",
    "year": "1957",
    "images": [],
    "onlineImages": []
  },
  "mi-26-halo": {
    "id": "mi-26-halo",
    "displayName": "Mi-26 HALO",
    "searchQuery": "Mil Mi-26",
    "wikiTitle": "Mil_Mi-26",
    "type": "Największy seryjnie produkowany śmigłowiec transportowy świata",
    "year": "1983",
    "images": [],
    "onlineImages": []
  },
  "ka-50-black-shark-hokum": {
    "id": "ka-50-black-shark-hokum",
    "displayName": "Ka-50 BLACK SHARK (HOKUM)",
    "searchQuery": "Kamov Ka-50",
    "wikiTitle": "Kamov_Ka-50",
    "type": "Jednomiejscowy śmigłowiec szturmowy z układem współosiowym",
    "year": "1995",
    "images": [],
    "onlineImages": []
  },
  "ka-52-aligator-hokum-b": {
    "id": "ka-52-aligator-hokum-b",
    "displayName": "Ka-52 ALIGATOR (HOKUM-B)",
    "searchQuery": "Kamov Ka-52",
    "wikiTitle": "Kamov_Ka-52",
    "type": "Dwumiejscowy śmigłowiec szturmowo-rozpoznawczy",
    "year": "2011",
    "images": [],
    "onlineImages": []
  },
  "mi-24-hind": {
    "id": "mi-24-hind",
    "displayName": "Mi-24 (HIND)",
    "searchQuery": "Mil Mi-24",
    "wikiTitle": "Mil_Mi-24",
    "type": "Ciężki śmigłowiec szturmowy z możliwością przewozu desantu",
    "year": "1972",
    "images": [],
    "onlineImages": []
  },
  "mi-28-havoc": {
    "id": "mi-28-havoc",
    "displayName": "Mi-28 (HAVOC)",
    "searchQuery": "Mil Mi-28",
    "wikiTitle": "Mil_Mi-28",
    "type": "Dedykowany śmigłowiec szturmowy do zwalczania broni pancernej",
    "year": "2009",
    "images": [],
    "onlineImages": []
  },
  "mi-2-hoplite": {
    "id": "mi-2-hoplite",
    "displayName": "Mi-2 (HOPLITE)",
    "searchQuery": "PZL Mi-2",
    "wikiTitle": "PZL_Mi-2",
    "type": "Lekki wielozadaniowy śmigłowiec dwusilnikowy",
    "year": "1965",
    "images": [],
    "onlineImages": []
  },
  "mi-8-hip-c-mi-17t-hip-h": {
    "id": "mi-8-hip-c-mi-17t-hip-h",
    "displayName": "Mi-8 (HIP-C) / Mi-17T (HIP-H)",
    "searchQuery": "Mil Mi-8",
    "wikiTitle": "Mil_Mi-8",
    "type": "Wielozadaniowy śmigłowiec transportowy i wsparcia bojowego",
    "year": "1967",
    "images": [],
    "onlineImages": []
  },
  "ka-60-orka": {
    "id": "ka-60-orka",
    "displayName": "Ka-60 (ORKA)",
    "searchQuery": "Kamov Ka-60",
    "wikiTitle": "Kamov_Ka-60",
    "type": "Wielozadaniowy śmigłowiec transportowo-rozpoznawczy",
    "year": "1998",
    "images": [],
    "onlineImages": []
  },
  "mi-8-ppa": {
    "id": "mi-8-ppa",
    "displayName": "Mi-8 PPA",
    "searchQuery": "Mil Mi-8",
    "wikiTitle": "Mil_Mi-8",
    "type": "Śmigłowiec walki elektronicznej i zakłócania stacji radiolokacyjnych",
    "year": "1980",
    "images": [],
    "onlineImages": []
  },
  "mi-8-mtpb": {
    "id": "mi-8-mtpb",
    "displayName": "Mi-8 MTPB",
    "searchQuery": "Mil Mi-8",
    "wikiTitle": "Mil_Mi-8",
    "type": "Specjalistyczny śmigłowiec zakłócający i rozpoznania radioelektronicznego",
    "year": "1985",
    "images": [],
    "onlineImages": []
  },
  "mi-24-r-rch-ra": {
    "id": "mi-24-r-rch-ra",
    "displayName": "Mi-24 R/RCh/RA",
    "searchQuery": "Mil Mi-24",
    "wikiTitle": "Mil_Mi-24",
    "type": "Śmigłowiec rozpoznania skażeń chemicznych, biologicznych i promieniotwórczych",
    "year": "1983",
    "images": [],
    "onlineImages": []
  },
  "ka-31-helix-b": {
    "id": "ka-31-helix-b",
    "displayName": "Ka-31 (HELIX B)",
    "searchQuery": "Kamov Ka-31",
    "wikiTitle": "Kamov_Ka-31",
    "type": "Śmigłowiec wczesnego ostrzegania radiolokacyjnego (AEW)",
    "year": "1995",
    "images": [],
    "onlineImages": []
  },
  "mig-21-fishbed": {
    "id": "mig-21-fishbed",
    "displayName": "MIG-21 (FISHBED)",
    "searchQuery": "Mikoyan-Gurevich MiG-21",
    "wikiTitle": "Mikoyan-Gurevich_MiG-21",
    "type": "Naddźwiękowy myśliwiec frontowy ze skrzydłem delta",
    "year": "1959",
    "images": [],
    "onlineImages": []
  },
  "mig-25-foxbat-b": {
    "id": "mig-25-foxbat-b",
    "displayName": "MIG-25 (FOXBAT-B)",
    "searchQuery": "Mikoyan-Gurevich MiG-25",
    "wikiTitle": "Mikoyan-Gurevich_MiG-25",
    "type": "Naddźwiękowy myśliwiec przechwytujący o prędkości 3 Mach",
    "year": "1970",
    "images": [],
    "onlineImages": []
  },
  "mig-31-foxhound": {
    "id": "mig-31-foxhound",
    "displayName": "MIG-31 (FOXHOUND)",
    "searchQuery": "Mikoyan MiG-31",
    "wikiTitle": "Mikoyan_MiG-31",
    "type": "Ciężki naddźwiękowy myśliwiec przechwytujący dalekiego zasięgu",
    "year": "1981",
    "images": [],
    "onlineImages": []
  },
  "su-22-fitter": {
    "id": "su-22-fitter",
    "displayName": "Su-22 (FITTER)",
    "searchQuery": "Sukhoi Su-17",
    "wikiTitle": "Sukhoi_Su-17",
    "type": "Myśliwiec bombardujący o zmiennej geometrii skrzydeł",
    "year": "1976",
    "images": [],
    "onlineImages": []
  },
  "su-24-fencer": {
    "id": "su-24-fencer",
    "displayName": "SU-24 (FENCER)",
    "searchQuery": "Sukhoi Su-24",
    "wikiTitle": "Sukhoi_Su-24",
    "type": "Naddźwiękowy bombowiec frontowy o zmiennej geometrii skrzydeł",
    "year": "1974",
    "images": [],
    "onlineImages": []
  },
  "su-27-flanker-b": {
    "id": "su-27-flanker-b",
    "displayName": "SU-27 (FLANKER-B)",
    "searchQuery": "Sukhoi Su-27",
    "wikiTitle": "Sukhoi_Su-27",
    "type": "Ciężki myśliwiec przewagi powietrznej dalekiego zasięgu",
    "year": "1985",
    "images": [],
    "onlineImages": []
  },
  "su-30sm-flanker-c": {
    "id": "su-30sm-flanker-c",
    "displayName": "SU-30SM (FLANKER-C)",
    "searchQuery": "Sukhoi Su-30",
    "wikiTitle": "Sukhoi_Su-30",
    "type": "Wielozadaniowy myśliwiec dwumiejscowy ze sterowanym wektorem ciągu",
    "year": "2012",
    "images": [],
    "onlineImages": []
  },
  "su-34-fullback": {
    "id": "su-34-fullback",
    "displayName": "SU-34 (FULLBACK)",
    "searchQuery": "Sukhoi Su-34",
    "wikiTitle": "Sukhoi_Su-34",
    "type": "Ciężki naddźwiękowy samolot uderzeniowy / bombowiec taktyczny",
    "year": "2014",
    "images": [],
    "onlineImages": []
  },
  "su-35-flanker-e": {
    "id": "su-35-flanker-e",
    "displayName": "SU-35 (FLANKER-E)",
    "searchQuery": "Sukhoi Su-35",
    "wikiTitle": "Sukhoi_Su-35",
    "type": "Zaawansowany myśliwiec wielozadaniowy generacji 4++",
    "year": "2014",
    "images": [],
    "onlineImages": []
  },
  "mig-23-flogger": {
    "id": "mig-23-flogger",
    "displayName": "MIG-23 (FLOGGER)",
    "searchQuery": "Mikoyan-Gurevich MiG-23",
    "wikiTitle": "Mikoyan-Gurevich_MiG-23",
    "type": "Myśliwiec frontowy o zmiennej geometrii skrzydeł",
    "year": "1970",
    "images": [],
    "onlineImages": []
  },
  "mig-27-flogger-d": {
    "id": "mig-27-flogger-d",
    "displayName": "MIG-27 (FLOGGER-D)",
    "searchQuery": "Mikoyan MiG-27",
    "wikiTitle": "Mikoyan_MiG-27",
    "type": "Samolot szturmowo-bombowy ze zmienną geometrią skrzydeł",
    "year": "1975",
    "images": [],
    "onlineImages": []
  },
  "mig-29-fulcrum": {
    "id": "mig-29-fulcrum",
    "displayName": "MIG-29 (FULCRUM)",
    "searchQuery": "Mikoyan MiG-29",
    "wikiTitle": "Mikoyan_MiG-29",
    "type": "Myśliwiec frontowy wysokiej manewrowości",
    "year": "1983",
    "images": [],
    "onlineImages": []
  },
  "pak-fa-t-50-fitter": {
    "id": "pak-fa-t-50-fitter",
    "displayName": "PAK FA T-50 (FITTER)",
    "searchQuery": "Sukhoi Su-57",
    "wikiTitle": "Sukhoi_Su-57",
    "type": "Myśliwiec wielozadaniowy V generacji technologii stealth",
    "year": "2020",
    "images": [],
    "onlineImages": []
  },
  "su-25tm-frogfoot": {
    "id": "su-25tm-frogfoot",
    "displayName": "SU-25TM (FROGFOOT)",
    "searchQuery": "Sukhoi Su-25",
    "wikiTitle": "Sukhoi_Su-25",
    "type": "Opancerzony samolot bliskiego wsparcia pola walki (szturmowiec)",
    "year": "1981",
    "images": [],
    "onlineImages": []
  },
  "tu-22m3-backfire": {
    "id": "tu-22m3-backfire",
    "displayName": "Tu-22M3 (BACKFIRE)",
    "searchQuery": "Tupolev Tu-22M",
    "wikiTitle": "Tupolev_Tu-22M",
    "type": "Naddźwiękowy bombowiec strategiczny dalekiego zasięgu",
    "year": "1983",
    "images": [],
    "onlineImages": []
  },
  "tu-95ms-bear": {
    "id": "tu-95ms-bear",
    "displayName": "Tu-95MS (BEAR)",
    "searchQuery": "Tupolev Tu-95",
    "wikiTitle": "Tupolev_Tu-95",
    "type": "Strategiczny samolot bombowy z silnikami turbośmigłowymi",
    "year": "1981",
    "images": [],
    "onlineImages": []
  },
  "tu-160-blackjack": {
    "id": "tu-160-blackjack",
    "displayName": "Tu-160 (BLACKJACK)",
    "searchQuery": "Tupolev Tu-160",
    "wikiTitle": "Tupolev_Tu-160",
    "type": "Naddźwiękowy ciężki bombowiec strategiczny o zmiennej geometrii",
    "year": "1987",
    "images": [],
    "onlineImages": []
  },
  "an-12-cub": {
    "id": "an-12-cub",
    "displayName": "An-12 (CUB)",
    "searchQuery": "Antonov An-12",
    "wikiTitle": "Antonov_An-12",
    "type": "Średni wojskowy samolot transportowy 4-silnikowy",
    "year": "1959",
    "images": [],
    "onlineImages": []
  },
  "an-26-curl": {
    "id": "an-26-curl",
    "displayName": "An-26 (CURL)",
    "searchQuery": "Antonov An-26",
    "wikiTitle": "Antonov_An-26",
    "type": "Lekki taktyczny samolot transportowy z tylną rampą",
    "year": "1969",
    "images": [],
    "onlineImages": []
  },
  "an-70": {
    "id": "an-70",
    "displayName": "An-70",
    "searchQuery": "Antonov An-70",
    "wikiTitle": "Antonov_An-70",
    "type": "Średni samolot transportowy z silnikami wentylatorowymi (propfan)",
    "year": "1994",
    "images": [],
    "onlineImages": []
  },
  "i-76-candid": {
    "id": "i-76-candid",
    "displayName": "Ił-76 (CANDID)",
    "searchQuery": "Ilyushin Il-76",
    "wikiTitle": "Ilyushin_Il-76",
    "type": "Ciężki 4-silnikowy odrzutowy samolot transportowy",
    "year": "1974",
    "images": [],
    "onlineImages": []
  }
};

const VEHICLE_KEYS = Object.keys(VEHICLES_DATABASE);
