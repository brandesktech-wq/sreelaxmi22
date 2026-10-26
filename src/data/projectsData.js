/**
 * Verified Project Portfolio Data — Sree Laxmi Developers
 * Source: https://sreelaxmidevelopers.com/
 * - https://sreelaxmidevelopers.com/ongoing-projects/
 * - https://sreelaxmidevelopers.com/upcoming-projects/
 * - https://sreelaxmidevelopers.com/completed-projects/
 */

export const PORTFOLIO_TABS = [
  {
    id: 'Ongoing',
    label: 'Ongoing',
    route: '/ongoing-projects',
    title: 'Ongoing Projects',
    breadcrumbLabel: 'Ongoing Projects',
  },
  {
    id: 'Upcoming',
    label: 'Upcoming',
    route: '/upcoming-projects',
    title: 'Upcoming Projects',
    breadcrumbLabel: 'Upcoming Projects',
  },
  {
    id: 'Completed',
    label: 'Completed',
    route: '/completed-projects',
    title: 'Completed Projects',
    breadcrumbLabel: 'Completed Projects',
  },
];

export const PROJECTS_DATA = [
  // ===========================================================================
  // ONGOING PROJECTS
  // ===========================================================================
  {
    id: 'sree-laxmi-gardenia',
    aliases: ['gardenia'],
    name: 'Sree Laxmi Gardenia',
    status: 'Ongoing',
    location: 'Rameshwaram Banda, Kistareddypet, Patancheru, Hyderabad',
    mapQuery:
      'Sree Laxmi Gardenia, Rameshwaram Banda, Kistareddypet, Hyderabad, Telangana',
    brochureUrl: '/assets/brochures/sree-laxmi-gardenia-brochure.pdf',
    brochureFileName: 'sree-laxmi-gardenia-brochure.pdf',
    youtubeVideoUrl: 'https://www.youtube.com/watch?v=NIQeoDnJg7s',
    videoCoverImage: '/assets/projects/gardenia-night.webp',
    image: '/assets/projects/gardenia-aerial.webp',
    gallery: [
      '/assets/projects/gardenia-aerial.webp',
      '/assets/projects/gardenia-block-a.webp',
      '/assets/projects/gardenia-entrance.jpg',
      '/assets/projects/gardenia-block-b.webp',
      '/assets/projects/gardenia-clubhouse.webp',
      '/assets/projects/gardenia-night.webp',
    ],
    galleryCaptions: [
      'Aerial view of Sree Laxmi Gardenia gated community layout',
      'Block A residential architecture and facade elevation',
      'Grand entrance archway and landscaped driveway',
      'Block B residential elevation and landscaped outdoor spaces',
      'Exclusive G+4 6,000 sq.ft. clubhouse and amenity block',
      'Illuminated evening architectural and lifestyle view',
    ],
    detailRoute: '/projects/sree-laxmi-gardenia',
    overview:
      'Strategically located near Outer Ring Road at Rameshwaram Banda, Kistareddypet, Hyderabad, Sree Laxmi Gardenia is an HMDA & TS RERA approved (RERA No: P01100004771) gated community spread across 1.6 acres featuring 168 deluxe 2 & 3 BHK apartments across 3 blocks (Cellar + Ground + 5 Floors) and a dedicated G+4 6,000 sq. ft. clubhouse.',
    specifications: [
      {
        label: 'Project Type',
        value: '2 & 3 BHK Deluxe Gated Community Apartments (3 Blocks, C+G+5)',
      },
      {
        label: 'Total Area & Units',
        value: '1.6 Acres | 168 Deluxe Apartments',
      },
      {
        label: 'Clubhouse',
        value: '1 Exclusive Clubhouse (G+4) — 6,000 Sq. Ft.',
      },
      {
        label: 'Approvals & RERA',
        value: 'HMDA & TS RERA Approved (P01100004771)',
      },
      {
        label: 'Unit Sizes & Facing',
        value: '1,000 – 1,355 Sq. Ft. | 100% Vaastu (East & West Facing)',
      },
      {
        label: 'Road Connectivity',
        value: '0.8 km from Outer Ring Road (Between Exit 3 & Exit 4)',
      },
    ],
    amenities: [
      { icon: 'clubhouse', label: 'Clubhouse (6,000 Sq.ft)' },
      { icon: 'supermarket', label: 'Super Market' },
      { icon: 'fitness', label: 'Gents & Ladies Gym' },
      { icon: 'hall', label: 'Multi-Purpose Hall' },
      { icon: 'indoor-games', label: 'Indoor Games' },
      { icon: 'yoga', label: 'Yoga / Meditation Hall' },
      { icon: 'walking-track', label: 'Walking Track' },
      { icon: 'play-area', label: 'Children’s Play Zone' },
      { icon: 'garden', label: 'Landscaping' },
      { icon: 'security', label: 'CCTV & 24/7 Security' },
      { icon: 'power', label: 'Power Backup' },
      { icon: 'water', label: 'Rain Water Harvesting' },
    ],
    highlights: [
      'HMDA & TS RERA Approved Gated Community (RERA No. P01100004771)',
      '1.6 Acres with 168 Deluxe 2 & 3 BHK Apartments across 3 Blocks (C+G+5)',
      'Exclusive G+4 Clubhouse spanning 6,000 Sq.ft with Super Market, Gym & Hall',
      '100% Vaastu Compliant East & West Facing Flats with No Common Walls',
      '24 Hours Security with CCTV Surveillance & Solar Fencing',
      'Power Backup, Rain Water Harvesting & Underground Cabling',
      'Walking Track, Children’s Play Zone & Lush Landscaped Greens',
      'Prime Location just 0.8 km from Outer Ring Road (Between Exit 3 & Exit 4)',
    ],
    nearbyFacilities: {
      educational: [
        {
          category: 'School',
          name: 'Delhi Public School',
          distance: '2.0 km',
        },
        {
          category: 'Engineering College',
          name: 'Ellenki Engg. College',
          distance: '2.0 km',
        },
        {
          category: 'School',
          name: 'Bhashyam Blooms School',
          distance: '2.5 km',
        },
        {
          category: 'International School',
          name: 'Silver Oaks International School',
          distance: '3.0 km',
        },
        {
          category: 'International School',
          name: 'Candiidus International School',
          distance: '6.6 km',
        },
        {
          category: 'Premier Institute',
          name: 'IIT Kandi',
          distance: '21 km',
        },
      ],
      healthcareAndEssentials: [
        {
          category: 'Hospital',
          name: 'Maxcare Hospital',
          distance: '4.0 km',
        },
        {
          category: 'Medical Hub',
          name: 'Medical Device Park (Sultanpur)',
          distance: '5.0 km',
        },
        {
          category: 'Highway & Transit',
          name: 'Outer Ring Road (0.8 km) & Exit 4 Sultanpur (4.5 km)',
          distance: '0.8 – 4.5 km',
        },
        {
          category: 'Highway & Transit',
          name: 'ORR Exit 3, Muthangi (Mumbai Highway)',
          distance: '6.0 km',
        },
        {
          category: 'Convention & Retail',
          name: 'GMR Convention Center & On-Site Clubhouse Super Market',
          distance: '3.0 km',
        },
        {
          category: 'Employment Hubs',
          name: 'BHEL Circle (12 km) | Gachibowli (21 km) | Hitech City (23 km)',
          distance: '12 – 23 km',
        },
      ],
    },
    connectivity: [
      'Outer Ring Road – 0.8 km | Exit 4, Sultanpur – 4.5 km | Exit 3, Muthangi – 6.0 km',
      'Delhi Public School – 2.0 km | Ellenki Engg. College – 2.0 km | Bhashyam Blooms School – 2.5 km',
      'Silver Oaks International School – 3.0 km | Candiidus International School – 6.6 km',
      'Maxcare Hospital – 4.0 km | Medical Device Park – 5.0 km | GMR Convention Center – 3.0 km',
      'BHEL Circle – 12 km | Gachibowli – 21 km | IIT Kandi – 21 km | Hitech City – 23 km',
    ],
  },
  {
    id: 'sree-laxmi-sarovar',
    aliases: ['sarovar'],
    name: 'Sree Laxmi Sarovar',
    status: 'Ongoing',
    location: 'Khajipalli, Near Bachupally Cross Roads, Hyderabad',
    mapQuery: 'Khajipalli, Near Bachupally Cross Roads, Hyderabad, Telangana',
    brochureUrl: '',
    youtubeVideoUrl: '',
    image: '/assets/projects/sarovar-villas.webp',
    gallery: ['/assets/projects/sarovar-villas.webp'],
    detailRoute: '/projects/sree-laxmi-sarovar',
    overview:
      'Sree Laxmi Sarovar is a premier gated villa community comprising 160 triplex villas in Khajipalli, offering spacious 2,200 sq. ft. homes on 150 sq. yards plots with rapid access to Bachupally, Miyapur, and Hitec City.',
    specifications: [
      { label: 'Project Type', value: 'Luxury Triplex Villas' },
      { label: 'Total Units', value: '160 Triplex Villas' },
      {
        label: 'Location',
        value: 'Khajipalli, Near Bachupally Cross Roads',
      },
      {
        label: 'Road Connectivity',
        value: '5 Mins from Bachupally Cross Roads | 15 Mins to Miyapur',
      },
    ],
    amenities: [
      { icon: 'security', label: 'Gated Security' },
      { icon: 'garden', label: 'Landscaped Avenues' },
      { icon: 'play-area', label: "Children's Play Area" },
      { icon: 'walking-track', label: 'Walking Track' },
      { icon: 'parking', label: 'Dedicated Villa Parking' },
      { icon: 'clubhouse', label: 'Community Spaces' },
    ],
    highlights: [
      '160 luxury triplex villas in a secure gated layout',
      '150 sq. yards plot area for each villa',
      '2,200 sq. ft. thoughtfully planned built-up area',
      '5 minutes from Bachupally Cross Roads',
      '15 minutes from Miyapur & Miyapur Metro Station',
      '30 minutes from Hitec City',
    ],
    nearbyFacilities: {
      educational: [
        {
          category: 'Educational Hub',
          name: 'Bachupally International Schools & Junior Colleges Corridor',
          distance: '5-minute drive',
        },
        {
          category: 'Colleges',
          name: 'Engineering & Degree Colleges near Bachupally Cross Roads',
          distance: '5–10 minute drive',
        },
      ],
      healthcareAndEssentials: [
        {
          category: 'Healthcare & Retail',
          name: 'Multi-Speciality Hospitals & Pharmacies at Bachupally',
          distance: '5–10 minute drive',
        },
        {
          category: 'Metro & Transit',
          name: 'Miyapur & Miyapur Metro Station',
          distance: '15-minute drive',
        },
        {
          category: 'IT & Employment',
          name: 'Hitec City Commercial Corridor',
          distance: '30-minute drive',
        },
      ],
    },
  },
  {
    id: 'sln-dwaja',
    aliases: ['dwaja'],
    name: 'SLN Dwaja',
    status: 'Ongoing',
    location: 'Near IIT Hyderabad, Kandi – Patancheru Corridor',
    mapQuery: 'Kandi, Near IIT Hyderabad, Sangareddy, Telangana',
    brochureUrl: '',
    youtubeVideoUrl: '',
    image: '/assets/projects/sln-dwaja.png',
    gallery: ['/assets/projects/sln-dwaja.png'],
    detailRoute: '/projects/sln-dwaja',
    overview:
      'SLN Dwaja is a 2 & 3 BHK gated community apartment project designed around modern living, green spaces, and a brighter future. Spread across 6 acres with 6 residential blocks and 462 units, it features a grand clubhouse, outdoor recreation, and indoor lifestyle amenities.',
    specifications: [
      { label: 'Project Type', value: '2 & 3 BHK Gated Community Apartments' },
      { label: 'Total Units', value: '462 Units (6 Blocks | 6 Acres)' },
      { label: 'Location', value: 'Near IIT Hyderabad, Kandi – Patancheru' },
      {
        label: 'Road Connectivity',
        value: '2 km from IIT Hyderabad | 11 km from ORR Exit 3',
      },
    ],
    amenities: [
      { icon: 'clubhouse', label: 'Clubhouse & Pool' },
      { icon: 'play-area', label: "Children's Play Area" },
      { icon: 'walking-track', label: 'Jogging Track' },
      { icon: 'fitness', label: 'Indoor & Outdoor Gym' },
      { icon: 'sports', label: 'Pickle Ball & Cricket Net' },
      { icon: 'garden', label: 'Multipurpose Lawn' },
      { icon: 'supermarket', label: 'Super Market & Pharmacy' },
      { icon: 'hall', label: 'Multipurpose Hall' },
      { icon: 'library', label: 'Library & Co-Working' },
      { icon: 'theatre', label: 'Mini Theatre' },
      { icon: 'indoor-games', label: 'Indoor Games & Billiards' },
      { icon: 'yoga', label: 'Spa, Salon & Aerobics' },
    ],
    highlights: [
      'Club House, Swimming Pool & Jogging Track',
      'Children’s Play Area, Pickle Ball Court & Cricket Practice Net',
      'Outdoor Gym, Multipurpose Lawn & Recreational Spaces',
      'Super Market, Pharmacy & Multipurpose Hall',
      'Library / Co-working Space, Theatre & Guest Rooms',
      'Indoor Games, Indoor Gym, Aerobics, Billiards, Spa & Salon',
    ],
    nearbyFacilities: {
      educational: [
        {
          category: 'Premier Institute',
          name: 'IIT Hyderabad',
          distance: '2 km',
        },
        {
          category: 'School',
          name: 'Keshava Reddy Concept School',
          distance: '3 km',
        },
        {
          category: 'School',
          name: 'DAV Public School, IIT-H',
          distance: '4 km',
        },
        {
          category: 'University',
          name: 'GITAM University',
          distance: '7 km',
        },
        {
          category: 'University',
          name: 'MNR University',
          distance: '8 km',
        },
      ],
      healthcareAndEssentials: [
        {
          category: 'Hospital',
          name: 'Vinod Multi Speciality Hospital',
          distance: '8 km',
        },
        {
          category: 'Hospital',
          name: 'L Prasad Eye Hospital',
          distance: '9 km',
        },
        {
          category: 'Pharmacy & Retail',
          name: 'On-Site Clubhouse Pharmacy & Super Market',
          distance: 'Within Community',
        },
        {
          category: 'Connectivity',
          name: 'ORR Exit 3 – Patancheru & Sangareddy Town',
          distance: '6–11 km',
        },
      ],
    },
    connectivity: [
      'IIT Hyderabad – 2 km | Keshava Reddy Concept School – 3 km',
      'DAV Public School, IIT-H – 4 km | Toshiba – 5 km',
      'Sangareddy – 6 km | GITAM University – 7 km | MNR University – 8 km',
      'Vinod Multi Speciality Hospital – 8 km | L Prasad Eye Hospital – 9 km',
      'ORR Exit 3 – Patancheru – 11 km | Patancheru Industrial Belt – 13 km',
      'BHEL Township – 21 km | Gachibowli – 32 km | HiTech City – 33 km',
    ],
  },
  {
    id: 'sree-laxmi-royale',
    aliases: ['royale'],
    name: 'Sree Laxmi Royale',
    status: 'Ongoing',
    location: 'Saketh Township, Kapra, Hyderabad',
    mapQuery: 'Saket Township, Kapra, Secunderabad, Hyderabad, Telangana',
    brochureUrl: '',
    youtubeVideoUrl: '',
    image: '/assets/project-royale.jpg',
    gallery: ['/assets/project-royale.jpg'],
    detailRoute: '/projects/sree-laxmi-royale',
    overview:
      'Sree Laxmi Royale is a modern residential apartment development in Saketh Township, Kapra, crafted with Vastu-compliant 3 BHK floor plans, 60-ft road-facing access, two-car parking, and peaceful neighborhood connectivity.',
    specifications: [
      { label: 'Project Type', value: '3 BHK Luxury Residential Apartments' },
      { label: 'Configuration', value: 'G+5 Exclusive 3 BHK Residences' },
      { label: 'Location', value: 'Saketh Township, Kapra, Hyderabad' },
      {
        label: 'Road Connectivity',
        value: '60-Ft Road-Facing Access in Saketh Township',
      },
    ],
    amenities: [
      { icon: 'security', label: '24/7 Security' },
      { icon: 'parking', label: 'Two-Car Parking' },
      { icon: 'power', label: 'Power Backup' },
      { icon: 'vastu', label: '100% Vastu Compliant' },
      { icon: 'garden', label: 'Landscaped Surroundings' },
      { icon: 'clubhouse', label: 'Elevator & Lobby' },
    ],
    highlights: [
      'Prime 60-ft road-facing residential address in Saketh Township, Kapra',
      'Exclusive 3 BHK apartments with two-car parking',
      '100% Vastu-compliant architectural planning',
      'Spacious balconies and natural cross-ventilation',
      '24/7 security surveillance and power backup',
    ],
    nearbyFacilities: {
      educational: [
        {
          category: 'Schools',
          name: 'Established Schools in Saketh Township & Kapra',
          distance: 'Nearby within Kapra',
        },
        {
          category: 'Colleges',
          name: 'Educational Institutions across ECIL & AS Rao Nagar',
          distance: 'Easy neighbourhood access',
        },
      ],
      healthcareAndEssentials: [
        {
          category: 'Healthcare',
          name: 'Hospitals, Clinics & Pharmacies in Kapra & AS Rao Nagar',
          distance: 'Convenient daily access',
        },
        {
          category: 'Essentials',
          name: 'Supermarkets, Banks & Shopping in ECIL / Sainikpuri',
          distance: 'Short drive',
        },
      ],
    },
  },

  // ===========================================================================
  // UPCOMING PROJECTS
  // ===========================================================================
  {
    id: 'sree-laxmi-villas-sultanpur',
    aliases: ['sultanpur-villas'],
    name: 'Luxury Villa Project — Sultanpur',
    status: 'Upcoming',
    location: 'Khajipalli, Near Sultanpur, Hyderabad',
    mapQuery: 'Sultanpur, Khajipalli, Patancheru, Hyderabad, Telangana',
    brochureUrl: '',
    youtubeVideoUrl: '',
    image: '/assets/projects/khajipalli-villas.webp',
    gallery: ['/assets/projects/khajipalli-villas.webp'],
    detailRoute: '/projects/sree-laxmi-villas-sultanpur',
    overview:
      'An upcoming gated luxury villa development near Sultanpur and Khajipalli with direct access to the Outer Ring Road (Exit 4) and Sultanpur Medical Devices Park, planned with contemporary triplex villa architecture and clubhouse lifestyle amenities.',
    specifications: [
      { label: 'Project Type', value: 'Gated Community Luxury Triplex Villas' },
      {
        label: 'Plot & Built-up',
        value: '150 Sq. Yards | 2,200 Sq. Ft. Villas',
      },
      { label: 'Location', value: 'Khajipalli / Near Sultanpur, Hyderabad' },
      {
        label: 'Road Connectivity',
        value: 'Near ORR Exit 4 (Sultanpur) & Bachupally Cross Roads',
      },
    ],
    amenities: [
      { icon: 'clubhouse', label: 'Clubhouse' },
      { icon: 'security', label: 'Gated Security' },
      { icon: 'garden', label: 'Landscaped Gardens' },
      { icon: 'play-area', label: "Children's Play Area" },
      { icon: 'walking-track', label: 'Walking Track' },
      { icon: 'parking', label: 'Private Villa Parking' },
    ],
    highlights: [
      'Strategic location near Sultanpur ORR Exit 4 & Medical Devices Park',
      '5 minutes from Bachupally Cross Roads',
      '15 minutes from Miyapur & Miyapur Metro Station',
      '30 minutes from Hitec City & Financial District via ORR',
    ],
    nearbyFacilities: {
      educational: [
        {
          category: 'Schools & Colleges',
          name: 'Bachupally Educational Hub & International Schools',
          distance: '5–10 minute drive',
        },
      ],
      healthcareAndEssentials: [
        {
          category: 'Medical Corridor',
          name: 'Sultanpur Medical Devices Park & ORR Exit 4',
          distance: 'Direct proximity',
        },
        {
          category: 'Transit',
          name: 'Miyapur Metro Station & Hitec City via ORR',
          distance: '15–30 minute drive',
        },
      ],
    },
  },
  {
    id: 'sln-meadows',
    aliases: ['meadows'],
    name: 'SLN Meadows',
    status: 'Upcoming',
    location: 'Kandi, Sangareddy',
    mapQuery: 'Kandi, Sangareddy, Telangana',
    brochureUrl: '',
    youtubeVideoUrl: '',
    image: '/assets/project-meadows.jpg',
    gallery: ['/assets/project-meadows.jpg'],
    detailRoute: '/projects/sln-meadows',
    overview:
      'SLN Meadows is an upcoming residential development in Kandi, Sangareddy, thoughtfully designed to combine serene green living with close proximity to IIT Hyderabad and the Mumbai Highway growth corridor.',
    specifications: [
      { label: 'Project Type', value: 'Upcoming Residential Community' },
      { label: 'Project Status', value: 'Upcoming Launch' },
      { label: 'Location', value: 'Kandi, Sangareddy' },
      {
        label: 'Road Connectivity',
        value: 'Near IIT Hyderabad & NH-65 Mumbai Highway',
      },
    ],
    amenities: [
      { icon: 'garden', label: 'Landscaped Open Spaces' },
      { icon: 'security', label: '24/7 Security' },
      { icon: 'walking-track', label: 'Walking Track' },
      { icon: 'play-area', label: "Children's Play Area" },
      { icon: 'parking', label: 'Dedicated Parking' },
      { icon: 'vastu', label: 'Vastu Planned Layout' },
    ],
    highlights: [
      'Located in the fast-appreciating Kandi, Sangareddy residential hub',
      'Seamless connectivity to IIT Hyderabad and ORR Exit 3 (Patancheru)',
      'Thoughtfully planned residential layouts with landscaped open spaces',
    ],
    nearbyFacilities: {
      educational: [
        {
          category: 'Premier Institute',
          name: 'IIT Hyderabad, Kandi',
          distance: 'Close proximity',
        },
        {
          category: 'Universities',
          name: 'GITAM University & MNR University Corridor',
          distance: 'Short drive via NH-65',
        },
      ],
      healthcareAndEssentials: [
        {
          category: 'Healthcare & Town',
          name: 'Hospitals & Essential Services in Kandi & Sangareddy',
          distance: 'Nearby along NH-65',
        },
        {
          category: 'Highway Connectivity',
          name: 'ORR Exit 3 (Patancheru) & NH-65 Corridor',
          distance: 'Direct access',
        },
      ],
    },
  },

  // ===========================================================================
  // COMPLETED PROJECTS (All 10 Official Completed Projects)
  // ===========================================================================
  {
    id: 'sreelaxmi-elite',
    name: 'Sreelaxmi Elite',
    status: 'Completed',
    location: 'Mallampet, Hyderabad',
    mapQuery: 'Mallampet, Hyderabad, Telangana',
    brochureUrl: '',
    youtubeVideoUrl: '',
    image: '/assets/projects/completed-sreelaxmi-elite.webp',
    gallery: ['/assets/projects/completed-sreelaxmi-elite.webp'],
    detailRoute: '/projects/sreelaxmi-elite',
    overview:
      'Sreelaxmi Elite is a completed 5-floor residential apartment project in Mallampet, Hyderabad, comprising 15 well-appointed flats across 18,000 sq. ft. of built-up area and delivered on schedule in 18 months.',
    specifications: [
      { label: 'Project Type', value: '5-Floor Residential Apartments' },
      { label: 'Total Units', value: '15 Flats (18,000 Sq. Ft.)' },
      { label: 'Location', value: 'Mallampet, Hyderabad' },
      { label: 'Completion Time', value: 'Delivered in 18 Months' },
    ],
    amenities: [
      { icon: 'security', label: '24/7 Security' },
      { icon: 'parking', label: 'Dedicated Parking' },
      { icon: 'power', label: 'Power Backup' },
      { icon: 'vastu', label: 'Vastu Compliant' },
      { icon: 'clubhouse', label: 'Elevator Access' },
      { icon: 'garden', label: 'Landscaped Entry' },
    ],
    highlights: [
      'Successfully completed and handed over in 18 months',
      '5 floors with 15 spacious residential flats',
      '18,000 sq. ft. total built-up area in prime Mallampet',
    ],
    nearbyFacilities: {
      educational: [
        {
          category: 'Schools & Colleges',
          name: 'International Schools & Junior Colleges in Mallampet & Bachupally',
          distance: '5–10 minute drive',
        },
      ],
      healthcareAndEssentials: [
        {
          category: 'Healthcare & Connectivity',
          name: 'Hospitals, Pharmacies & ORR Exit 4A (Mallampet)',
          distance: '5–10 minute drive',
        },
      ],
    },
  },
  {
    id: 'sreelaxmi-residency',
    name: 'Sreelaxmi Residency',
    status: 'Completed',
    location: 'Mallampet, Hyderabad',
    mapQuery: 'Mallampet, Hyderabad, Telangana',
    brochureUrl: '',
    youtubeVideoUrl: '',
    image: '/assets/projects/completed-sreelaxmi-residency.webp',
    gallery: ['/assets/projects/completed-sreelaxmi-residency.webp'],
    detailRoute: '/projects/sreelaxmi-residency',
    overview:
      'Sreelaxmi Residency is a completed 5-floor residential community in Mallampet, Hyderabad, featuring 15 flats across 18,000 sq. ft. of built-up area, completed within 18 months.',
    specifications: [
      { label: 'Project Type', value: '5-Floor Residential Apartments' },
      { label: 'Total Units', value: '15 Flats (18,000 Sq. Ft.)' },
      { label: 'Location', value: 'Mallampet, Hyderabad' },
      { label: 'Completion Time', value: 'Delivered in 18 Months' },
    ],
    amenities: [
      { icon: 'security', label: '24/7 Security' },
      { icon: 'parking', label: 'Dedicated Parking' },
      { icon: 'power', label: 'Power Backup' },
      { icon: 'vastu', label: 'Vastu Compliant' },
      { icon: 'clubhouse', label: 'Elevator Access' },
      { icon: 'garden', label: 'Landscaped Entry' },
    ],
    highlights: [
      'Completed and handed over within 18 months',
      '5 residential floors with 15 quality apartments',
      '18,000 sq. ft. total built-up area in Mallampet',
    ],
    nearbyFacilities: {
      educational: [
        {
          category: 'Schools & Colleges',
          name: 'Schools & Educational Institutions in Mallampet & Bachupally',
          distance: '5–10 minute drive',
        },
      ],
      healthcareAndEssentials: [
        {
          category: 'Healthcare & Connectivity',
          name: 'Hospitals, Supermarkets & Mallampet ORR Connectivity',
          distance: '5–10 minute drive',
        },
      ],
    },
  },
  {
    id: 'sree-urmila-avenue',
    name: 'Sree Urmila Avenue',
    status: 'Completed',
    location: 'Mallampet, Hyderabad',
    mapQuery: 'Mallampet, Hyderabad, Telangana',
    brochureUrl: '',
    youtubeVideoUrl: '',
    image: '/assets/projects/completed-sree-urmila-avenue.webp',
    gallery: ['/assets/projects/completed-sree-urmila-avenue.webp'],
    detailRoute: '/projects/sree-urmila-avenue',
    overview:
      'Sree Urmila Avenue is a landmark completed residential apartment complex in Mallampet, Hyderabad, spanning 40,000 sq. ft. of built-up area with 30 flats across 5 floors, completed in 20 months.',
    specifications: [
      { label: 'Project Type', value: '5-Floor Residential Complex' },
      { label: 'Total Units', value: '30 Flats (40,000 Sq. Ft.)' },
      { label: 'Location', value: 'Mallampet, Hyderabad' },
      { label: 'Completion Time', value: 'Delivered in 20 Months' },
    ],
    amenities: [
      { icon: 'security', label: '24/7 Security' },
      { icon: 'parking', label: 'Dedicated Parking' },
      { icon: 'power', label: 'Power Backup' },
      { icon: 'vastu', label: 'Vastu Compliant' },
      { icon: 'clubhouse', label: 'Elevator Access' },
      { icon: 'garden', label: 'Common Green Area' },
    ],
    highlights: [
      '30 residential flats across 5 floors',
      '40,000 sq. ft. total built-up area',
      'Delivered in 20 months in Mallampet, Hyderabad',
    ],
    nearbyFacilities: {
      educational: [
        {
          category: 'Schools & Colleges',
          name: 'Schools & Junior Colleges in Mallampet & Bachupally',
          distance: '5–10 minute drive',
        },
      ],
      healthcareAndEssentials: [
        {
          category: 'Healthcare & Essentials',
          name: 'Hospitals, Pharmacies & Daily Essentials in Mallampet',
          distance: '5–10 minute drive',
        },
      ],
    },
  },
  {
    id: 'sree-rudra-avenue',
    name: 'Sree Rudra Avenue',
    status: 'Completed',
    location: 'Mallampet, Hyderabad',
    mapQuery: 'Mallampet, Hyderabad, Telangana',
    brochureUrl: '',
    youtubeVideoUrl: '',
    image: '/assets/projects/completed-sree-rudra-avenue.webp',
    gallery: ['/assets/projects/completed-sree-rudra-avenue.webp'],
    detailRoute: '/projects/sree-rudra-avenue',
    overview:
      'Sree Rudra Avenue is a completed 5-floor residential apartment building in Mallampet, Hyderabad, offering 20 flats across 28,000 sq. ft. of built-up area and completed in 18 months.',
    specifications: [
      { label: 'Project Type', value: '5-Floor Residential Apartments' },
      { label: 'Total Units', value: '20 Flats (28,000 Sq. Ft.)' },
      { label: 'Location', value: 'Mallampet, Hyderabad' },
      { label: 'Completion Time', value: 'Delivered in 18 Months' },
    ],
    amenities: [
      { icon: 'security', label: '24/7 Security' },
      { icon: 'parking', label: 'Dedicated Parking' },
      { icon: 'power', label: 'Power Backup' },
      { icon: 'vastu', label: 'Vastu Compliant' },
      { icon: 'clubhouse', label: 'Elevator Access' },
      { icon: 'garden', label: 'Landscaped Setbacks' },
    ],
    highlights: [
      '20 well-ventilated residential apartments across 5 floors',
      '28,000 sq. ft. total built-up area',
      'Completed on schedule in 18 months',
    ],
    nearbyFacilities: {
      educational: [
        {
          category: 'Schools & Colleges',
          name: 'Schools & Educational Institutions in Mallampet & Bachupally',
          distance: '5–10 minute drive',
        },
      ],
      healthcareAndEssentials: [
        {
          category: 'Healthcare & Essentials',
          name: 'Hospitals, Clinics & Supermarkets in Mallampet',
          distance: '5–10 minute drive',
        },
      ],
    },
  },
  {
    id: 'sree-mahalaxmi-residency',
    name: 'Sree Mahalaxmi Residency',
    status: 'Completed',
    location: 'Mallampet, Hyderabad',
    mapQuery: 'Mallampet, Hyderabad, Telangana',
    brochureUrl: '',
    youtubeVideoUrl: '',
    image: '/assets/projects/completed-sree-mahalaxmi-residency.webp',
    gallery: ['/assets/projects/completed-sree-mahalaxmi-residency.webp'],
    detailRoute: '/projects/sree-mahalaxmi-residency',
    overview:
      'Sree Mahalaxmi Residency is a large-scale completed residential development in Mallampet, Hyderabad, featuring 40 apartments across 5 floors and 56,000 sq. ft. of built-up space, delivered in just 18 months.',
    specifications: [
      { label: 'Project Type', value: '5-Floor Residential Development' },
      { label: 'Total Units', value: '40 Flats (56,000 Sq. Ft.)' },
      { label: 'Location', value: 'Mallampet, Hyderabad' },
      { label: 'Completion Time', value: 'Delivered in 18 Months' },
    ],
    amenities: [
      { icon: 'security', label: '24/7 Security' },
      { icon: 'parking', label: 'Dedicated Parking' },
      { icon: 'power', label: 'Power Backup' },
      { icon: 'vastu', label: 'Vastu Compliant' },
      { icon: 'clubhouse', label: 'Elevator Access' },
      { icon: 'garden', label: 'Landscaped Surroundings' },
    ],
    highlights: [
      '40 residential apartments across 5 floors',
      '56,000 sq. ft. expansive built-up area',
      'Completed and handed over within 18 months',
    ],
    nearbyFacilities: {
      educational: [
        {
          category: 'Schools & Colleges',
          name: 'Schools & Colleges in Mallampet & Bachupally Corridor',
          distance: '5–10 minute drive',
        },
      ],
      healthcareAndEssentials: [
        {
          category: 'Healthcare & Essentials',
          name: 'Hospitals, Pharmacies & ORR Connectivity at Mallampet',
          distance: '5–10 minute drive',
        },
      ],
    },
  },
  {
    id: 'sreelaxmi-pearl',
    name: 'Sreelaxmi Pearl',
    status: 'Completed',
    location: 'Mallampet, Hyderabad',
    mapQuery: 'Mallampet, Hyderabad, Telangana',
    brochureUrl: '',
    youtubeVideoUrl: '',
    image: '/assets/projects/completed-sreelaxmi-pearl.webp',
    gallery: ['/assets/projects/completed-sreelaxmi-pearl.webp'],
    detailRoute: '/projects/sreelaxmi-pearl',
    overview:
      'Sreelaxmi Pearl is a completed 5-floor residential project in Mallampet, Hyderabad, comprising 15 apartments with a total built-up area of 15,000 sq. ft., completed in 15 months.',
    specifications: [
      { label: 'Project Type', value: '5-Floor Residential Apartments' },
      { label: 'Total Units', value: '15 Flats (15,000 Sq. Ft.)' },
      { label: 'Location', value: 'Mallampet, Hyderabad' },
      { label: 'Completion Time', value: 'Delivered in 15 Months' },
    ],
    amenities: [
      { icon: 'security', label: '24/7 Security' },
      { icon: 'parking', label: 'Dedicated Parking' },
      { icon: 'power', label: 'Power Backup' },
      { icon: 'vastu', label: 'Vastu Compliant' },
      { icon: 'clubhouse', label: 'Elevator Access' },
      { icon: 'garden', label: 'Landscaped Entry' },
    ],
    highlights: [
      'Fast-track completion within 15 months',
      '5 floors with 15 residential apartments',
      '15,000 sq. ft. built-up area in Mallampet',
    ],
    nearbyFacilities: {
      educational: [
        {
          category: 'Schools & Colleges',
          name: 'Schools & Educational Institutions in Mallampet & Bachupally',
          distance: '5–10 minute drive',
        },
      ],
      healthcareAndEssentials: [
        {
          category: 'Healthcare & Essentials',
          name: 'Hospitals, Clinics & Daily Essentials in Mallampet',
          distance: '5–10 minute drive',
        },
      ],
    },
  },
  {
    id: 'sreelaxmi-nilayam',
    name: 'Sreelaxmi Nilayam',
    status: 'Completed',
    location: 'Mallampet, Hyderabad',
    mapQuery: 'Mallampet, Hyderabad, Telangana',
    brochureUrl: '',
    youtubeVideoUrl: '',
    image: '/assets/projects/completed-sreelaxmi-nilayam.webp',
    gallery: ['/assets/projects/completed-sreelaxmi-nilayam.webp'],
    detailRoute: '/projects/sreelaxmi-nilayam',
    overview:
      'Sreelaxmi Nilayam is a completed 5-floor residential building in Mallampet, Hyderabad, featuring 20 thoughtfully designed 2 BHK apartments across 32,000 sq. ft. of built-up area, completed in 22 months.',
    specifications: [
      { label: 'Project Type', value: '2 BHK Residential Apartments' },
      { label: 'Total Units', value: '20 Flats (32,000 Sq. Ft.)' },
      { label: 'Location', value: 'Mallampet, Hyderabad' },
      { label: 'Completion Time', value: 'Delivered in 22 Months' },
    ],
    amenities: [
      { icon: 'security', label: '24/7 Security' },
      { icon: 'parking', label: 'Dedicated Parking' },
      { icon: 'power', label: 'Power Backup' },
      { icon: 'vastu', label: 'Vastu Compliant' },
      { icon: 'clubhouse', label: 'Elevator Access' },
      { icon: 'garden', label: 'Landscaped Entry' },
    ],
    highlights: [
      '20 spacious 2 BHK apartments across 5 floors',
      '32,000 sq. ft. total built-up area',
      'Completed in 22 months in Mallampet',
    ],
    nearbyFacilities: {
      educational: [
        {
          category: 'Schools & Colleges',
          name: 'Schools & Colleges in Mallampet & Bachupally',
          distance: '5–10 minute drive',
        },
      ],
      healthcareAndEssentials: [
        {
          category: 'Healthcare & Essentials',
          name: 'Hospitals, Pharmacies & Supermarkets in Mallampet',
          distance: '5–10 minute drive',
        },
      ],
    },
  },
  {
    id: 'sreelaxmi-pride',
    name: 'Sreelaxmi Pride',
    status: 'Completed',
    location: 'Mallampet, Hyderabad',
    mapQuery: 'Mallampet, Hyderabad, Telangana',
    brochureUrl: '',
    youtubeVideoUrl: '',
    image: '/assets/projects/completed-sreelaxmi-pride.webp',
    gallery: ['/assets/projects/completed-sreelaxmi-pride.webp'],
    detailRoute: '/projects/sreelaxmi-pride',
    overview:
      'Sreelaxmi Pride is a completed 5-floor 3 BHK residential apartment project in Mallampet, Hyderabad, comprising 15 apartments across 18,000 sq. ft. of built-up area and completed in 18 months.',
    specifications: [
      { label: 'Project Type', value: '3 BHK Residential Apartments' },
      { label: 'Total Units', value: '15 Flats (18,000 Sq. Ft.)' },
      { label: 'Location', value: 'Mallampet, Hyderabad' },
      { label: 'Completion Time', value: 'Delivered in 18 Months' },
    ],
    amenities: [
      { icon: 'security', label: '24/7 Security' },
      { icon: 'parking', label: 'Dedicated Parking' },
      { icon: 'power', label: 'Power Backup' },
      { icon: 'vastu', label: 'Vastu Compliant' },
      { icon: 'clubhouse', label: 'Elevator Access' },
      { icon: 'garden', label: 'Landscaped Entry' },
    ],
    highlights: [
      '15 exclusive 3 BHK apartments across 5 floors',
      '18,000 sq. ft. total built-up area',
      'Completed in 18 months in Mallampet',
    ],
    nearbyFacilities: {
      educational: [
        {
          category: 'Schools & Colleges',
          name: 'Schools & Junior Colleges in Mallampet & Bachupally',
          distance: '5–10 minute drive',
        },
      ],
      healthcareAndEssentials: [
        {
          category: 'Healthcare & Essentials',
          name: 'Hospitals, Clinics & Supermarkets in Mallampet',
          distance: '5–10 minute drive',
        },
      ],
    },
  },
  {
    id: 'sree-balaji-homes',
    name: 'Sree Balaji Homes',
    status: 'Completed',
    location: 'Shambhipur, Hyderabad',
    mapQuery: 'Shambhipur, Dundigal, Hyderabad, Telangana',
    brochureUrl: '',
    youtubeVideoUrl: '',
    image: '/assets/projects/completed-sree-balaji-homes.webp',
    gallery: ['/assets/projects/completed-sree-balaji-homes.webp'],
    detailRoute: '/projects/sree-balaji-homes',
    overview:
      'Sree Balaji Homes is a completed 5-floor 3 BHK residential apartment community in Shambhipur, Hyderabad, offering 15 spacious apartments across 18,000 sq. ft. of built-up area and delivered in 18 months.',
    specifications: [
      { label: 'Project Type', value: '3 BHK Residential Apartments' },
      { label: 'Total Units', value: '15 Flats (18,000 Sq. Ft.)' },
      { label: 'Location', value: 'Shambhipur, Hyderabad' },
      { label: 'Completion Time', value: 'Delivered in 18 Months' },
    ],
    amenities: [
      { icon: 'security', label: '24/7 Security' },
      { icon: 'parking', label: 'Dedicated Parking' },
      { icon: 'power', label: 'Power Backup' },
      { icon: 'vastu', label: 'Vastu Compliant' },
      { icon: 'clubhouse', label: 'Elevator Access' },
      { icon: 'garden', label: 'Landscaped Entry' },
    ],
    highlights: [
      '15 spacious 3 BHK flats across 5 floors',
      '18,000 sq. ft. built-up area in Shambhipur',
      'Completed and handed over in 18 months',
    ],
    nearbyFacilities: {
      educational: [
        {
          category: 'Schools & Colleges',
          name: 'Schools & Engineering Colleges in Shambhipur, Bowrampet & Bachupally',
          distance: '5–10 minute drive',
        },
      ],
      healthcareAndEssentials: [
        {
          category: 'Healthcare & Essentials',
          name: 'Hospitals, Pharmacies & Outer Ring Road Connectivity',
          distance: '5–10 minute drive',
        },
      ],
    },
  },
  {
    id: 'sree-laxmi-avenue',
    name: 'Sree Laxmi Avenue',
    status: 'Completed',
    location: 'Mallampet, Hyderabad',
    mapQuery: 'Mallampet, Hyderabad, Telangana',
    brochureUrl: '',
    youtubeVideoUrl: '',
    image: '/assets/projects/completed-sree-laxmi-avenue.webp',
    gallery: ['/assets/projects/completed-sree-laxmi-avenue.webp'],
    detailRoute: '/projects/sree-laxmi-avenue',
    overview:
      'Sree Laxmi Avenue is a completed 5-floor residential apartment project in Mallampet, Hyderabad, featuring 15 well-planned apartments across 12,000 sq. ft. of built-up area, completed in 18 months.',
    specifications: [
      { label: 'Project Type', value: '5-Floor Residential Apartments' },
      { label: 'Total Units', value: '15 Flats (12,000 Sq. Ft.)' },
      { label: 'Location', value: 'Mallampet, Hyderabad' },
      { label: 'Completion Time', value: 'Delivered in 18 Months' },
    ],
    amenities: [
      { icon: 'security', label: '24/7 Security' },
      { icon: 'parking', label: 'Dedicated Parking' },
      { icon: 'power', label: 'Power Backup' },
      { icon: 'vastu', label: 'Vastu Compliant' },
      { icon: 'clubhouse', label: 'Elevator Access' },
      { icon: 'garden', label: 'Landscaped Entry' },
    ],
    highlights: [
      '15 residential flats across 5 floors',
      '12,000 sq. ft. built-up area in Mallampet',
      'Completed and delivered in 18 months',
    ],
    nearbyFacilities: {
      educational: [
        {
          category: 'Schools & Colleges',
          name: 'Schools & Junior Colleges in Mallampet & Bachupally',
          distance: '5–10 minute drive',
        },
      ],
      healthcareAndEssentials: [
        {
          category: 'Healthcare & Essentials',
          name: 'Hospitals, Clinics & Supermarkets in Mallampet',
          distance: '5–10 minute drive',
        },
      ],
    },
  },
];

