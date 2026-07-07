/**
 * Heuristic device fingerprint -> CSS-pixels-per-inch guess.
 * "CSS ppi" here means CSS px per real-world inch (not raw hardware DPI), since all
 * rendering happens in CSS px. This is inherently approximate — the caller must always
 * present it as a guess the user confirms, never apply it silently.
 */
interface DeviceEntry {
	name: string;
	match(dpr: number, w: number, h: number): boolean;
	cssPpi: number;
}

function inRange(value: number, lo: number, hi: number): boolean {
	return value >= lo && value <= hi;
}

const DEVICES: DeviceEntry[] = [
	{
		name: 'iPhone (Retina, @3x)',
		match: (d, w, h) => d >= 2.9 && inRange(Math.min(w, h), 340, 440) && inRange(Math.max(w, h), 650, 950),
		cssPpi: 163,
	},
	{
		name: 'iPhone SE-class (Retina, @2x)',
		match: (d, w, h) => inRange(d, 1.9, 2.5) && inRange(Math.min(w, h), 300, 380) && inRange(Math.max(w, h), 550, 700),
		cssPpi: 163,
	},
	{
		name: 'iPad',
		match: (d, w, h) => inRange(d, 1.9, 2.5) && Math.min(w, h) >= 700 && Math.max(w, h) >= 900,
		cssPpi: 132,
	},
	{
		name: 'MacBook / Apple Silicon laptop (Retina)',
		match: (d, w, h) => inRange(d, 1.9, 2.5) && inRange(Math.min(w, h), 760, 1250),
		cssPpi: 113,
	},
	{
		name: 'High-density Android phone',
		match: (d, w, h) => d >= 2.5 && inRange(Math.min(w, h), 340, 460),
		cssPpi: 160,
	},
	{
		name: 'Standard desktop monitor (96 CSS-ppi baseline)',
		match: (d) => d === 1,
		cssPpi: 96,
	},
];

export interface AutoDetectResult {
	ppi: number;
	label: string;
	confident: boolean;
}

export function autoDetect(): AutoDetectResult {
	const dpr = window.devicePixelRatio || 1;
	const w = window.screen.width;
	const h = window.screen.height;

	const hit = DEVICES.find((d) => d.match(dpr, w, h));
	if (hit) {
		return { ppi: hit.cssPpi, label: hit.name, confident: true };
	}

	const fallbackPpi = 96 * dpr;
	return {
		ppi: fallbackPpi,
		label: `Estimated from your screen's pixel ratio (${dpr}×) — not in our device list`,
		confident: false,
	};
}
