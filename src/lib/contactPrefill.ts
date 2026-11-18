/** id of the ContactForm <section>, used as a scroll target. */
export const CONTACT_FORM_ID = 'contact-form';

/** window CustomEvent that pre-fills the ContactForm on the current page. */
export const CONTACT_PREFILL_EVENT = 'dunaj:contact-prefill';

export interface ContactPrefillDetail {
  service: string;
  message: string;
}
