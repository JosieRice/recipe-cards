export interface Match {
  isExact: boolean;
  params: {
    id: string;
  };
  path: string;
  url: string;
}

export interface History {
  goBack: any;
}
