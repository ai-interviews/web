export type Job = {
    id: string
    userId: string
    title: string
    company: string
    location: string | null
    description: string
    url: string | null
  };
  
  
  export type FormJob = {
    title?: string;
    company?: string;
    location?: string;
    description?: string;
    url?: string;
  };