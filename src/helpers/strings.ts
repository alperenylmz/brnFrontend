/**
 * Extensions
 */

declare global {
    interface String {
        ellipses(this: any, length: number, text?: any): string;
        walletEllipses(text?: any): string;
    }
}

export const ellipses = function (this: any, length: number, text : any, ext?: string) {
    if (!text) { text = this; }
    if (text == null) return '';
    if (text.length > length)
        return text.substring(0, (length)).concat(ext ?? "...");
    return text;
}

export const walletEllipses = function (this:any, text: any) {
    if (!text) { text = this; }
    return text.substring(0, (5)).concat("***").concat(text.substring((text.length - 4), (text.length)));
}


export const BRN = 'brn';
export const EVENT = 'event';
export const BOSS = 'boss';