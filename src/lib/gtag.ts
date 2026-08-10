export const gaEvent = (action: string, params?: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, params);
  }
};
