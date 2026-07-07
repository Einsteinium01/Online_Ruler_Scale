/** ISO/IEC 7810 ID-1 card size - every credit/debit/ID/loyalty card shares this size. */
export const CARD_WIDTH_MM = 85.6;
export const CARD_HEIGHT_MM = 53.98;
export const CARD_ASPECT = CARD_HEIGHT_MM / CARD_WIDTH_MM;

export function ppiFromCardWidthPx(widthPx: number): number {
	return widthPx / (CARD_WIDTH_MM / 25.4);
}

export function guessInitialCardWidthPx(ppi: number): number {
	return Math.round(ppi * (CARD_WIDTH_MM / 25.4));
}
