const STORAGE_KEY = 'theme';

export function toggleTheme(): boolean {
	const isDark = document.documentElement.classList.toggle('dark');
	try {
		localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
	} catch {
		/* localStorage unavailable (private mode, disabled storage) - theme just won't persist */
	}
	return isDark;
}
