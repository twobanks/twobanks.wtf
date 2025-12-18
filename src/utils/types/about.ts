import { ElementType } from "react";

export interface Experience {
  role: string;
  name_company: string;
  url_company?: string;
  city_company: string;
  period: string;
  description?: string[];
  tech?: string[];       
}

export interface SocialItem {
  name: string;
  link: string;
  icon: ElementType;
}