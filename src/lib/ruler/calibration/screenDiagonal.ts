/**
 * CSS-ppi = (screen diagonal in CSS px) / (screen diagonal in inches).
 * window.screen.width/height are already reported in CSS px, so devicePixelRatio
 * cancels out of this calculation - no need to factor it in.
 */
export function ppiFromDiagonal(diagonalInches: number): number {
	const diagonalCssPx = Math.hypot(window.screen.width, window.screen.height);
	return diagonalCssPx / diagonalInches;
}
