interface User {
  id: string;
  email: string;
  emailVerified: boolean;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  image?: string | undefined;
}

export type UserTypes = User | undefined;

export interface Message {
  message: string;
  seed: string;
  id: string;
  image: string;
}

export type MessagesResponse =
  | "Failed to retrieve messages"
  | {
      messages: Message[];
      success: string;
    };
    
export interface MessageCardProps {
      userId: string;
      setSpin: React.Dispatch<React.SetStateAction<boolean>>;
}