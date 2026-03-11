/**
 * Kriptovalute.hr - Eventi
 * Za dodavanje novog eventa, dodajte objekt u niz KRIPTO_EVENTS.
 * Obavezni podaci: title, shortDescription, image, url, startDate, endDate, location, category
 */
var KRIPTO_EVENTS = [
  {
    id: "1",
    title: "BTC Prague 2025",
    shortDescription: "Jedna od vodećih Bitcoin konferencija u Europi. Sastanak Bitcoin entuzijasta, developera i investitora u Pragu.",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop",
    url: "https://btcprague.com",
    startDate: "2025-06-19",
    endDate: "2025-06-21",
    location: "Prag, Češka",
    country: "Češka",
    category: ["Bitcoin"],
    featured: true
  },
  {
    id: "2",
    title: "Paris Blockchain Week 2025",
    shortDescription: "Vodeća blockchain konferencija u Parizu. Globalna blockchain elita se okuplja radi networkinga i inovacija.",
    image: "https://images.unsplash.com/photo-1502602898657-3e8b968a0063?w=400&h=250&fit=crop",
    url: "https://parisblockchainweek.com/",
    startDate: "2025-04-08",
    endDate: "2025-04-10",
    location: "Pariz, Francuska",
    country: "Francuska",
    category: ["Blockchain", "Web3"],
    featured: true
  },
  {
    id: "3",
    title: "Token 2049 Dubai",
    shortDescription: "Globalna blockchain i kripto konferencija gdje se okupljaju donositelji odluka iz cijelog svijeta.",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=250&fit=crop",
    url: "https://www.token2049.com",
    startDate: "2025-04-30",
    endDate: "2025-05-01",
    location: "Dubai, UAE",
    country: "UAE",
    category: ["Blockchain", "Web3"],
    featured: false
  },
  {
    id: "4",
    title: "ETH CC 2025",
    shortDescription: "Najveća godišnja Ethereum konferencija u Europi, usmjerena na ETH zajednicu i tehnologiju.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop",
    url: "https://ethcc.io/",
    startDate: "2025-06-30",
    endDate: "2025-07-03",
    location: "Cannes, Francuska",
    country: "Francuska",
    category: ["Ethereum"],
    featured: true
  },
  {
    id: "5",
    title: "Consensus Hong Kong 2025",
    shortDescription: "Najveći i najutjecajniji susret blockchain, digitalne imovine i Web3 zajednica u Aziji.",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=250&fit=crop",
    url: "https://consensus-hongkong2025.coindesk.com/",
    startDate: "2025-02-18",
    endDate: "2025-02-20",
    location: "Hong Kong",
    country: "Hong Kong",
    category: ["Web3"],
    featured: false
  },
  {
    id: "6",
    title: "Cosmoverse 2025",
    shortDescription: "Cosmos ekosustav konferencija u Splitu. AI, DeFi, zero-knowledge, Bitcoin i real-world assets.",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=250&fit=crop",
    url: "https://cosmoverse.org/",
    startDate: "2025-10-30",
    endDate: "2025-11-01",
    location: "Split, Hrvatska",
    country: "Hrvatska",
    category: ["Web3"],
    featured: true
  },
  {
    id: "7",
    title: "European Blockchain Convention 2025",
    shortDescription: "11. izdanje vodeće europske blockchain konferencije u Barceloni. 6000+ sudionika, 300+ govornika.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop",
    url: "https://eblockchainconvention.com/european-blockchain-convention-11/",
    startDate: "2025-10-15",
    endDate: "2025-10-17",
    location: "Barcelona, Španjolska",
    country: "Španjolska",
    category: ["Blockchain", "Crypto"],
    featured: false
  },
  {
    id: "8",
    title: "NiceHashX Bitcoin Conference",
    shortDescription: "Posebna kripto konferencija u Mariboru povodom 10. obljetnice NiceHasha. Govori o Bitcoinu i mining industriji.",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop",
    url: "https://www.nicehashx.com/",
    startDate: "2024-11-08",
    endDate: "2024-11-09",
    location: "Maribor, Slovenija",
    country: "Slovenija",
    category: ["Bitcoin"],
    featured: false
  },
  {
    id: "9",
    title: "Devcon 7",
    shortDescription: "Konferencija za developere, mislioce i kreatore. Četiri dana u Lisabonu posvećena Ethereum ekosustavu.",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=250&fit=crop",
    url: "https://devcon.org/",
    startDate: "2024-11-12",
    endDate: "2024-11-15",
    location: "Lisabon, Portugal",
    country: "Portugal",
    category: ["Ethereum"],
    featured: false
  },
  {
    id: "10",
    title: "Blockchain Life 2025",
    shortDescription: "15. međunarodni forum o kriptu, Web3 i miningu. Preko 10.000 sudionika u Dubaiju.",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=250&fit=crop",
    url: "https://blockchain-life.com/autumn2025/",
    startDate: "2025-10-28",
    endDate: "2025-10-29",
    location: "Dubai, UAE",
    country: "UAE",
    category: ["Blockchain", "Crypto"],
    featured: false
  },
  {
    id: "11",
    title: "Ethereum Zagreb Meetup",
    shortDescription: "Pridružite nam se na prvom Ethereum Zagreb Meetupu! House of Blockchain, 29.1., 18:00h. Aave V4, EIP-ovi, validatori i networking.",
    image: "https://media.licdn.com/dms/image/v2/D4D22AQGfsVBA1KAcQA/feedshare-shrink_800/B4DZwDwC8fKMAg-/0/1769589452888?e=1772668800&v=beta&t=Pf93Tsb2WS-4v9Z56JflNh3ne3WXgo8vptzFs_KYgcQ",
    url: "https://luma.com/yze9avsb?tk=NSEbW4",
    startDate: "2026-01-29",
    endDate: "2026-01-29",
    location: "City Plaza Zagreb, Zagreb, Grad Zagreb",
    country: "Hrvatska",
    category: ["Ethereum", "Crypto", "Web3"],
    featured: true
  }
];
