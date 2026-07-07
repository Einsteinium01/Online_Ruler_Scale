import type { Unit } from './units';
import type { Edge } from './state';

interface TickSpec {
	/** Spacing in CSS px between the smallest ticks. */
	minorPx: number;
	/** Every Nth minor tick is a mid-length tick (0 disables mid ticks). */
	ticksPerMid: number;
	/** Every Nth minor tick is a labeled major tick. */
	ticksPerMajor: number;
	label(majorIndex: number): string;
}

function tickSpecFor(unit: Unit, ppi: number): TickSpec {
	const pxPerMm = ppi / 25.4;
	switch (unit) {
		case 'mm':
			return { minorPx: pxPerMm, ticksPerMid: 5, ticksPerMajor: 10, label: (i) => String(i * 10) };
		case 'cm':
			return { minorPx: pxPerMm, ticksPerMid: 5, ticksPerMajor: 10, label: (i) => String(i) };
		case 'in': {
			const pxPerSixteenth = ppi / 16;
			return { minorPx: pxPerSixteenth, ticksPerMid: 4, ticksPerMajor: 16, label: (i) => String(i) };
		}
		case 'px':
			return { minorPx: 10, ticksPerMid: 5, ticksPerMajor: 10, label: (i) => String(i * 100) };
	}
}

const MIN_TICK_SPACING_PX = 3;

/** (Re)renders the tick marks + labels for one ruler edge. Cheap enough to call on resize/unit/ppi change. */
export function renderEdge(el: HTMLElement, edge: Edge, unit: Unit, ppi: number, lengthPx: number): void {
	const horizontal = edge === 'top' || edge === 'bottom';
	const spec = tickSpecFor(unit, ppi);

	// Guard against a pathological calibration collapsing ticks into an unreadable, expensive smear.
	if (spec.minorPx < MIN_TICK_SPACING_PX) {
		el.replaceChildren();
		return;
	}

	const count = Math.ceil(lengthPx / spec.minorPx) + 1;
	const frag = document.createDocumentFragment();
	const axis = horizontal ? 'left' : 'top';

	for (let i = 0; i < count; i++) {
		const pos = i * spec.minorPx;
		const isMajor = i % spec.ticksPerMajor === 0;
		const isMid = !isMajor && spec.ticksPerMid > 0 && i % spec.ticksPerMid === 0;
		const level = isMajor ? 'major' : isMid ? 'mid' : 'minor';

		const tick = document.createElement('div');
		tick.className = `ruler-tick ruler-tick--${level} ruler-tick--${horizontal ? 'h' : 'v'}`;
		tick.style[axis] = `${pos}px`;
		frag.appendChild(tick);

		if (isMajor) {
			const label = document.createElement('span');
			label.className = `ruler-label ruler-label--${horizontal ? 'h' : 'v'}`;
			label.style[axis] = `${pos}px`;
			label.textContent = spec.label(Math.round(i / spec.ticksPerMajor));
			frag.appendChild(label);
		}
	}

	el.replaceChildren(frag);
}
