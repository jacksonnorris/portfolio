export type LinkIcon = 'apple' | 'android' | 'web' | 'github';

export type ProjectCategory = 'professional' | 'earlier';

export interface ProjectLink {
  url: string;
  label: string;
  icon: LinkIcon;
}

export interface Project {
  id: number;
  category: ProjectCategory;
  title: string;
  description: string;
  tags: string[];
  subtitle?: string;
  status?: string;
  links?: ProjectLink[];
}

export interface Contact {
  email: string;
  linkedin: string;
  github: string;
}

export interface PortfolioData {
  name: string;
  title: string;
  /** Rendered as one paragraph per entry. A bare string is accepted too. */
  about: string[] | string;
  contact: Contact;
  projects: Project[];
}

export type MapPointType = 'work' | 'travel';

export interface MapPoint {
  id: string;
  type: MapPointType;
  name: string;
  description: string;
  /** [longitude, latitude] */
  coordinates: [number, number];
}

export interface MapData {
  points: MapPoint[];
}
