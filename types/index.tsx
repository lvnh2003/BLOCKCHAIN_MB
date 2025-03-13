export interface User {
    code: string;
    password: string;
    role? : 'STUDENT' | 'TEACHER' | 'MASTER';
    name?: string;
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
    name: string;
    issueDate: string;
    progress?: number;
    icon?: string;
    imageUrl: string;
    description?: string;
    status?: 'signed' | 'pending';
  }