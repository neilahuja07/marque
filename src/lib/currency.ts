/**
 * Currency conversion utilities for Razorpay integration.
 *
 * Product prices on the website are stored/displayed in USD.
 * Razorpay orders are always created in INR for Indian payment methods (UPI).
 *
 * This module is the single source of truth for the exchange rate.
 * To switch to a live rate later, replace the constant below with an API call.
 */

/** Fixed USD → INR rate used for Razorpay order conversion. */
export const USD_TO_INR_RATE = 95;

/**
 * Convert a USD amount to INR.
 * Returns the INR amount as a number with two decimal places.
 *
 * Example: usdToInr(9.50) → 902.5
 */
export function usdToInr(usdAmount: number): number {
  return Math.round(usdAmount * USD_TO_INR_RATE * 100) / 100;
}

/**
 * Convert a USD amount to the smallest INR unit (paise).
 * Uses integer arithmetic to avoid floating-point rounding errors.
 *
 * Example: usdToPaise(9.50) → 90250  (₹902.50)
 */
export function usdToPaise(usdAmount: number): number {
  return Math.round(usdAmount * USD_TO_INR_RATE * 100);
}

/**
 * Format a USD price for website display.
 *
 * Example: formatUsd(9.50) → "$9.50"
 */
export function formatUsd(amount: number): string {
  return `$${amount.toFixed(2)}`;
}
