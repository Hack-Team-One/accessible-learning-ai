export type Message = {
  role: 'user' | 'system';
  content: string;
}

export type Segment = {
  type: 'text' | 'code';
  content: string;
};
