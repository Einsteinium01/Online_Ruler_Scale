export interface FaqItem {
	q: string;
	a: string;
}

export const FAQ_ITEMS: FaqItem[] = [
	{
		q: 'How accurate is Online Ruler Scale?',
		a: 'Once calibrated, measurements are accurate to within a millimeter on most laptop and desktop screens. Accuracy depends entirely on calibration — an uncalibrated ruler is only ever a rough guess, which is why we ask you to calibrate before trusting a measurement.',
	},
	{
		q: 'Why do I need to calibrate at all?',
		a: "Browsers don't reliably expose a screen's real physical size or pixel density, so no on-screen ruler can be accurate out of the box. Calibrating tells the tool exactly how many pixels equal a real-world inch on your specific display.",
	},
	{
		q: 'Which calibration method should I use?',
		a: 'Credit Card Calibration is the most accurate for most people, since it uses a physical object you almost certainly have on hand. Screen Diagonal is a close second if you know your display size. Auto-Detect is the fastest, but it is only a heuristic guess based on common device profiles.',
	},
	{
		q: 'Does this site track or store my measurements?',
		a: 'No. Everything runs client-side in your browser. The only thing saved is your calibration (pixels-per-inch), stored locally in your browser so you do not have to recalibrate every visit. Nothing is ever sent to a server.',
	},
	{
		q: 'Can I use this on my phone or tablet?',
		a: 'Yes. The ruler works on any modern mobile browser. Auto-Detect and Credit Card Calibration both work well on phones; Screen Diagonal works too if you know your device\'s advertised screen size.',
	},
	{
		q: 'Can I share my calibration with another device?',
		a: 'Yes — after calibrating, use "Copy shareable calibration link" to get a URL that carries your calibration. Opening it on another device (with the same screen) applies the same calibration instantly, so you don\'t have to repeat the process.',
	},
	{
		q: 'What can I measure with the free two-point tool?',
		a: 'Drag anywhere on the ruler surface to draw a line between any two points and see a live readout in millimeters, centimeters, inches, and pixels at once — useful for anything that is not conveniently lined up against a screen edge.',
	},
	{
		q: 'Is Online Ruler Scale free to use?',
		a: 'Yes, entirely free, with no account, no paywall, and no watermarks.',
	},
];
