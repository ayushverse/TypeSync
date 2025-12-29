export function calculateWPM(correctChars, timeInSeconds) {
    // Prevent division by zero and ensure minimum time
    if (timeInSeconds <= 0 || correctChars <= 0) {
        return 0;
    }

    const timeInMinutes = timeInSeconds / 60;
    const wpm = Math.round((correctChars / 5) / timeInMinutes);

    // Return 0 for invalid results
    return isNaN(wpm) || !isFinite(wpm) ? 0 : wpm;
}

export function calculateAccuracy(correct, total) {
    if (total === 0) return 100;
    return Math.round((correct / total) * 100);
}
