const wordList = [
    'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'I',
    'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
    'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
    'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what',
    'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me',
    'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take',
    'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other',
    'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also',
    'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way',
    'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us',
    'is', 'was', 'are', 'been', 'has', 'had', 'were', 'said', 'did', 'having',
    'may', 'should', 'could', 'would', 'might', 'must', 'can', 'will', 'shall',
    'develop', 'provide', 'service', 'during', 'through', 'system', 'program',
    'question', 'process', 'number', 'change', 'result', 'different', 'problem',
    'between', 'important', 'community', 'create', 'experience', 'world', 'information',
    'include', 'public', 'always', 'actually', 'something', 'everything', 'nothing',
    'beautiful', 'possible', 'probably', 'definitely', 'certainly', 'particularly',
    'keyboard', 'typing', 'speed', 'practice', 'improve', 'accuracy', 'performance',
    'challenge', 'compete', 'multiplayer', 'winner', 'champion', 'leaderboard',
    'async', 'await', 'function', 'return', 'const', 'variable', 'component',
];

export function getRandomWords(count) {
    const words = [];
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * wordList.length);
        words.push(wordList[randomIndex]);
    }
    return words;
}

export function getRandomQuote() {
    const quotes = [
        'The quick brown fox jumps over the lazy dog',
        'Practice makes perfect when it comes to typing speed',
        'Speed is important but accuracy is everything',
        'The best time to start is now',
        'Excellence is not a skill but an attitude',
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
}
