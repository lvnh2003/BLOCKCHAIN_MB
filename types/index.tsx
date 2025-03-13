export interface User {
  code: string;
  password: string;
  role?: "STUDENT" | "TEACHER" | "MASTER";
  name?: string;
  id?: string;
}

export interface Teacher {
  id: string;
  name: string;
  teacherId: string;
  major: string;
  avatar: string;
}

export interface Certificate {
  id: string;
  createdAt: string;
  imageUrl?: string;
  description?: string;
  status?: "SIGNED" | "PENDING";
  certificateType : CertificateType;
}
interface CertificateType{
  id?: string;
  name: string
}
export interface Student {
  id: string;
  name: string;
  score: number;
  status: "pending" | "signed";
}
