import { Poppins, Archivo_Black, Source_Sans_Pro } from 'next/font/google';

const poppins_regular = Poppins({ weight: '300', subsets: ['latin'], display: 'swap' });
const poppins_bold = Poppins({ weight: '600', subsets: ['latin'], display: 'swap' });

export const poppins = {
  regular: poppins_regular,
  bold: poppins_bold,
};

export const archivo_black = Archivo_Black({ weight: '400', subsets: ['latin'], display: 'swap' });
export const source_sans_pro = Source_Sans_Pro({ weight: ['400', '600'], subsets: ['latin'], display: 'swap' });
