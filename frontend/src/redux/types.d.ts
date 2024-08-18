export interface User {
    id: string;
    email: string;
    verified: boolean;
    segments: string[];
  }
  
  export interface Message {
    id: string;
    text: string;
    segments: string[];
  }
  
  export interface Segment {
    id: string;
    name: string;
    users: string[];
  }  