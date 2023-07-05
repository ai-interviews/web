export type Job = {
  id: string;
  userId: string;
  title?: string;
  company?: string;
  location?: string;
  description?: string;
  url?: string;
};

export type FormJob = {
  title?: string;
  company?: string;
  location?: string;
  description?: string;
  url?: string;
};
