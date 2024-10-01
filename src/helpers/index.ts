
export default function formatNumber(num: number, precision = 0) {
    const map = [
        { suffix: 'T', threshold: 1e12 },
        { suffix: 'B', threshold: 1e9 },
        { suffix: 'M', threshold: 1e6 },
        { suffix: 'K', threshold: 1e3 },
        { suffix: '', threshold: 1 },
    ];

    const found = map.find((x) => Math.abs(num) >= x.threshold);
    if (found) {
        return (num / found.threshold).toFixed(precision) + found.suffix;
    }

    return num;
}


export function isiOS() {
    if (typeof window === 'undefined') {
        return false; // Window object is not available (e.g., running on the server)
    }

    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
}