export interface ReadingStats {
	words: number;
	minutes: number;
}

const ZH_CHARS_PER_MIN = 300;
const EN_WORDS_PER_MIN = 200;

export function calcReadingStats(markdown: string): ReadingStats {
	const text = markdown
		.replace(/```[\s\S]*?```/g, '')
		.replace(/`[^`]+`/g, '')
		.replace(/!\[[^\]]*\]\([^)]*\)/g, '')
		.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
		.replace(/<[^>]+>/g, '')
		.replace(/^\s*>\s?/gm, '')
		.replace(/^\s*[-*+#]\s+/gm, '')
		.replace(/[*_~]/g, '');

	const zhChars = (text.match(/[一-龥]/g) || []).length;
	const enWords = (
		text.replace(/[一-龥]/g, ' ').match(/[A-Za-z0-9]+/g) || []
	).length;

	const words = zhChars + enWords;
	const minutes = Math.max(
		1,
		Math.ceil(zhChars / ZH_CHARS_PER_MIN + enWords / EN_WORDS_PER_MIN),
	);

	return { words, minutes };
}

export function formatWordCount(n: number): string {
	if (n >= 1000) return `${(n / 1000).toFixed(1)}k 字`;
	return `${n} 字`;
}