export const PROJECT_FLOOR_PLAN_CATEGORIES = [
  {
    id: 'ground-floor',
    label: 'Ground Floor',
    items: [
      {
        id: 'ground-floor-block-a',
        title: 'Ground Floor – Block A',
        alt: 'Ground Floor Plan – Block A',
        image: '/assets/floor-plans/ground-floor-block-a.svg',
      },
      {
        id: 'ground-floor-block-b',
        title: 'Ground Floor – Block B',
        alt: 'Ground Floor Plan – Block B',
        image: '/assets/floor-plans/ground-floor-block-b.svg',
      },
      {
        id: 'ground-floor-block-c',
        title: 'Ground Floor – Block C',
        alt: 'Ground Floor Plan – Block C',
        image: '/assets/floor-plans/ground-floor-block-c.svg',
      },
      {
        id: 'ground-floor-block-d',
        title: 'Ground Floor – Block D',
        alt: 'Ground Floor Plan – Block D',
        image: '/assets/floor-plans/ground-floor-block-d.svg',
      },
      {
        id: 'ground-floor-block-e',
        title: 'Ground Floor – Block E',
        alt: 'Ground Floor Plan – Block E',
        image: '/assets/floor-plans/ground-floor-block-e.svg',
      },
      {
        id: 'ground-floor-block-f',
        title: 'Ground Floor – Block F',
        alt: 'Ground Floor Plan – Block F',
        image: '/assets/floor-plans/ground-floor-block-f.svg',
      },
    ],
  },
  {
    id: 'typical-floor',
    label: 'Typical Floor',
    items: [
      {
        id: 'typical-floor-block-a',
        title: 'Typical Floor – Block A',
        alt: 'Typical Floor Plan – Block A',
        image: '/assets/floor-plans/typical-floor-block-a.svg',
      },
      {
        id: 'typical-floor-block-b',
        title: 'Typical Floor – Block B',
        alt: 'Typical Floor Plan – Block B',
        image: '/assets/floor-plans/typical-floor-block-b.svg',
      },
      {
        id: 'typical-floor-block-c',
        title: 'Typical Floor – Block C',
        alt: 'Typical Floor Plan – Block C',
        image: '/assets/floor-plans/typical-floor-block-c.svg',
      },
      {
        id: 'typical-floor-block-d',
        title: 'Typical Floor – Block D',
        alt: 'Typical Floor Plan – Block D',
        image: '/assets/floor-plans/typical-floor-block-d.svg',
      },
      {
        id: 'typical-floor-block-e',
        title: 'Typical Floor – Block E',
        alt: 'Typical Floor Plan – Block E',
        image: '/assets/floor-plans/typical-floor-block-e.svg',
      },
      {
        id: 'typical-floor-block-f',
        title: 'Typical Floor – Block F',
        alt: 'Typical Floor Plan – Block F',
        image: '/assets/floor-plans/typical-floor-block-f.svg',
      },
    ],
  },
];

export function getProjectsByStatus(status) {
  if (!status) return PROJECTS_DATA;
  return PROJECTS_DATA.filter(
    (project) => project.status.toLowerCase() === status.toLowerCase()
  );
}

export function getProjectByIdOrAlias(slug) {
  if (!slug) return null;
  const normalized = slug.toLowerCase();
  return (
    PROJECTS_DATA.find(
      (project) =>
        project.id.toLowerCase() === normalized ||
        (project.aliases &&
          project.aliases.some((alias) => alias.toLowerCase() === normalized))
    ) || null
  );
}

