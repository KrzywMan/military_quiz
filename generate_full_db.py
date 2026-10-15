# -*- coding: utf-8 -*-
import json
import re
from build_full_database import EQUIPMENT_DEFINITIONS

def make_id(name):
    # Create clean slug from name
    s = name.lower()
    s = s.replace("„", "").replace("”", "").replace('"', '').replace("'", "")
    s = s.replace("/", "-").replace(",", "-").replace("(", "-").replace(")", "-")
    s = re.sub(r'[^a-z0-9\-]+', '-', s)
    s = re.sub(r'-+', '-', s).strip('-')
    return s

database = {}

# Existing curated images for previous vehicles to preserve
existing_curated = {
    "bmp-1": [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/BWP-1_Baltops_2016_0283.jpg/800px-BWP-1_Baltops_2016_0283.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Parola_Tank_Museum_131_-_BMP-1K_%2837682181945%29.jpg/800px-Parola_Tank_Museum_131_-_BMP-1K_%2837682181945%29.jpg"
    ],
    "bmp-2": [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Army2016demo-007.jpg/800px-Army2016demo-007.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/BMP-2_IFV_at_Engineering_Technologies_2012_part_1-14.jpg/800px-BMP-2_IFV_at_Engineering_Technologies_2012_part_1-14.jpg"
    ],
    "bmp-3": [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/BMP-3_infantry_fighting_vehicle_at_Engineering_Technologies_2012_01.jpg/800px-BMP-3_infantry_fighting_vehicle_at_Engineering_Technologies_2012_01.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Army2016demo-011.jpg/800px-Army2016demo-011.jpg"
    ],
    "bwp-4-borsuk": [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/BWP_Borsuk_-_221114-Z-YU201-1007.jpg/800px-BWP_Borsuk_-_221114-Z-YU201-1007.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Polish_Army_BWP_Borsuk_right_side_NATO_Days_Ostrava-2023.jpg/800px-Polish_Army_BWP_Borsuk_right_side_NATO_Days_Ostrava-2023.jpg"
    ],
    "bmd-1": [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/BMD-1%2C_National_Museum_of_the_Great_Patriotic_War.jpg/800px-BMD-1%2C_National_Museum_of_the_Great_Patriotic_War.jpg"
    ],
    "bmd-2": [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/VDVHistorymuseum-17.jpg/800px-VDVHistorymuseum-17.jpg"
    ],
    "bmd-3": [
        "https://upload.wikimedia.org/wikipedia/commons/d/d1/BMD-3_1.jpg"
    ],
    "bmd-4": [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/TankBiathlon14final-56.jpg/800px-TankBiathlon14final-56.jpg"
    ],
    "btr-60": [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/BTR-60PB_DA-ST-89-06597.jpg/800px-BTR-60PB_DA-ST-89-06597.jpg"
    ],
    "btr-70": [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/BTR70_004.jpg/800px-BTR70_004.jpg"
    ],
    "btr-80": [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Gyumri_-_tank.jpg/800px-Gyumri_-_tank.jpg"
    ],
    "btr-82a": [
        "https://upload.wikimedia.org/wikipedia/commons/c/c3/BTR-82AT_during_the_%22Armiya_2021%22_exhibition.jpg"
    ],
    "btr-90": [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/TB2015ExhibitionP1-21.jpg/800px-TB2015ExhibitionP1-21.jpg"
    ]
}

seen_ids = set()

for displayName, searchQuery, catType, year in EQUIPMENT_DEFINITIONS:
    slug = make_id(displayName)
    if slug in seen_ids:
        # disambiguate if necessary
        slug = f"{slug}-alt"
    seen_ids.add(slug)

    online_imgs = existing_curated.get(slug, [])

    database[slug] = {
        "id": slug,
        "displayName": displayName,
        "searchQuery": searchQuery,
        "wikiTitle": searchQuery.replace(" ", "_"),
        "type": catType,
        "year": year,
        "images": [],
        "onlineImages": online_imgs
    }

print(f"Generated {len(database)} entries for VEHICLES_DATABASE.")

# Write as valid JavaScript file
with open("C:/Users/komputer/.gemini/antigravity/scratch/military_quiz_app/vehicles_data.js", "w", encoding="utf-8") as f:
    f.write("// Baza sprzętu wojskowego dla Quizu Militarnego (149 pojazdów i systemów bojowych)\n")
    f.write("// Obsługuje dynamiczne wyszukiwanie w locie w Wikimedia/Wikipedia API oraz bezpieczne fallbacki\n\n")
    f.write("const VEHICLES_DATABASE = ")
    f.write(json.dumps(database, indent=2, ensure_ascii=False))
    f.write(";\n\n")
    f.write("const VEHICLE_KEYS = Object.keys(VEHICLES_DATABASE);\n")

print("Successfully wrote vehicles_data.js!")
