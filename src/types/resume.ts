// 인터페이스 정의
export interface Personal {
  name: string;
  title: string;
  email: string;
  phone: string;
  github: string;
  portfolio: string;
}

export interface Skills {
  frontend: string;
  backend: string;
  devtools: string;
  other: string;
}

export interface Experience {
  company: string;
  title: string;
  location: string;
  period: string;
  achievements: string[];
}

export interface Project {
  name: string;
  tech: string;
  description: string;
  link: string;
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
}

export interface ResumeData {
  personal: Personal;
  summary: string;
  skills: Skills;
  experiences: Experience[];
  projects: Project[];
  education: Education;
  certifications: string[];
}

// 편집 필드 타입
export type FieldPath = string;
