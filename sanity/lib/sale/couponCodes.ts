export const COUPON_CODES= {
DIWALI: "DIWALI",
CHRISTMAS: "CHRISTMAS", 
BFRIDY: "BFRIDY"
} as const;

export type CouponCode = keyof typeof COUPON_CODES;