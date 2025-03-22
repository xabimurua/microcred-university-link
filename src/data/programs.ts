
export interface Program {
  id: number;
  title: string;
  provider: string;
  category: string;
  duration: string;
  rating: number;
  students: number;
  imageSrc: string;
  featured?: boolean;
  new?: boolean;
  popular?: boolean;
}

export const programs: Program[] = [
  {
    id: 1,
    title: "Data Science for Business Intelligence",
    provider: "Stanford University",
    category: "Technology",
    duration: "8 weeks",
    rating: 4.8,
    students: 3240,
    imageSrc: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&q=80",
    featured: true,
    popular: true
  },
  {
    id: 2,
    title: "Strategic Leadership & Management",
    provider: "Harvard Business School",
    category: "Business",
    duration: "6 weeks",
    rating: 4.9,
    students: 4120,
    imageSrc: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
    popular: true
  },
  {
    id: 3,
    title: "Cybersecurity for Organizations",
    provider: "MIT",
    category: "Security",
    duration: "10 weeks",
    rating: 4.7,
    students: 2890,
    imageSrc: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
    featured: true
  },
  {
    id: 4,
    title: "Digital Marketing Analytics",
    provider: "Northwestern University",
    category: "Marketing",
    duration: "5 weeks",
    rating: 4.6,
    students: 3560,
    imageSrc: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    title: "Machine Learning Fundamentals",
    provider: "UC Berkeley",
    category: "Technology",
    duration: "12 weeks",
    rating: 4.9,
    students: 5230,
    imageSrc: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
    new: true
  },
  {
    id: 6,
    title: "Product Management Essentials",
    provider: "Google",
    category: "Business",
    duration: "4 weeks",
    rating: 4.7,
    students: 2890,
    imageSrc: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&q=80",
    new: true
  },
  {
    id: 7,
    title: "Financial Analysis and Modeling",
    provider: "London School of Economics",
    category: "Finance",
    duration: "8 weeks",
    rating: 4.5,
    students: 1950,
    imageSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 8,
    title: "Cloud Computing Architecture",
    provider: "Amazon Web Services",
    category: "Technology",
    duration: "6 weeks",
    rating: 4.8,
    students: 3470,
    imageSrc: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
    popular: true
  },
  {
    id: 9,
    title: "UX Design Principles",
    provider: "Interaction Design Foundation",
    category: "Design",
    duration: "5 weeks",
    rating: 4.6,
    students: 2180,
    imageSrc: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 10,
    title: "Blockchain for Business",
    provider: "MIT",
    category: "Technology",
    duration: "7 weeks",
    rating: 4.4,
    students: 1620,
    imageSrc: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=600&q=80",
    new: true
  },
  {
    id: 11,
    title: "Supply Chain Management",
    provider: "Michigan State University",
    category: "Business",
    duration: "9 weeks",
    rating: 4.7,
    students: 2340,
    imageSrc: "https://images.unsplash.com/photo-1584697964400-2af6a2f6204c?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 12,
    title: "Artificial Intelligence Ethics",
    provider: "Stanford University",
    category: "Technology",
    duration: "4 weeks",
    rating: 4.9,
    students: 1890,
    imageSrc: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80",
    featured: true
  }
];
