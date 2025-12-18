interface Company {
  name: string;
  link: string;
}

export interface WorkItem {
  name: string;
  type: string;
  link: string;
  tech: string[];
  company: Company;
}

export type WorksStyle = {
  $stack: string;
}