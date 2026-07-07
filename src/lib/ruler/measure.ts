import { formatAllUnits } from './units';

const SVG_NS = 'http://www.w3.org/2000/svg';
const CLICK_THRESHOLD_PX = 4;

interface Guide {
	group: HTMLElement;
	line: SVGLineElement;
	label: HTMLElement;
}

/**
 * Free two-point measurement: pointerdown-drag anywhere on the surface draws a line
 * between two arbitrary points (not anchored to a ruler's zero edge) with a live
 * readout in every unit at once.
 */
export function initMeasure(surface: HTMLElement, svg: SVGSVGElement, getPpi: () => number): { clearAll(): void } {
	const guides: Guide[] = [];
	let active: { startX: number; startY: number; group: HTMLElement; line: SVGLineElement; label: HTMLElement } | null =
		null;

	function createGuide(x: number, y: number) {
		const group = document.createElement('div');
		group.className = 'ruler-guide';

		const line = document.createElementNS(SVG_NS, 'line');
		line.setAttribute('class', 'ruler-guide__line');
		line.setAttribute('x1', String(x));
		line.setAttribute('y1', String(y));
		line.setAttribute('x2', String(x));
		line.setAttribute('y2', String(y));
		svg.appendChild(line);

		const label = document.createElement('button');
		label.type = 'button';
		label.className = 'ruler-guide__label';
		label.title = 'Click to remove this measurement';
		group.appendChild(label);
		surface.appendChild(group);

		return { line, label, group };
	}

	function updateGuide(g: { line: SVGLineElement; label: HTMLElement }, x1: number, y1: number, x2: number, y2: number) {
		g.line.setAttribute('x2', String(x2));
		g.line.setAttribute('y2', String(y2));
		const dx = x2 - x1;
		const dy = y2 - y1;
		const dist = Math.hypot(dx, dy);
		g.label.textContent = formatAllUnits(dist, getPpi());
		g.label.style.left = `${(x1 + x2) / 2}px`;
		g.label.style.top = `${(y1 + y2) / 2}px`;
	}

	surface.addEventListener('pointerdown', (e) => {
		if (e.target !== surface || e.button !== 0) return;
		const { offsetX, offsetY } = e;
		const { line, label, group } = createGuide(offsetX, offsetY);
		active = { startX: offsetX, startY: offsetY, group, line, label };
		surface.setPointerCapture(e.pointerId);
		e.preventDefault();
	});

	surface.addEventListener('pointermove', (e) => {
		if (!active) return;
		updateGuide(active, active.startX, active.startY, e.offsetX, e.offsetY);
	});

	function finish(e: PointerEvent) {
		if (!active) return;
		const dx = e.offsetX - active.startX;
		const dy = e.offsetY - active.startY;
		if (Math.hypot(dx, dy) < CLICK_THRESHOLD_PX) {
			active.group.remove();
			active.line.remove();
		} else {
			const guide: Guide = { group: active.group, line: active.line, label: active.label };
			active.label.addEventListener('click', () => removeGuide(guide));
			guides.push(guide);
		}
		active = null;
	}

	surface.addEventListener('pointerup', finish);
	surface.addEventListener('pointercancel', finish);

	function removeGuide(g: Guide) {
		g.group.remove();
		g.line.remove();
		const i = guides.indexOf(g);
		if (i !== -1) guides.splice(i, 1);
	}

	function clearAll() {
		if (active) {
			active.group.remove();
			active.line.remove();
			active = null;
		}
		guides.splice(0).forEach((g) => {
			g.group.remove();
			g.line.remove();
		});
	}

	return { clearAll };
}
