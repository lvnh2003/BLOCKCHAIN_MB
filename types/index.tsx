export interface User {
    username: string;
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
    progress: number;
    icon: string;
    imageUrl: string;
    description: string;
  }