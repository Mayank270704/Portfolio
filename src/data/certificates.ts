export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  issued: string;
  credentialId: string | null;
  verifyUrl: string | null;
  summary: string;
};

export const certificates: Certificate[] = [];
