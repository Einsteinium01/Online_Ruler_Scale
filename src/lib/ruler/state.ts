import type { Unit } from './units';

export type Edge = 'top' | 'bottom' | 'left' | 'right';
export type CalibrationMethod = 'auto' | 'diagonal' | 'card' | 'manual';

export interface RulerState {
	ppi: number | null;
	method: CalibrationMethod | null;
	calibratedAt: number | null;
	unit: Unit;
	activeEdges: Edge[];
}

const STORAGE_KEY = 'ors:calibration';
export const DEFAULT_PPI = 96;

function defaults(): RulerState {
	return {
		ppi: null,
		method: null,
		calibratedAt: null,
		unit: 'cm',
		activeEdges: ['top', 'left'],
	};
}

export function loadState(): RulerState {
	const base = defaults();
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return base;
		const parsed = JSON.parse(raw);
		return { ...base, ...parsed };
	} catch {
		return base;
	}
}

export function persist(state: RulerState): void {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
	} catch {
		/* storage unavailable (private browsing) - calibration just won't survive a reload */
	}
}

export function applyCalibration(state: RulerState, ppi: number, method: CalibrationMethod): void {
	state.ppi = ppi;
	state.method = method;
	state.calibratedAt = Date.now();
	persist(state);
}

export function effectivePpi(state: RulerState): number {
	return state.ppi ?? DEFAULT_PPI;
}

export function isCalibrated(state: RulerState): boolean {
	return state.ppi !== null;
}
