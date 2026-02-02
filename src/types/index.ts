export interface CurriculumItem {
  title: string;
  duration: string;
  type: string;
}

export interface Course {
  id: number;
  title: string;
  category: string;
  instructor: string;
  instructorRole: string;
  price: number;
  originalPrice: number;
  lessons: number;
  duration: string;
  rating: number;
  students: number;
  image: string;
  badge: string;
  level: string;
  language: string;
  certificate: boolean;
  lastUpdated?: string;
  description: string;
  whatYouLearn: string[];
  curriculum: CurriculumItem[];
  requirements: string[];
}

export interface Category {
  id: number;
  name: string;
  icon: string;
  count: number;
}