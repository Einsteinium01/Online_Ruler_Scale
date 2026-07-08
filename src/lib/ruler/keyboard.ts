import type { Unit } from './units';

export interface KeyboardActions {
	setUnit(unit: Unit): void;
	toggleFullscreen(): void;
	openCalibration(): void;
	clearGuides(): void;
	closeModal(): void;
}

const UNIT_KEYS: Record<string, Unit> = { '1': 'mm', '2': 'cm', '3': 'in', '4': 'px' };

function isTypingTarget(target: EventTarget | null): boolean {
	const el = target as HTMLElement | null;
	return !!el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable);
}

export function initKeyboard(actions: KeyboardActions): void {
	window.addEventListener('keydown', (e) => {
		if (isTypingTarget(e.target)) return;

		const unit = UNIT_KEYS[e.key];
		if (unit) {
			actions.setUnit(unit);
			return;
		}

		switch (e.key) {
			case 'f':
			case 'F':
				actions.toggleFullscreen();
				break;
			case 'c':
			case 'C':
				actions.openCalibration();
				break;
			case 'g':
			case 'G':
				actions.clearGuides();
				break;
			case 'Escape':
				actions.closeModal();
				break;
		}
	});
}
