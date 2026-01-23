// Pointer-tracked spotlight per card
function initSpotlight() {
	document.querySelectorAll('.card').forEach((card) => {
		card.addEventListener('pointermove', (e) => {
			const rect = card.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;
			card.style.setProperty('--mx', `${x}px`);
			card.style.setProperty('--my', `${y}px`);
		});
	});
}

function initKeyboardActivation() {
	document.addEventListener('keydown', (e) => {
		if (e.key === 'Enter') {
			const el = document.activeElement;
			if (el && el.classList.contains('card')) {
				el.click();
			}
		}
	});
}

function initIcons() {
	if (window.lucide && typeof window.lucide.createIcons === 'function') {
		window.lucide.createIcons();
	}
}

function initServiceLinks() {
	const fallback = {
		'share-code': '/share-code',
		'vscode': '/vscode',
		'upload': '/upload',
		'pastebin': '/pastebin',
		'plantuml': '/plantuml',
		'pdf-editor': '/pdf-editor',
		'git': '/git',
		'database': '/database',
		'terminal': '/terminal',
		'proxy': '/proxy',
		'vault': '/vault',
		'files': '/files'
	};

	const domain = document.querySelector('.page')?.getAttribute('data-domain');
	console.log('Initializing service links with domain:', domain);

	document.querySelectorAll('.card[data-service]').forEach((a) => {
		const explicit = a.getAttribute('data-url'); // optional per-card override
		const key = a.getAttribute('data-service');

		let url = explicit || null;
		if (!url && domain && key) {
			url = `https://${key}.${domain}`;
		}
		if (!url && key) {
			url = fallback[key];
		}

		if (url) {
			a.setAttribute('href', url);
			console.log(`Set ${key} to ${url}`);
		}
	});
}

// Init when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
	initSpotlight();
	initKeyboardActivation();
	initIcons();
	initServiceLinks();
});
