import type { CalibrationMethod } from './state';

/** Encodes calibration as a short, URL-safe code so it can be copied to another device. */
export function encodeCalibration(ppi: number, method: CalibrationMethod): string {
	const payload = `${Math.round(ppi * 10)}.${method}`;
	return btoa(payload).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function decodeCalibration(code: string): { ppi: number; method: CalibrationMethod } | null {
	try {
		const restored = code.replace(/-/g, '+').replace(/_/g, '/');
		const payload = atob(restored);
		const [ppiRaw, method] = payload.split('.');
		const ppi = Number(ppiRaw) / 10;
		if (!Number.isFinite(ppi) || ppi <= 0) return null;
		return { ppi, method: (method as CalibrationMethod) || 'manual' };
	} catch {
		return null;
	}
}

export function calibrationLink(ppi: number, method: CalibrationMethod): string {
	const url = new URL(window.location.href);
	url.hash = 'ruler';
	url.searchParams.set('cal', encodeCalibration(ppi, method));
	return url.toString();
}

export function readCalibrationFromURL(): { ppi: number; method: CalibrationMethod } | null {
	const params = new URLSearchParams(window.location.search);
	const code = params.get('cal');
	if (!code) return null;
	return decodeCalibration(code);
}
