export function calculateWPM(charsTyped, timeSeconds) {
    if (timeSeconds === 0) return 0;
    return Math.round((charsTyped / 5) / (timeSeconds / 60));
}

export function calculateAccuracy(correct, total) {
    if (total === 0) return 100;
    return Math.round((correct / total) * 100);
}
