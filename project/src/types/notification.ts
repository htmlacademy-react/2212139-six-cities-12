export interface Notification {
  id: string;
  type: 'error' | 'warning' | 'success' | 'info';
  message: string;
  duration?: number;
}
