export const INTRO_STORAGE_KEY = 'dunaj_intro_seen';

/**
 * Inline <head> script: decides before first paint whether the preloader runs.
 * Sets <html data-intro="skip"> for returning sessions, reduced motion and the
 * Sanity Studio, so the cover never flashes on later page loads.
 */
export const introGuardScript = `(function(){var d=document.documentElement;try{if(sessionStorage.getItem('${INTRO_STORAGE_KEY}')||window.matchMedia('(prefers-reduced-motion: reduce)').matches||location.pathname.indexOf('/studio')===0){d.setAttribute('data-intro','skip')}}catch(e){d.setAttribute('data-intro','skip')}})();`;
