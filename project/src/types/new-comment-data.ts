import { Host } from './comment';

export type NewCommentData = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: Host;
};
