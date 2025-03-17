export interface User {
  code: string;
  password?: string;
  role?: "STUDENT" | "TEACHER" | "MASTER" | "COMPANY";
  name?: string;
  id?: string;
  avatar?: string;
  birthdate?: string;
  image?: string;
  dateOfBirth?: string;
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
  createdAt: number;
  imageUrl?: string;
  description?: string;
  status?: "SIGNED" | "PENDING" | "APPROVED";
  certificateType? : CertificateType;
  certId? : string;
  name?: string
}
export interface CertificateType {
  id?: string;
  name: string;
}
export interface Student {
  id: string;
  name: string;
  score: number;
  status: "pending" | "signed";
}

// TEACHER

interface StudentInfoTeacher {
  id: string;
  createdAt: number;
  updatedAt: number;
  code: string;
  name: string;
  password: string;
  dateOfBirth: string;
  role: "STUDENT" | "TEACHER" | "MASTER";
  walletAddress: string;
  walletPrivateKey: string;
}

export interface CertificateResponeTeacher {
  certificate: Certificate;
  studentInfor: StudentInfoTeacher;
  certificateType: CertificateType;
}

export interface StudentOfCertificateResponse {
  id: string;
  createdAt: number;
  name: string;
  score: 99;
  role: "STUDENT" | "TEACHER" | "MASTER";
  certificate: {
    createdAt: number;
    status: "SIGNED" | "PENDING";
    certificateTypeId: string;
  };
}
