import { loadState, persist, applyCalibration, effectivePpi, isCalibrated } from './state';
import type { Edge, CalibrationMethod } from './state';
import type { Unit } from './units';
import { renderEdge } from './render';
import { autoDetect } from './calibration/autoDetect';
import type { AutoDetectResult } from './calibration/autoDetect';
import { ppiFromDiagonal } from './calibration/screenDiagonal';
import { ppiFromCardWidthPx, guessInitialCardWidthPx, CARD_ASPECT } from './calibration/creditCard';
import { readCalibrationFromURL, calibrationLink } from './share';
import { initKeyboard } from './keyboard';
import { toggleFullscreen } from './fullscreen';
import { initMeasure } from './measure';

const EDGES: Edge[] = ['top', 'bottom', 'left', 'right'];

function init(): void {
	const root = document.querySelector<HTMLElement>('[data-ruler-root]');
	if (!root) return;

	const state = loadState();
	const fromURL = readCalibrationFromURL();
	if (fromURL) applyCalibration(state, fromURL.ppi, fromURL.method);

	const edgeEls = new Map<Edge, HTMLElement>();
	root.querySelectorAll<HTMLElement>('[data-ruler-edge]').forEach((el) => {
		edgeEls.set(el.dataset.rulerEdge as Edge, el);
	});

	const surface = root.querySelector<HTMLElement>('[data-measure-surface]');
	const svg = root.querySelector<SVGSVGElement>('[data-guides-svg]');
	const emptyHint = root.querySelector<HTMLElement>('[data-empty-hint]');
	const calibrationStatus = root.querySelector<HTMLElement>('[data-calibration-status]');

	function renderAll(): void {
		const ppi = effectivePpi(state);
		for (const edge of EDGES) {
			const el = edgeEls.get(edge);
			if (!el) continue;
			const active = state.activeEdges.includes(edge);
			el.style.display = active ? '' : 'none';
			if (!active) continue;
			const horizontal = edge === 'top' || edge === 'bottom';
			const length = horizontal ? el.clientWidth : el.clientHeight;
			renderEdge(el, edge, state.unit, ppi, length);
		}
		updateToolbarUI();
	}

	function updateToolbarUI(): void {
		root!.querySelectorAll<HTMLElement>('[data-edge-toggle]').forEach((btn) => {
			const edge = btn.dataset.edgeToggle as Edge;
			btn.setAttribute('aria-pressed', String(state.activeEdges.includes(edge)));
		});
		root!.querySelectorAll<HTMLElement>('[data-unit]').forEach((btn) => {
			btn.setAttribute('aria-pressed', String(btn.dataset.unit === state.unit));
		});
		if (calibrationStatus) {
			calibrationStatus.textContent = isCalibrated(state)
				? `Calibrated · ${Math.round(effectivePpi(state))} ppi`
				: 'Calibrate';
		}
	}

	// Recompute ticks when the tool's viewport size changes; rAF-batched to avoid layout thrash.
	let resizeRaf = 0;
	const ro = new ResizeObserver(() => {
		cancelAnimationFrame(resizeRaf);
		resizeRaf = requestAnimationFrame(renderAll);
	});
	ro.observe(root);

	root.querySelectorAll<HTMLElement>('[data-edge-toggle]').forEach((btn) => {
		btn.addEventListener('click', () => {
			const edge = btn.dataset.edgeToggle as Edge;
			const idx = state.activeEdges.indexOf(edge);
			if (idx === -1) state.activeEdges.push(edge);
			else state.activeEdges.splice(idx, 1);
			persist(state);
			renderAll();
		});
	});

	function setUnit(unit: Unit): void {
		state.unit = unit;
		persist(state);
		renderAll();
	}
	root.querySelectorAll<HTMLElement>('[data-unit]').forEach((btn) => {
		btn.addEventListener('click', () => setUnit(btn.dataset.unit as Unit));
	});

	const keyboardActions = {
		setUnit,
		toggleFullscreen: () => toggleFullscreen(),
		openCalibration: () => openModal(),
		clearGuides: () => {},
		closeModal: () => {
			closeModal();
			shortcutsPopover?.setAttribute('hidden', '');
		},
	};

	if (surface && svg) {
		const measure = initMeasure(surface, svg, () => effectivePpi(state));
		surface.addEventListener('pointerdown', () => emptyHint?.setAttribute('hidden', ''));
		root.querySelector('[data-clear-guides]')?.addEventListener('click', () => measure.clearAll());
		keyboardActions.clearGuides = measure.clearAll;
	}

	initKeyboard(keyboardActions);

	root.querySelector('[data-fullscreen]')?.addEventListener('click', () => toggleFullscreen());

	const shortcutsPopover = root.querySelector<HTMLElement>('[data-shortcuts-popover]');
	root.querySelector('[data-shortcuts-toggle]')?.addEventListener('click', () => {
		shortcutsPopover?.toggleAttribute('hidden');
	});

	// --- Calibration modal ---
	const modal = root.querySelector<HTMLElement>('[data-calibration-modal]');
	if (!modal) {
		renderAll();
		return;
	}

	const steps = new Map<string, HTMLElement>();
	modal.querySelectorAll<HTMLElement>('[data-step]').forEach((el) => {
		steps.set(el.dataset.step as string, el);
	});
	const modalPanel = modal.querySelector<HTMLElement>('[data-modal-panel]');

	function showStep(name: string): void {
		steps.forEach((el, key) => el.toggleAttribute('hidden', key !== name));
		// The card outline can grow up to ~700px wide (real screens run that wide in ppi terms);
		// the panel widens only for that step so other steps keep their compact width.
		modalPanel?.classList.toggle('max-w-md', name !== 'card');
		modalPanel?.classList.toggle('max-w-3xl', name === 'card');
	}

	function updateModalFooter(): void {
		const footer = modal!.querySelector<HTMLElement>('[data-calibrated-footer]');
		const ppiText = modal!.querySelector<HTMLElement>('[data-calibrated-ppi]');
		if (!footer || !ppiText) return;
		if (isCalibrated(state)) {
			footer.removeAttribute('hidden');
			ppiText.textContent = `Calibrated at ${Math.round(effectivePpi(state))} px/inch via ${state.method}.`;
		} else {
			footer.setAttribute('hidden', '');
		}
	}

	function openModal(): void {
		modal!.removeAttribute('hidden');
		showStep('choose');
		updateModalFooter();
	}
	function closeModal(): void {
		modal!.setAttribute('hidden', '');
	}

	root.querySelector('[data-open-calibration]')?.addEventListener('click', openModal);
	root.querySelector('[data-close-modal]')?.addEventListener('click', closeModal);
	modal.addEventListener('click', (e) => {
		if (e.target === modal) closeModal();
	});
	modal.querySelectorAll('[data-back]').forEach((btn) => btn.addEventListener('click', () => showStep('choose')));

	function confirmCalibration(ppi: number, method: CalibrationMethod): void {
		applyCalibration(state, ppi, method);
		updateModalFooter();
		renderAll();
		closeModal();
	}

	modal.querySelectorAll<HTMLElement>('[data-method]').forEach((btn) => {
		btn.addEventListener('click', () => {
			const method = btn.dataset.method as 'auto' | 'diagonal' | 'card';
			showStep(method);
			if (method === 'auto') runAutoDetect();
			if (method === 'card') setupCardStep();
		});
	});

	let lastAutoResult: AutoDetectResult | null = null;
	function runAutoDetect(): void {
		lastAutoResult = autoDetect();
		const resultEl = modal!.querySelector('[data-auto-result]');
		if (resultEl) {
			resultEl.textContent = `We estimate your screen is ~${Math.round(lastAutoResult.ppi)} px/inch (${lastAutoResult.label}).`;
		}
	}
	modal.querySelector('[data-confirm-auto]')?.addEventListener('click', () => {
		if (lastAutoResult) confirmCalibration(lastAutoResult.ppi, 'auto');
	});

	let lastDiagonalPpi: number | null = null;
	modal.querySelector('[data-calc-diagonal]')?.addEventListener('click', () => {
		const input = modal.querySelector<HTMLInputElement>('[data-diagonal-input]');
		const resultEl = modal.querySelector<HTMLElement>('[data-diagonal-result]');
		const confirmBtn = modal.querySelector<HTMLElement>('[data-confirm-diagonal]');
		const diagonal = Number(input?.value);
		if (!diagonal || diagonal <= 0) return;
		lastDiagonalPpi = ppiFromDiagonal(diagonal);
		if (resultEl) resultEl.textContent = `That's ~${Math.round(lastDiagonalPpi)} px/inch.`;
		confirmBtn?.removeAttribute('hidden');
	});
	modal.querySelector('[data-confirm-diagonal]')?.addEventListener('click', () => {
		if (lastDiagonalPpi) confirmCalibration(lastDiagonalPpi, 'diagonal');
	});

	function applyCardWidth(outline: HTMLElement, widthPx: number): void {
		outline.style.width = `${widthPx}px`;
		outline.style.height = `${widthPx * CARD_ASPECT}px`;
	}
	function setupCardStep(): void {
		const outline = modal!.querySelector<HTMLElement>('[data-card-outline]');
		const slider = modal!.querySelector<HTMLInputElement>('[data-card-slider]');
		if (!outline || !slider) return;
		const initial = guessInitialCardWidthPx(effectivePpi(state));
		slider.value = String(initial);
		applyCardWidth(outline, initial);
		slider.oninput = () => applyCardWidth(outline, Number(slider.value));
	}
	modal.querySelector('[data-confirm-card]')?.addEventListener('click', () => {
		const slider = modal.querySelector<HTMLInputElement>('[data-card-slider]');
		if (!slider) return;
		confirmCalibration(ppiFromCardWidthPx(Number(slider.value)), 'card');
	});

	modal.querySelector('[data-copy-link]')?.addEventListener('click', () => {
		if (!state.ppi || !state.method) return;
		const link = calibrationLink(state.ppi, state.method);
		navigator.clipboard?.writeText(link).catch(() => {
			/* clipboard unavailable - non-critical convenience action */
		});
	});

	renderAll();
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', init);
} else {
	init();
}
