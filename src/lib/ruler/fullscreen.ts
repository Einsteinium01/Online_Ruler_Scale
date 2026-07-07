export function toggleFullscreen(el: HTMLElement = document.documentElement): void {
	if (document.fullscreenElement) {
		void document.exitFullscreen();
	} else {
		void el.requestFullscreen?.();
	}
}
