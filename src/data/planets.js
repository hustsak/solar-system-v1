export const PLANETS_DATA = [
  {
    id: "sun",
    order: 0,
    r: 4.8,
    dist: 0,
    color: 0xffaa00,
    hexColor: "#fbbf24",
    gradient: "radial-gradient(circle at 35% 35%, #fff7aa, #fbbf24 35%, #ea580c 75%, #7c2d12)",
    speed: 0,
    hasMoon: false,
    hasRings: false,
    names: { en: "The Sun", km: "ព្រះអាទិត្យ" },
    tagline: {
      en: "The incandescent yellow dwarf star at the heart of our celestial neighborhood.",
      km: "ផ្កាយតឿពណ៌លឿងដ៏ក្តៅគគុកដែលជាបេះដូងនៃប្រព័ន្ធព្រះអាទិត្យរបស់យើង។"
    },
    description: {
      en: "The Sun is a G-type main-sequence star that accounts for approximately 99.86% of the total mass in the Solar System. Through nuclear fusion in its core, converting roughly 600 million tons of hydrogen into helium every second, it radiates electromagnetic energy that powers climate, biology, and all life on Earth.",
      km: "ព្រះអាទិត្យ គឺជាផ្កាយប្រភេទ G-type main-sequence ដែលក្តោបក្តាប់រហូតដល់ប្រមាណ ៩៩.៨៦% នៃម៉ាស់សរុបនៃប្រព័ន្ធព្រះអាទិត្យ។ តាមរយៈប្រតិកម្មនុយក្លេអ៊ែរហ្វូស៊ីលនៅស្នូល ដែលបំប្លែងឧស្ម័នអ៊ីដ្រូសែនប្រមាណ ៦០០ លានតោនទៅជាអេល្យូមក្នុងមួយវិនាទី វាបានបញ្ចេញថាមពលអេឡិចត្រូម៉ាញ៉េទិចដែលទ្រទ្រង់អាកាសធាតុ ជីវសាស្ត្រ និងជីវិតទាំងអស់នៅលើផែនដី។"
    },
    type: { en: "Yellow Dwarf Star (G2V)", km: "ផ្កាយតឿពណ៌លឿង (G2V)" },
    stats: {
      diameter: { en: "1,392,700 km (109 × Earth)", km: "១ ៣៩២ ៧០០ គ.ម (១០៩ ដងនៃផែនដី)" },
      distance: { en: "0 km (Center of System)", km: "០ គ.ម (ចំណុចកណ្តាលប្រព័ន្ធ)" },
      orbitalPeriod: { en: "~230 million years (Galactic Orbit)", km: "ប្រហែល ២៣០ លានឆ្នាំ (ជុំវិញកាឡាក់ស៊ី)" },
      rotationPeriod: { en: "25–35 Earth days (Differential)", km: "២៥ ដល់ ៣៥ ថ្ងៃផែនដី (វិលមិនស្មើគ្នា)" },
      temperature: { en: "5,500°C (Surface) / 15,000,000°C (Core)", km: "៥ ៥០០°C (ផ្ទៃក្រៅ) / ១៥ ០០០ ០០០°C (ស្នូល)" },
      moons: { en: "8 Planets, 5 Dwarf Planets", km: "ភពធំ ៨, ភពតឿ ៥" },
      gravity: { en: "274 m/s² (28 × Earth)", km: "២៧៤ ម៉ែត្រ/វិនាទី² (២៨ ដងនៃផែនដី)" },
      mass: { en: "333,000 × Earth", km: "៣៣៣ ០០០ ដងនៃផែនដី" },
      ringSystem: { en: "None", km: "គ្មាន" }
    },
    atmosphere: {
      en: "Photosphere, Chromosphere, Transition Region, and Corona. Composed of 73% Hydrogen, 25% Helium, and trace amounts of Oxygen, Carbon, Neon, and Iron.",
      km: "ស្រទាប់ Photosphere, Chromosphere, តំបន់ផ្លាស់ប្តូរ និង Corona។ ផ្សំឡើងពី អ៊ីដ្រូសែន ៧៣%, អេល្យូម ២៥%, និងធាតុផ្សំតិចតួចដូចជា អុកស៊ីសែន កាបូន ណេអុង និងដែក។"
    },
    surface: {
      en: "Plasma fluid ocean with intense convective cells (granules), complex magnetic loops, solar flares, and sunspots.",
      km: "ជាសមុទ្រប្លាស្មាដែលមានចរន្តកម្ដៅ (Granules) រង្វិលជុំដែនម៉ាញ៉េទិចដ៏ស្មុគស្មាញ អណ្តាតភ្លើងព្រះអាទិត្យ និងចំណុចខ្មៅ (Sunspots)។"
    },
    facts: {
      en: [
        "Around 1.3 million Earths could fit inside the Sun.",
        "Light leaving the Sun's surface takes exactly 8 minutes and 20 seconds to reach Earth.",
        "The Sun loses roughly 4 million tons of mass every single second converted directly into pure radiant energy (E=mc²)."
      ],
      km: [
        "ផែនដីប្រមាណ ១.៣ លានអាចដាក់បញ្ចូលក្នុងព្រះអាទិត្យបាន។",
        "ពន្លឺដែលចាកចេញពីផ្ទៃព្រះអាទិត្យ ចំណាយពេល ៨ នាទី និង ២០ វិនាទី ដើម្បីមកដល់ផែនដី។",
        "ព្រះអាទិត្យបាត់បង់ម៉ាស់ប្រមាណ ៤ លានតោនក្នុងមួយវិនាទី ដែលត្រូវបានបំប្លែងទៅជាថាមពលពន្លឺសុទ្ធ (E=mc²)។"
      ]
    },
    missions: {
      en: [
        "Parker Solar Probe (NASA, 2018–Present) — Touched the solar corona closer than any previous spacecraft.",
        "Solar Orbiter (ESA/NASA, 2020) — High-resolution imaging of solar poles.",
        "SOHO (ESA/NASA, 1995) — Decades of continuous solar storm monitoring."
      ],
      km: [
        "Parker Solar Probe (NASA, ២០១៨-បច្ចុប្បន្ន) — ចូលទៅកៀកស្រទាប់ Corona បំផុតក្នុងប្រវត្តិសាស្ត្រ។",
        "Solar Orbiter (ESA/NASA, ២០២០) — ថតយករូបភាពប៉ូលព្រះអាទិត្យក្នុងកម្រិតច្បាស់ខ្ពស់។",
        "SOHO (ESA/NASA, ១៩៩៥) — តាមដានខ្យល់ព្យុះព្រះអាទិត្យជាបន្តបន្ទាប់រាប់ទសវត្សរ៍។"
      ]
    }
  },
  {
    id: "mercury",
    order: 1,
    r: 0.7,
    dist: 9,
    color: 0xa1a1aa,
    hexColor: "#a1a1aa",
    gradient: "radial-gradient(circle at 35% 35%, #e5e7eb, #9ca3af 40%, #4b5563 75%, #1f2937)",
    speed: 0.024,
    hasMoon: false,
    hasRings: false,
    names: { en: "Mercury", km: "ភពពុធ" },
    tagline: {
      en: "The swift, crater-scarred world closest to the blazing solar furnaces.",
      km: "ពិភពលោកតូចលឿនរហ័ស សំបូរដោយរណ្ដៅអាចម៍ផ្កាយ និងនៅជិតព្រះអាទិត្យបំផុត។"
    },
    description: {
      en: "Mercury is the smallest planet in our solar system and the closest to the Sun. Only slightly larger than Earth's Moon, its surface is heavily cratered from billions of years of meteorite impacts. It has virtually no atmosphere to trap heat, causing wild temperature fluctuations.",
      km: "ភពពុធ គឺជាភពតូចបំផុតនៅក្នុងប្រព័ន្ធព្រះអាទិត្យ និងនៅកៀកព្រះអាទិត្យជាងគេ។ វាមានទំហំធំជាងព្រះចន្ទរបស់ផែនដីតែបន្តិចប៉ុណ្ណោះ ហើយផ្ទៃរបស់វាពោរពេញដោយរណ្ដៅអាចម៍ផ្កាយរាប់ពាន់លានឆ្នាំ។ ដោយសារគ្មានបរិយាកាសដើម្បីទប់កម្ដៅ សីតុណ្ហភាពរបស់វាប្រែប្រួលខ្លាំងបំផុតរវាងថ្ងៃ និងយប់។"
    },
    type: { en: "Terrestrial Rocky Planet", km: "ភពថ្ម (Terrestrial)" },
    stats: {
      diameter: { en: "4,879 km (0.38 × Earth)", km: "៤ ៨៧៩ គ.ម (០.៣៨ ដងនៃផែនដី)" },
      distance: { en: "57.9 million km (0.39 AU)", km: "៥៧.៩ លាន គ.ម (០.៣៩ AU)" },
      orbitalPeriod: { en: "88 Earth days", km: "៨៨ ថ្ងៃផែនដី" },
      rotationPeriod: { en: "58.6 Earth days", km: "៥៨.៦ ថ្ងៃផែនដី" },
      temperature: { en: "-180°C to +430°C", km: "-១៨០°C ដល់ +៤៣០°C" },
      moons: { en: "0 confirmed moons", km: "០ (គ្មានព្រះចន្ទ)" },
      gravity: { en: "3.7 m/s² (0.38 × Earth)", km: "៣.៧ ម៉ែត្រ/វិនាទី² (០.៣៨ ដងនៃផែនដី)" },
      mass: { en: "0.055 × Earth", km: "០.០៥៥ ដងនៃផែនដី" },
      ringSystem: { en: "None", km: "គ្មាន" }
    },
    atmosphere: {
      en: "Ultra-thin exosphere containing trace Oxygen, Sodium, Hydrogen, Helium, and Potassium blown off by solar wind.",
      km: "ស្រទាប់បរិយាកាសស្តើងបំផុត (Exosphere) មានផ្ទុកអុកស៊ីសែន សូដ្យូម អ៊ីដ្រូសែន អេល្យូម និងប៉ូតាស្យូម ដែលត្រូវខ្យល់ព្រះអាទិត្យបក់បោកជាប្រចាំ។"
    },
    surface: {
      en: "Silicate crust and rocky mantle over an enormous metallic iron core that accounts for 85% of the planet's radius. Heavy impact basins like the Caloris Basin.",
      km: "សំបកថ្មស៊ីលីកាត និងស្រទាប់ម៉ង់តូ គ្របពីលើស្នូលដែកដ៏ធំសម្បើមដែលស្មើនឹង ៨៥% នៃកាំរបស់ភព។ មានរណ្ដៅប៉ះទង្គិចធំៗ ដូចជារណ្ដៅ Caloris Basin។"
    },
    facts: {
      en: [
        "A year on Mercury is just 88 days, but a single solar day (noon to noon) lasts 176 Earth days!",
        "Despite being nearest to the Sun, water ice exists permanently inside deep, permanently shadowed polar craters.",
        "Mercury has shrunk by about 7 kilometers in radius as its massive iron core slowly cooled over eons."
      ],
      km: [
        "មួយឆ្នាំនៅលើភពពុធមានត្រឹមតែ ៨៨ ថ្ងៃ ប៉ុន្តែមួយថ្ងៃពន្លឺព្រះអាទិត្យ (ពីថ្ងៃត្រង់មួយទៅថ្ងៃត្រង់បន្ទាប់) មានរយៈពេលដល់ទៅ ១៧៦ ថ្ងៃផែនដី!",
        "ទោះបីជានៅជិតព្រះអាទិត្យបំផុតក៏ដោយ ក៏មានដុំទឹកកកស្ថិតនៅជាអចិន្ត្រៃយ៍ក្នុងរណ្ដៅជ្រៅៗនៅតំបន់ប៉ូលដែលគ្មានពន្លឺចាំងដល់។",
        "ភពពុធបានរួញទំហំកាំប្រហែល ៧ គីឡូម៉ែត្រ ដោយសារស្នូលដែកដ៏ធំរបស់វាចុះត្រជាក់បន្តិចម្តងៗរាប់ពាន់លានឆ្នាំ។"
      ]
    },
    missions: {
      en: [
        "Mariner 10 (NASA, 1974–1975) — First spacecraft to perform flybys and map 45% of the surface.",
        "MESSENGER (NASA, 2011–2015) — First probe to orbit Mercury, mapping the entire globe in high definition.",
        "BepiColombo (ESA/JAXA, launched 2018) — In transit, scheduled to enter permanent orbit in 2026."
      ],
      km: [
        "Mariner 10 (NASA, ១៩៧៤–១៩៧៥) — យានដំបូងគេដែលបានហោះកាត់ និងគូសផែនទី ៤៥% នៃផ្ទៃភព។",
        "MESSENGER (NASA, ២០១១–២០១៥) — យានដំបូងគេដែលគោចរជុំវិញភពពុធ និងថតផែនទីលម្អិតទូទាំងភព។",
        "BepiColombo (ESA/JAXA, បាញ់បង្ហោះ ២០១៨) — កំពុងធ្វើដំណើរ និងគ្រោងនឹងចូលគន្លងគោចរនៅឆ្នាំ ២០២៦។"
      ]
    }
  },
  {
    id: "venus",
    order: 2,
    r: 1.1,
    dist: 14,
    color: 0xfbbf24,
    hexColor: "#f59e0b",
    gradient: "radial-gradient(circle at 35% 35%, #fef3c7, #fde68a 35%, #f59e0b 70%, #92400e)",
    speed: 0.018,
    hasMoon: false,
    hasRings: false,
    names: { en: "Venus", km: "ភពសុក្រ" },
    tagline: {
      en: "Earth's greenhouse twin, wrapped in toxic clouds and crushing atmospheric pressure.",
      km: "ភពភ្លោះនៃផែនដី ប៉ុន្តែមានផ្ទុកឧស្ម័នផ្ទះកញ្ចក់ពុល និងសម្ពាធបរិយាកាសដ៏សែនធ្ងន់។"
    },
    description: {
      en: "Venus is often called Earth's twin because of their similar size, mass, and bulk composition. However, it is the hottest planet in the Solar System due to a runaway greenhouse effect created by a dense carbon dioxide atmosphere and sulfuric acid clouds.",
      km: "ភពសុក្រ តែងតែត្រូវបានគេហៅថាជាភពភ្លោះរបស់ផែនដី ដោយសារមានទំហំ ម៉ាស់ និងដង់ស៊ីតេប្រហាក់ប្រហែលគ្នា។ ទោះជាយ៉ាងណា វាជាភពដែលក្តៅជាងគេបំផុតក្នុងប្រព័ន្ធព្រះអាទិត្យ ដោយសារឥទ្ធិពលផ្ទះកញ្ចក់ដ៏ធ្ងន់ធ្ងរពីបរិយាកាសកាបូនឌីអុកស៊ីត និងពពកអាស៊ីតស៊ុលហ្វួរិក។"
    },
    type: { en: "Terrestrial Rocky Planet", km: "ភពថ្ម (Terrestrial)" },
    stats: {
      diameter: { en: "12,104 km (0.95 × Earth)", km: "១២ ១០៤ គ.ម (០.៩៥ ដងនៃផែនដី)" },
      distance: { en: "108.2 million km (0.72 AU)", km: "១០៨.២ លាន គ.ម (០.៧២ AU)" },
      orbitalPeriod: { en: "224.7 Earth days", km: "២២៤.៧ ថ្ងៃផែនដី" },
      rotationPeriod: { en: "243 Earth days (Retrograde)", km: "២៤៣ ថ្ងៃផែនដី (វិលច្រាសទិស)" },
      temperature: { en: "465°C (Average constant)", km: "៤៦៥°C (ក្តៅថេរទាំងយប់ទាំងថ្ងៃ)" },
      moons: { en: "0 confirmed moons", km: "០ (គ្មានព្រះចន្ទ)" },
      gravity: { en: "8.87 m/s² (0.91 × Earth)", km: "៨.៨៧ ម៉ែត្រ/វិនាទី² (០.៩១ ដងនៃផែនដី)" },
      mass: { en: "0.815 × Earth", km: "០.៨១៥ ដងនៃផែនដី" },
      ringSystem: { en: "None", km: "គ្មាន" }
    },
    atmosphere: {
      en: "Super-dense atmosphere: 96.5% Carbon Dioxide, 3.5% Nitrogen, with opaque reflective clouds of concentrated sulfuric acid droplets.",
      km: "បរិយាកាសក្រាស់ខ្លាំង៖ កាបូនឌីអុកស៊ីត ៩៦.៥%, អាសូត ៣.៥% និងស្រទាប់ពពកអាស៊ីតស៊ុលហ្វួរិកខាប់ដែលជះពន្លឺយ៉ាងខ្លាំង។"
    },
    surface: {
      en: "Vast volcanic plains, thousands of extinct and possibly active volcanoes (like Maat Mons), highland plateaus, and tectonic rift valleys under 92 atmospheres of pressure.",
      km: "វាលទំនាបភ្នំភ្លើងដ៏ធំល្វឹងល្វើយ ភ្នំភ្លើងរាប់ពាន់ (ដូចជា Maat Mons) ខ្ពង់រាប និងជ្រលងប្រេះបែក tectonic ក្រោមសម្ពាធ ៩២ ដងនៃផែនដី។"
    },
    facts: {
      en: [
        "Venus spins backward compared to most planets (retrograde rotation), meaning the Sun rises in the west and sets in the east.",
        "Surface pressure is 92 times greater than Earth's sea level—equivalent to being 900 meters deep underwater.",
        "Lead, tin, and zinc would melt into liquid puddles on the bare rocks of Venus."
      ],
      km: [
        "ភពសុក្រវិលជុំវិញខ្លួនឯងច្រាសទិសពីភពភាគច្រើន (វិលពីកើតទៅលិច) មានន័យថាព្រះអាទិត្យរះនៅទិសខាងលិច និងលិចនៅទិសខាងកើត។",
        "សម្ពាធលើផ្ទៃភពសុក្រ ស្មើនឹង ៩២ ដងនៃសម្ពាធនីវ៉ូទឹកសមុទ្រលើផែនដី ដែលប្រៀបដូចជាការមុជទឹកជម្រៅ ៩០០ ម៉ែត្រ។",
        "លោហៈសំណ និងស័ង្កសី នឹងរលាយក្លាយជារាវភ្លាមៗ ប្រសិនបើតម្កល់នៅលើថ្មនៃភពសុក្រ។"
      ]
    },
    missions: {
      en: [
        "Venera 7 & 13 (USSR, 1970/1982) — First landers to transmit audio, color panoramas, and survive the extreme heat.",
        "Magellan (NASA, 1990–1994) — Radar-mapped 98% of the surface through the thick cloud layer.",
        "DAVINCI & VERITAS (NASA/ESA, 2030s) — Upcoming atmospheric probes and high-res geological radar orbiters."
      ],
      km: [
        "Venera 7 & 13 (សហភាពសូវៀត, ១៩៧០/១៩៨២) — យានដំបូងគេដែលបានចុះចត បញ្ជូនរូបភាពពណ៌ និងសម្លេងពីផ្ទៃភពសុក្រ។",
        "Magellan (NASA, ១៩៩០–១៩៩៤) — ប្រើរ៉ាដាដើម្បីថតផែនទីផ្ទៃភពបាន ៩៨% ឆ្លងកាត់ស្រទាប់ពពកក្រាស់។",
        "DAVINCI & VERITAS (NASA/ESA, ២០៣០s) — បេសកកម្មនាពេលអនាគតដើម្បីសិក្សាបរិយាកាស និងភូគព្ភសាស្ត្រលម្អិត។"
      ]
    }
  },
  {
    id: "earth",
    order: 3,
    r: 1.25,
    dist: 20,
    color: 0x38bdf8,
    hexColor: "#38bdf8",
    gradient: "radial-gradient(circle at 35% 35%, #93c5fd, #38bdf8 30%, #15803d 55%, #1d4ed8 80%, #0c4a6e)",
    speed: 0.014,
    hasMoon: true,
    hasRings: false,
    names: { en: "Earth", km: "ផែនដី" },
    tagline: {
      en: "Our vibrant blue oasis—the only known cradle of life and surface liquid oceans.",
      km: "ជម្រកពណ៌ខៀវដ៏រស់រវើករបស់យើង — ពិភពលោកតែមួយគត់ដែលត្រូវបានស្គាល់ថាមានជីវិត និងមហាសមុទ្ររាវ។"
    },
    description: {
      en: "Earth is the third planet from the Sun and the only astronomical object known to harbor life. With 71% of its surface covered by liquid water and an oxygen-rich atmosphere protected by an active magnetosphere, it provides the perfect ecosystem for millions of species.",
      km: "ផែនដី គឺជាភពទីបីពីព្រះអាទិត្យ និងជាវត្ថុតារាសាស្ត្រតែមួយគត់ក្នុងចក្រវាឡដែលត្រូវបានរកឃើញថាមានជីវិតរស់នៅ។ ជាមួយនឹង ៧១% នៃផ្ទៃគ្របដណ្ដប់ដោយទឹកសមុទ្ររាវ និងបរិយាកាសសម្បូរអុកស៊ីសែនដែលការពារដោយដែនម៉ាញ៉េទិចសកម្ម វាផ្តល់នូវប្រព័ន្ធអេកូឡូស៊ីដ៏ល្អឥតខ្ចោះសម្រាប់ជីវិតរាប់លានប្រភេទ។"
    },
    type: { en: "Terrestrial Ocean Planet", km: "ភពថ្មមហាសមុទ្រ (Terrestrial Ocean)" },
    stats: {
      diameter: { en: "12,742 km (1.00 × Earth)", km: "១២ ៧៤២ គ.ម (ស្តង់ដារ ១.០០)" },
      distance: { en: "149.6 million km (1.00 AU)", km: "១៤៩.៦ លាន គ.ម (១.០០ AU)" },
      orbitalPeriod: { en: "365.25 days (1 Year)", km: "៣៦៥.២៥ ថ្ងៃ (១ ឆ្នាំ)" },
      rotationPeriod: { en: "23 hours 56 minutes 4 seconds", km: "២៣ ម៉ោង ៥៦ នាទី ៤ វិនាទី" },
      temperature: { en: "15°C (Global mean, -88°C to +58°C)", km: "១៥°C (មធ្យមសកល, -៨៨°C ដល់ +៥៨°C)" },
      moons: { en: "1 confirmed moon (The Moon / ព្រះចន្ទ)", km: "១ (ព្រះចន្ទ)" },
      gravity: { en: "9.807 m/s² (1.00 g)", km: "៩.៨០៧ ម៉ែត្រ/វិនាទី² (១.០០ g)" },
      mass: { en: "5.97 × 10²⁴ kg (1.00 × Earth)", km: "៥.៩៧ × ១០²⁴ គ.ក (១.០០)" },
      ringSystem: { en: "None", km: "គ្មាន" }
    },
    atmosphere: {
      en: "78% Nitrogen, 21% Oxygen, 0.9% Argon, 0.04% Carbon Dioxide, with vital water vapor and protective ozone (O₃) layer.",
      km: "អាសូត ៧៨%, អុកស៊ីសែន ២១%, អាហ្គុង ០.៩%, កាបូនឌីអុកស៊ីត ០.០៤%, ព្រមទាំងចំហាយទឹក និងស្រទាប់អូហ្សូន (O₃) ការពារកាំរស្មីស្វាយអ៊ុលត្រា។"
    },
    surface: {
      en: "Active tectonic plates shaping continents, deep oceanic trenches, mountain ranges, polar ice sheets, and fertile biomes.",
      km: "ផ្លាកតិចតូនិចសកម្មដែលបង្កើតទ្វីប ជ្រលងជ្រៅក្នុងបាតសមុទ្រ ជួរភ្នំ ផ្ទាំងទឹកកកប៉ូល និងតំបន់ជីវចម្រុះដ៏សម្បូរបែប។"
    },
    facts: {
      en: [
        "Earth is not a perfect sphere; its rotation causes a slight bulge at the equator (oblate spheroid).",
        "The Earth's molten iron core generates a geomagnetic shield that deflects deadly cosmic rays and solar winds.",
        "Earth is the densest major planet in the entire Solar System at 5.515 g/cm³."
      ],
      km: [
        "ផែនដីមិនមែនជារាងស្វ៊ែរមូលឥតខ្ចោះទេ ប៉ុន្តែប៉ោងបន្តិចត្រង់ខ្សែអេក្វាទ័រដោយសារការវិលជុំវិញខ្លួនឯង។",
        "ស្នូលដែករាវរបស់ផែនដីបង្កើតដែនម៉ាញ៉េទិចការពារជីវិតពីកាំរស្មីលោហធាតុ និងព្យុះព្រះអាទិត្យ។",
        "ផែនដីជាភពដែលមានដង់ស៊ីតេខ្ពស់បំផុតក្នុងចំណោមភពទាំង ៨ គឺ ៥.៥១៥ ក្រាម/សង់ទីម៉ែត្រគូប។"
      ]
    },
    missions: {
      en: [
        "International Space Station (ISS, 2000–Present) — Continuous human presence conducting microgravity research.",
        "Earth Observing Fleet (NASA/ESA) — Hundreds of environmental satellites tracking climate, oceans, and forests.",
        "Artemis Program (2024+) — Testing lunar exploration systems from Earth's orbital infrastructure."
      ],
      km: [
        "ស្ថានីយអវកាសអន្តរជាតិ (ISS, ២០០០–បច្ចុប្បន្ន) — មនុស្សរស់នៅ និងស្រាវជ្រាវវិទ្យាសាស្ត្រក្នុងលំហជាបន្តបន្ទាប់។",
        "ផ្កាយរណបសង្កេតការណ៍ផែនដី (NASA/ESA) — ផ្កាយរណបរាប់រយតាមដានអាកាសធាតុ មហាសមុទ្រ និងព្រៃឈើ។",
        "កម្មវិធី Artemis (២០២៤+) — សាកល្បងបច្ចេកវិទ្យាដើម្បីបញ្ជូនមនុស្សទៅកាន់ឋានព្រះចន្ទ និងភពអង្គារ។"
      ]
    }
  },
  {
    id: "mars",
    order: 4,
    r: 0.85,
    dist: 26,
    color: 0xf97316,
    hexColor: "#ea580c",
    gradient: "radial-gradient(circle at 35% 35%, #fdba74, #f97316 40%, #c2410c 75%, #431407)",
    speed: 0.011,
    hasMoon: false,
    hasRings: false,
    names: { en: "Mars", km: "ភពអង្គារ" },
    tagline: {
      en: "The Red Planet—a dusty, cold desert world holding tantalizing clues of ancient water.",
      km: "ភពក្រហម — ពិភពវាលខ្សាច់ត្រជាក់ដែលផ្ទុកតម្រុយបុរាណនៃប្រភពទឹក និងជីវិត។"
    },
    description: {
      en: "Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System. Its signature reddish hue comes from oxidized iron (rust) across its soil. Mars hosts the Solar System's tallest volcano, Olympus Mons, and the deepest canyon system, Valles Marineris.",
      km: "ភពអង្គារ គឺជាភពទីបួនពីព្រះអាទិត្យ និងជាភពតូចទីពីរក្នុងប្រព័ន្ធព្រះអាទិត្យ។ ពណ៌ក្រហមដ៏លេចធ្លោរបស់វាបណ្តាលមកពីច្រែះដែក (Iron Oxide) នៅលើដីខ្សាច់។ ភពអង្គារមានភ្នំភ្លើងខ្ពស់ជាងគេក្នុងប្រព័ន្ធព្រះអាទិត្យ គឺភ្នំ Olympus Mons និងជ្រលងភ្នំជ្រៅបំផុត Valles Marineris។"
    },
    type: { en: "Terrestrial Desert Planet", km: "ភពថ្មវាលខ្សាច់ (Terrestrial Desert)" },
    stats: {
      diameter: { en: "6,779 km (0.53 × Earth)", km: "៦ ៧៧៩ គ.ម (០.៥៣ ដងនៃផែនដី)" },
      distance: { en: "227.9 million km (1.52 AU)", km: "២២៧.៩ លាន គ.ម (១.៥២ AU)" },
      orbitalPeriod: { en: "687 Earth days (1.88 Years)", km: "៦៨៧ ថ្ងៃផែនដី (១.៨៨ ឆ្នាំ)" },
      rotationPeriod: { en: "24 hours 37 minutes (1 Sol)", km: "២៤ ម៉ោង ៣៧ នាទី (១ Sol)" },
      temperature: { en: "-63°C (Average, -140°C to +20°C)", km: "-៦៣°C (មធ្យម, -១៤០°C ដល់ +២០°C)" },
      moons: { en: "2 confirmed moons (Phobos & Deimos)", km: "២ (Phobos និង Deimos)" },
      gravity: { en: "3.72 m/s² (0.38 × Earth)", km: "៣.៧២ ម៉ែត្រ/វិនាទី² (០.៣៨ ដងនៃផែនដី)" },
      mass: { en: "0.107 × Earth", km: "០.១០៧ ដងនៃផែនដី" },
      ringSystem: { en: "None", km: "គ្មាន" }
    },
    atmosphere: {
      en: "Thin atmosphere: 95.3% Carbon Dioxide, 2.6% Nitrogen, 1.9% Argon, with trace Water Vapor and frequent global dust storms.",
      km: "បរិយាកាសស្តើង៖ កាបូនឌីអុកស៊ីត ៩៥.៣%, អាសូត ២.៦%, អាហ្គុង ១.៩% និងមានខ្យល់ព្យុះធូលីបោកបក់ទូទាំងភពជាញឹកញាប់។"
    },
    surface: {
      en: "Dry basaltic crust rich in iron oxide dust, ancient dried river valleys, giant impact basins, and polar caps of water ice and dry ice (CO₂).",
      km: "ផ្ទៃបាសាល់ស្ងួតសម្បូរដោយច្រែះដែក មានស្នាមជ្រលងទន្លេបុរាណ រណ្ដៅធំៗ និងស្រទាប់ទឹកកកនៅប៉ូលទាំងពីរ (ទឹកកកធម្មតា និងទឹកកកស្ងួត CO₂)។"
    },
    facts: {
      en: [
        "Olympus Mons stands 21.9 km high—nearly three times taller than Mount Everest on Earth!",
        "Valles Marineris stretches over 4,000 km long, running as wide as the entire continental United States.",
        "Sunsets on Mars appear distinctly blue due to atmospheric light scattering by fine dust."
      ],
      km: [
        "ភ្នំភ្លើង Olympus Mons មានកម្ពស់ ២១.៩ គីឡូម៉ែត្រ — ខ្ពស់ជាងភ្នំអេវឺរ៉េស្តលើផែនដីជិតបីដង!",
        "ជ្រលងភ្នំ Valles Marineris មានប្រវែងជាង ៤ ០០០ គីឡូម៉ែត្រ លាតសន្ធឹងស្មើនឹងទទឹងទ្វីបអាមេរិកទាំងមូល។",
        "ថ្ងៃលិចនៅលើភពអង្គារមានពណ៌ខៀវស្រាល ដោយសារតែភាគល្អិតធូលីក្នុងបរិយាកាសបំបែកពន្លឺ។"
      ]
    },
    missions: {
      en: [
        "Perseverance & Ingenuity (NASA, 2021–Present) — Searching for ancient biosignatures and first powered flight on another planet.",
        "Curiosity Rover (NASA, 2012–Present) — Proven Mars once had lakes suitable for microbial life.",
        "Hope Probe (UAE) & Tianwen-1 (China, 2021) — Multi-national orbital and surface scientific exploration."
      ],
      km: [
        "Perseverance & Ingenuity (NASA, ២០២១–បច្ចុប្បន្ន) — ស្វែងរកស្លាកស្នាមជីវិតបុរាណ និងហោះហើរប្លាតដំបូងលើភពផ្សេង។",
        "Curiosity Rover (NASA, ២០១២–បច្ចុប្បន្ន) — បានបង្ហាញថាភពអង្គារធ្លាប់មានបឹងទឹកដែលអាចទ្រទ្រង់ជីវិតអតិសុខុមប្រាណ។",
        "Hope Probe (UAE) & Tianwen-1 (ចិន, ២០២១) — ការស្រាវជ្រាវអន្តរជាតិលើគន្លង និងផ្ទៃភព។"
      ]
    }
  },
  {
    id: "jupiter",
    order: 5,
    r: 2.8,
    dist: 38,
    color: 0xeab308,
    hexColor: "#ca8a04",
    gradient: "radial-gradient(circle at 35% 35%, #fef08a, #ea580c 35%, #ca8a04 60%, #7c2d12 85%)",
    speed: 0.007,
    hasMoon: false,
    hasRings: false,
    names: { en: "Jupiter", km: "ភពព្រហស្បតិ៍" },
    tagline: {
      en: "The undisputed monarch of the planets—a swirling giant with a storm older than centuries.",
      km: "ស្តេចនៃភពទាំងឡាយ — ភពឧស្ម័នយក្សដ៏មានឥទ្ធិពល ជាមួយនឹងព្យុះដ៏កាចសាហាវរាប់រយឆ្នាំ។"
    },
    description: {
      en: "Jupiter is by far the largest planet in our solar system, with more than twice the mass of all other planets combined. A gas giant composed mostly of hydrogen and helium, its outer atmosphere features iconic colorful cloud belts, turbulent jet streams, and the Great Red Spot.",
      km: "ភពព្រហស្បតិ៍ គឺជាភពដែលធំជាងគេបំផុតក្នុងប្រព័ន្ធព្រះអាទិត្យ ដោយមានម៉ាស់ច្រើនជាងភពដទៃទៀតទាំងអស់បូកបញ្ចូលគ្នាជាងពីរដង។ ជាភពឧស្ម័នយក្សដែលផ្សំឡើងភាគច្រើនពីអ៊ីដ្រូសែន និងអេល្យូម បរិយាកាសខាងក្រៅរបស់វាមានខ្សែក្រវាត់ពពកពណ៌ចម្រុះ និងចំណុចក្រហមយក្ស (Great Red Spot)។"
    },
    type: { en: "Gas Giant Planet", km: "ភពឧស្ម័នយក្ស (Gas Giant)" },
    stats: {
      diameter: { en: "139,820 km (11.0 × Earth)", km: "១៣៩ ៨២០ គ.ម (១១.០ ដងនៃផែនដី)" },
      distance: { en: "778.5 million km (5.20 AU)", km: "៧៧៨.៥ លាន គ.ម (៥.២០ AU)" },
      orbitalPeriod: { en: "11.86 Earth years", km: "១១.៨៦ ឆ្នាំផែនដី" },
      rotationPeriod: { en: "9 hours 55 minutes (Fastest)", km: "៩ ម៉ោង ៥៥ នាទី (លឿនជាងគេបំផុត)" },
      temperature: { en: "-110°C (Cloud tops)", km: "-១១០°C (កំពូលពពក)" },
      moons: { en: "95 confirmed moons (Io, Europa, Ganymede, Callisto...)", km: "៩៥ (Io, Europa, Ganymede, Callisto...)" },
      gravity: { en: "24.79 m/s² (2.53 × Earth)", km: "២៤.៧៩ ម៉ែត្រ/វិនាទី² (២.៥៣ ដងនៃផែនដី)" },
      mass: { en: "317.8 × Earth", km: "៣១៧.៨ ដងនៃផែនដី" },
      ringSystem: { en: "Faint dust ring system", km: "មានកងធូលីស្តើងៗ" }
    },
    atmosphere: {
      en: "90% Molecular Hydrogen, 10% Helium, with clouds of Ammonia crystals, Ammonium hydrosulfide, and Water vapor.",
      km: "អ៊ីដ្រូសែន ៩០%, អេល្យូម ១០% និងពពកនៃគ្រីស្តាល់អាម៉ូញាក់ អាម៉ូញ៉ូមអ៊ីដ្រូស៊ុលភីត និងចំហាយទឹក។"
    },
    surface: {
      en: "No solid surface. The atmosphere thickens seamlessly into a vast, high-pressure ocean of liquid metallic hydrogen over a dense rock-ice core.",
      km: "គ្មានផ្ទៃរឹងឡើយ។ បរិយាកាសជ្រៅទៅៗប្រែជាសមុទ្រអ៊ីដ្រូសែនលោហធាតុរាវដ៏ធំធេង ក្រោមសម្ពាធដ៏មហាសាល គ្របពីលើស្នូលថ្ម-ទឹកកក។"
    },
    facts: {
      en: [
        "The Great Red Spot is a persistent high-pressure storm larger than the entire planet Earth that has raged for over 350 years.",
        "Jupiter's moon Ganymede is the largest moon in the Solar System—larger even than planet Mercury.",
        "Jupiter exerts gravitational protection over the inner planets by deflecting and capturing roaming comets and asteroids."
      ],
      km: [
        "ចំណុចក្រហមយក្ស (Great Red Spot) គឺជាព្យុះកំបុតត្បូងដ៏ធំជាងផែនដីទាំងមូល ដែលបានបោកបក់អស់រយៈពេលជាង ៣៥០ ឆ្នាំមកហើយ។",
        "ព្រះចន្ទ Ganymede របស់ភពព្រហស្បតិ៍ ជាព្រះចន្ទធំជាងគេក្នុងប្រព័ន្ធព្រះអាទិត្យ — ធំជាងភពពុធទៅទៀត។",
        "កម្លាំងទំនាញដ៏ខ្លាំងរបស់ភពព្រហស្បតិ៍ ដើរតួជាខែលការពារភពខាងក្នុងដោយស្រូបទាញ និងផ្លាតទិសដៅអាចម៍ផ្កាយគ្រោះថ្នាក់។"
      ]
    },
    missions: {
      en: [
        "Juno (NASA, 2016–Present) — Orbiting Jupiter's poles to probe deep gravity fields, core composition, and atmospheric dynamics.",
        "Galileo (NASA, 1995–2003) — Dropped atmospheric probe and discovered subsurface oceans on Europa.",
        "JUICE (ESA) & Europa Clipper (NASA, launched 2024) — Dedicated missions to explore Jupiter's icy oceanic moons."
      ],
      km: [
        "Juno (NASA, ២០១៦–បច្ចុប្បន្ន) — គោចរជុំវិញប៉ូលដើម្បីសិក្សាដែនទំនាញ ស្នូល និងបរិយាកាសជ្រៅ។",
        "Galileo (NASA, ១៩៩៥–២០០៣) — ទម្លាក់ឧបករណ៍ចូលបរិយាកាស និងបានរកឃើញភស្តុតាងមហាសមុទ្រលើ Europa។",
        "JUICE (ESA) & Europa Clipper (NASA, បាញ់បង្ហោះ ២០២៤) — បេសកកម្មពិសេសដើម្បីរុករកមហាសមុទ្រនៃព្រះចន្ទទឹកកក។"
      ]
    }
  },
  {
    id: "saturn",
    order: 6,
    r: 2.3,
    dist: 49,
    color: 0xfde047,
    hexColor: "#eab308",
    gradient: "radial-gradient(circle at 35% 35%, #fef3c7, #fde047 40%, #eab308 70%, #78350f)",
    speed: 0.005,
    hasMoon: false,
    hasRings: true,
    names: { en: "Saturn", km: "ភពសៅរ៍" },
    tagline: {
      en: "The jewel of the solar realm, crowned with shimmering rings of cosmic ice.",
      km: "ត្បូងពេជ្រនៃប្រព័ន្ធព្រះអាទិត្យ លម្អដោយកងចិញ្ចៀនទឹកកកដ៏ភ្លឺចែងចាំង និងអស្ចារ្យ។"
    },
    description: {
      en: "Saturn is the sixth planet from the Sun and the second-largest in the Solar System. Famed for its spectacular, highly visible ring system composed billions of fragments of pure water ice and rocky debris, Saturn is a gas giant with the lowest bulk density of any planet.",
      km: "ភពសៅរ៍ គឺជាភពទីប្រាំមួយពីព្រះអាទិត្យ និងជាភពធំទីពីរក្នុងប្រព័ន្ធព្រះអាទិត្យ។ ល្បីល្បាញដោយសារកងចិញ្ចៀនដ៏ស្រស់ស្អាតបំផុតដែលផ្សំឡើងពីភាគល្អិតទឹកកកបរិសុទ្ធរាប់ពាន់លាន និងកម្ទេចថ្ម ភពសៅរ៍ជាភពឧស្ម័នយក្សដែលមានដង់ស៊ីតេទាបជាងគេបំផុត។"
    },
    type: { en: "Gas Giant Planet", km: "ភពឧស្ម័នយក្ស (Gas Giant)" },
    stats: {
      diameter: { en: "116,460 km (9.1 × Earth)", km: "១១៦ ៤៦០ គ.ម (៩.១ ដងនៃផែនដី)" },
      distance: { en: "1,433.5 million km (9.58 AU)", km: "១ ៤៣៣.៥ លាន គ.ម (៩.៥៨ AU)" },
      orbitalPeriod: { en: "29.45 Earth years", km: "២៩.៤៥ ឆ្នាំផែនដី" },
      rotationPeriod: { en: "10 hours 33 minutes", km: "១០ ម៉ោង ៣៣ នាទី" },
      temperature: { en: "-140°C (Cloud tops)", km: "-១៤០°C (កំពូលពពក)" },
      moons: { en: "146 confirmed moons (Titan, Enceladus, Mimas...)", km: "១៤៦ (Titan, Enceladus, Mimas...)" },
      gravity: { en: "10.44 m/s² (1.06 × Earth)", km: "១០.៤៤ ម៉ែត្រ/វិនាទី² (១.០៦ ដងនៃផែនដី)" },
      mass: { en: "95.2 × Earth", km: "៩៥.២ ដងនៃផែនដី" },
      ringSystem: { en: "Extensive, 282,000 km across, only 10m to 1km thick", km: "លាតសន្ធឹង ២៨២ ០០០ គ.ម ប៉ុន្តែកម្រាស់ត្រឹម ១០ម ដល់ ១គ.ម" }
    },
    atmosphere: {
      en: "96% Molecular Hydrogen, 3% Helium, with trace methane and ammonia forming golden butterscotch atmospheric hazes.",
      km: "អ៊ីដ្រូសែន ៩៦%, អេល្យូម ៣% ជាមួយមេតាន និងអាម៉ូញាក់ បង្កើតបានជាពពកអ័ព្ទពណ៌មាសស្រាល។"
    },
    surface: {
      en: "Gradual transition from dense gaseous envelope to liquid metallic hydrogen layer surrounding a rocky core of silicate and iron.",
      km: "ការផ្លាស់ប្តូរបន្តិចម្តងៗពីឧស្ម័នខាប់ទៅជាស្រទាប់អ៊ីដ្រូសែនលោហធាតុរាវ ដែលហ៊ុំព័ទ្ធស្នូលថ្ម និងដែក។"
    },
    facts: {
      en: [
        "Saturn is the only planet in the Solar System less dense than water (0.687 g/cm³); it would float in a giant bathtub!",
        "Its rings span up to 282,000 km in width, but are paper-thin—often less than 10 to 30 meters thick.",
        "Saturn's moon Titan is the only moon with a dense atmosphere and liquid lakes of methane and ethane on its surface."
      ],
      km: [
        "ភពសៅរ៍ជាភពតែមួយគត់ដែលមានដង់ស៊ីតេទាបជាងទឹក (០.៦៨៧ ក្រាម/សង់ទីម៉ែត្រគូប) ប្រសិនបើមានអាងទឹកធំល្មម វានឹងអណ្តែត!",
        "កងចិញ្ចៀនរបស់វាលាតសន្ធឹងរហូតដល់ ២៨២ ០០០ គីឡូម៉ែត្រ ប៉ុន្តែស្តើងដូចសន្លឹកក្រដាស — កម្រាស់ត្រឹមតែ ១០ ទៅ ៣០ ម៉ែត្រប៉ុណ្ណោះ។",
        "ព្រះចន្ទ Titan របស់ភពសៅរ៍ ជាព្រះចន្ទតែមួយគត់ដែលមានបរិយាកាសក្រាស់ និងមានបឹងមេតានរាវនៅលើផ្ទៃរបស់វា។"
      ]
    },
    missions: {
      en: [
        "Cassini-Huygens (NASA/ESA, 1997–2017) — Historic 13-year exploration, landing Huygens probe on Titan and discovering geysers on Enceladus.",
        "Voyager 1 & 2 (NASA, 1980–1981) — High-speed flybys revealing intricate ring structure.",
        "Dragonfly (NASA, planned 2028) — Nuclear-powered octocopter drone mission to explore Titan's organic chemistry."
      ],
      km: [
        "Cassini-Huygens (NASA/ESA, ១៩៩៧–២០១៧) — រុករកអស់រយៈពេល ១៣ ឆ្នាំ ទម្លាក់យាន Huygens លើ Titan និងរកឃើញប្រភពទឹកក្តៅលើ Enceladus។",
        "Voyager 1 & 2 (NASA, ១៩៨០–១៩៨១) — ហោះកាត់ និងបង្ហាញអំពីរចនាសម្ព័ន្ធកងចិញ្ចៀនដ៏លម្អិត។",
        "Dragonfly (NASA, គ្រោងបាញ់បង្ហោះ ២០២៨) — យានដ្រូនដើរដោយថាមពលនុយក្លេអ៊ែរ ដើម្បីហោះរុករកលើព្រះចន្ទ Titan។"
      ]
    }
  },
  {
    id: "uranus",
    order: 7,
    r: 1.7,
    dist: 60,
    color: 0x06b6d4,
    hexColor: "#06b6d4",
    gradient: "radial-gradient(circle at 35% 35%, #cffafe, #67e8f9 40%, #06b6d4 75%, #164e63)",
    speed: 0.003,
    hasMoon: false,
    hasRings: true,
    names: { en: "Uranus", km: "ភពអ៊ុយរ៉ានុស" },
    tagline: {
      en: "The sideways ice giant—a tranquil turquoise sphere tumbling through the cosmic cold.",
      km: "ភពទឹកកកយក្សដែលវិលចំហៀង — ពិភពពណ៌ផ្ទៃមេឃដ៏ត្រជាក់ស្រេប និងអាថ៌កំបាំង។"
    },
    description: {
      en: "Uranus is the seventh planet from the Sun and the third-largest in diameter. Classed as an ice giant, most of its mass is composed of dense, hot fluids of 'icy' materials—water, methane, and ammonia—above a small rocky core. It uniquely rotates almost completely on its side.",
      km: "ភពអ៊ុយរ៉ានុស គឺជាភពទីប្រាំពីរពីព្រះអាទិត្យ និងជាភពធំទីបីបើគិតតាមអង្កត់ផ្ចិត។ ចាត់ថ្នាក់ជាភពទឹកកកយក្ស ម៉ាស់ភាគច្រើនរបស់វាផ្សំពីអង្គធាតុរាវក្តៅខាប់នៃ «ទឹកកក» ដូចជា ទឹក មេតាន និងអាម៉ូញាក់ គ្របលើស្នូលថ្មតូចមួយ។ អ័ក្សរបស់វាប្លែកគេដោយវិលផ្តេកចំហៀងស្ទើរតែ ៩៨ ដឺក្រេ។"
    },
    type: { en: "Ice Giant Planet", km: "ភពទឹកកកយក្ស (Ice Giant)" },
    stats: {
      diameter: { en: "50,724 km (4.0 × Earth)", km: "៥០ ៧២៤ គ.ម (៤.០ ដងនៃផែនដី)" },
      distance: { en: "2,871.0 million km (19.19 AU)", km: "២ ៨៧១.០ លាន គ.ម (១៩.១៩ AU)" },
      orbitalPeriod: { en: "84.0 Earth years", km: "៨៤.០ ឆ្នាំផែនដី" },
      rotationPeriod: { en: "17 hours 14 minutes (Retrograde sideways)", km: "១៧ ម៉ោង ១៤ នាទី (វិលផ្តេកចំហៀង)" },
      temperature: { en: "-195°C (Average, lowest reached -224°C)", km: "-១៩៥°C (មធ្យម, អាចចុះដល់ -២២៤°C)" },
      moons: { en: "28 confirmed moons (Miranda, Ariel, Umbriel, Titania, Oberon...)", km: "២៨ (Miranda, Ariel, Umbriel, Titania...)" },
      gravity: { en: "8.87 m/s² (0.90 × Earth)", km: "៨.៨៧ ម៉ែត្រ/វិនាទី² (០.៩០ ដងនៃផែនដី)" },
      mass: { en: "14.5 × Earth", km: "១៤.៥ ដងនៃផែនដី" },
      ringSystem: { en: "13 narrow, dark charcoal-colored rings", km: "កងចិញ្ចៀនងងឹតស្តើងៗចំនួន ១៣" }
    },
    atmosphere: {
      en: "83% Hydrogen, 15% Helium, 2% Methane. Methane gas absorbs red light, giving Uranus its distinctive soft cyan-aquamarine appearance.",
      km: "អ៊ីដ្រូសែន ៨៣%, អេល្យូម ១៥%, មេតាន ២%។ ឧស្ម័នមេតានស្រូបយកពន្លឺពណ៌ក្រហម ធ្វើឱ្យភពអ៊ុយរ៉ានុសមានពណ៌ផ្ទៃមេឃស្រទន់។"
    },
    surface: {
      en: "Superheated, supercritical mantle of water, methane, and ammonia slush under thousands of atmospheres of pressure, over an iron-silicate core.",
      km: "ស្រទាប់ម៉ង់តូនៃទឹកកករាវខាប់ (ទឹក មេតាន និងអាម៉ូញាក់) ក្រោមសម្ពាធរាប់ពាន់បរិយាកាស គ្របពីលើស្នូលដែក-ស៊ីលីកាត។"
    },
    facts: {
      en: [
        "Uranus has an extreme axial tilt of 97.8 degrees, meaning it orbits the Sun rolling on its side, resulting in 42-year-long polar winters and summers.",
        "It holds the record for the coldest recorded planetary atmosphere in the Solar System at -224°C.",
        "Its moon Miranda features Verona Rupes—the tallest known cliff in the Solar System, plunging 20 km straight down."
      ],
      km: [
        "ភពអ៊ុយរ៉ានុសមានអ័ក្សលំអៀងដល់ទៅ ៩៧.៨ ដឺក្រេ មានន័យថាវាគោចរជុំវិញព្រះអាទិត្យដោយវិលចំហៀង បង្កើតឱ្យមានរដូវរងា និងរដូវក្តៅនៅប៉ូលប្រវែង ៤២ ឆ្នាំ!",
        "វាជាភពដែលមានកំណត់ត្រាបរិយាកាសត្រជាក់បំផុតក្នុងប្រព័ន្ធព្រះអាទិត្យ ធ្លាក់ចុះដល់ -២២៤°C។",
        "ព្រះចន្ទ Miranda របស់វាមានជ្រោះ Verona Rupes ដែលជាច្រាំងថ្មចោទខ្ពស់បំផុតក្នុងប្រព័ន្ធព្រះអាទិត្យ ជម្រៅដល់ ២០ គីឡូម៉ែត្រ។"
      ]
    },
    missions: {
      en: [
        "Voyager 2 (NASA, January 1986) — The only spacecraft ever to visit Uranus, discovering 10 new moons and 2 new rings.",
        "Uranus Orbiter and Probe (NASA Flagship Concept) — Ranked as highest priority future mission by planetary scientists for the 2030s."
      ],
      km: [
        "Voyager 2 (NASA, មករា ១៩៨៦) — ជាយានអវកាសតែមួយគត់ដែលធ្លាប់បានទៅជិតភពអ៊ុយរ៉ានុស ដោយរកឃើញព្រះចន្ទថ្មី ១០ និងកងចិញ្ចៀនថ្មី ២។",
        "Uranus Orbiter and Probe (NASA) — ត្រូវបានកំណត់ជាបេសកកម្មអាទិភាពខ្ពស់បំផុតសម្រាប់ទសវត្សរ៍ឆ្នាំ ២០៣០។"
      ]
    }
  },
  {
    id: "neptune",
    order: 8,
    r: 1.6,
    dist: 70,
    color: 0x3b82f6,
    hexColor: "#2563eb",
    gradient: "radial-gradient(circle at 35% 35%, #93c5fd, #3b82f6 40%, #1d4ed8 75%, #1e3a8a)",
    speed: 0.002,
    hasMoon: false,
    hasRings: false,
    names: { en: "Neptune", km: "ភពណិបទូន" },
    tagline: {
      en: "The supersonic abyss—an azure sentinel guarding the dark frontier of the outer cosmos.",
      km: "ទីជ្រៅនៃខ្យល់ព្យុះល្បឿនលឿនជាងសម្លេង — ឆ្មាំពណ៌ខៀវស្រងាត់នៅព្រំដែនខាងក្រៅនៃប្រព័ន្ធព្រះអាទិត្យ។"
    },
    description: {
      en: "Neptune is the eighth and farthest known major planet from the Sun. An ice giant more than 30 times as far from the Sun as Earth, Neptune is shrouded in vibrant deep-blue methane clouds and whipped by the most violent supersonic winds recorded anywhere in the Solar System.",
      km: "ភពណិបទូន គឺជាភពទីប្រាំបី និងជាភពធំដែលនៅឆ្ងាយជាងគេបំផុតពីព្រះអាទិត្យ។ ជាភពទឹកកកយក្សដែលមានចម្ងាយឆ្ងាយជាងផែនដីពីព្រះអាទិត្យជាង ៣០ ដង ភពណិបទូនមានពពកមេតានពណ៌ខៀវស្រស់ និងមានខ្យល់ព្យុះបោកបក់លឿនជាងសម្លេងខ្លាំងជាងគេបំផុតក្នុងប្រព័ន្ធព្រះអាទិត្យ។"
    },
    type: { en: "Ice Giant Planet", km: "ភពទឹកកកយក្ស (Ice Giant)" },
    stats: {
      diameter: { en: "49,244 km (3.9 × Earth)", km: "៤៩ ២៤៤ គ.ម (៣.៩ ដងនៃផែនដី)" },
      distance: { en: "4,495.1 million km (30.07 AU)", km: "៤ ៤៩៥.១ លាន គ.ម (៣០.០៧ AU)" },
      orbitalPeriod: { en: "164.8 Earth years", km: "១៦៤.៨ ឆ្នាំផែនដី" },
      rotationPeriod: { en: "16 hours 6 minutes", km: "១៦ ម៉ោង ៦ នាទី" },
      temperature: { en: "-200°C (Average cloud tops)", km: "-២០០°C (មធ្យមនៃកំពូលពពក)" },
      moons: { en: "16 confirmed moons (Triton, Proteus, Nereid...)", km: "១៦ (Triton, Proteus, Nereid...)" },
      gravity: { en: "11.15 m/s² (1.14 × Earth)", km: "១១.១៥ ម៉ែត្រ/វិនាទី² (១.១៤ ដងនៃផែនដី)" },
      mass: { en: "17.1 × Earth", km: "១៧.១ ដងនៃផែនដី" },
      ringSystem: { en: "5 faint rings with notable dust arcs (Galle, Leverrier, Adams)", km: "កងស្តើងៗ ៥ និងធ្នូធូលី (Galle, Leverrier, Adams)" }
    },
    atmosphere: {
      en: "80% Hydrogen, 19% Helium, 1.5% Methane. Trace hydrocarbons give Neptune an intense azure cobalt coloration with white high-altitude cirrus clouds.",
      km: "អ៊ីដ្រូសែន ៨០%, អេល្យូម ១៩%, មេតាន ១.៥%។ សារធាតុកាបូអ៊ីដ្រាតតិចតួចបង្កើតបានជាពណ៌ខៀវស្រស់ប្លែកពីភពអ៊ុយរ៉ានុស អមដោយពពកស cirrus ខ្ពស់ៗ។"
    },
    surface: {
      en: "No solid surface. High-pressure slush mantle composed of water, ammonia, and methane ices over an Earth-sized rocky metallic core.",
      km: "គ្មានផ្ទៃរឹងឡើយ។ ស្រទាប់ទឹកកកខាប់សម្ពាធខ្ពស់ផ្សំពី ទឹក អាម៉ូញាក់ និងមេតាន គ្របលើស្នូលថ្មលោហៈទំហំប៉ុនផែនដី។"
    },
    facts: {
      en: [
        "Winds on Neptune reach over 2,100 km/h (1,300 mph)—faster than the speed of sound and the fastest in the Solar System.",
        "Neptune's moon Triton orbits backward (retrograde), erupts nitrogen geysers, and is likely a captured Kuiper Belt object.",
        "It was the first planet discovered via mathematical prediction rather than empirical telescope observation (1846)."
      ],
      km: [
        "ល្បឿនខ្យល់នៅលើភពណិបទូនអាចឡើងដល់ជាង ២ ១០០ គ.ម/ម៉ោង — លឿនជាងល្បឿនសម្លេង និងលឿនជាងគេក្នុងប្រព័ន្ធព្រះអាទិត្យ។",
        "ព្រះចន្ទ Triton របស់វាគោចរច្រាសទិស មានប្រភពបាញ់ឧស្ម័នអាសូត និងត្រូវបានគេជឿថាជាវត្ថុដែលចាប់បានពីខ្សែក្រវាត់ខៃព័រ។",
        "វាជាភពដំបូងគេដែលត្រូវបានរកឃើញតាមរយៈការគណនាគណិតវិទ្យា មុនពេលមើលឃើញដោយតេឡេស្កុបនៅឆ្នាំ ១៨៤៦។"
      ]
    },
    missions: {
      en: [
        "Voyager 2 (NASA, August 1989) — Historic flyby capturing the Great Dark Spot, Triton's geysers, and complete ring arcs.",
        "Hubble & James Webb Space Telescopes (Current) — Continual infrared monitoring of atmospheric storms and ring structure."
      ],
      km: [
        "Voyager 2 (NASA, សីហា ១៩៨៩) — ហោះកាត់ជាប្រវត្តិសាស្ត្រ ថតបានចំណុចងងឹតយក្ស និងប្រភពទឹកកកលើ Triton។",
        "តេឡេស្កុប Hubble & James Webb (បច្ចុប្បន្ន) — តាមដានខ្យល់ព្យុះក្នុងបរិយាកាស និងរចនាសម្ព័ន្ធកងចិញ្ចៀនជាប្រចាំ។"
      ]
    }
  }
];
