export type Unit = 'mm' | 'cm' | 'in' | 'px';

export const UNITS: Unit[] = ['mm', 'cm', 'in', 'px'];

const MM_PER_INCH = 25.4;

export function pxToUnit(px: number, ppi: number, unit: Unit): number {
	switch (unit) {
		case 'px':
			return px;
		case 'in':
			return px / ppi;
		case 'mm':
			return (px / ppi) * MM_PER_INCH;
		case 'cm':
			return ((px / ppi) * MM_PER_INCH) / 10;
	}
}

export function unitLabel(unit: Unit): string {
	return { mm: 'mm', cm: 'cm', in: 'in', px: 'px' }[unit];
}

export function formatUnit(px: number, ppi: number, unit: Unit): string {
	const value = pxToUnit(px, ppi, unit);
	const decimals = unit === 'px' ? 0 : unit === 'in' ? 2 : 1;
	return `${value.toFixed(decimals)} ${unitLabel(unit)}`;
}

/** Live cursor readout: show every unit at once, regardless of the ruler's selected unit. */
export function formatAllUnits(px: number, ppi: number): string {
	const mm = pxToUnit(px, ppi, 'mm');
	const cm = pxToUnit(px, ppi, 'cm');
	const inch = pxToUnit(px, ppi, 'in');
	return `${mm.toFixed(1)} mm · ${cm.toFixed(2)} cm · ${inch.toFixed(2)} in · ${Math.round(px)} px`;
}
