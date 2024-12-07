import { Poppins, Archivo_Black, Source_Sans_Pro } from 'next/font/google';

const poppins_regular = Poppins({ weight: '300', subsets: ['latin'], display: 'block' });
const poppins_bold = Poppins({ weight: '600', subsets: ['latin'], display: 'block' });

export const poppins = {
  regular: poppins_regular,
  bold: poppins_bold,
};

export const archivo_black = Archivo_Black({ weight: '400', subsets: ['latin'], display: 'block' });
export const source_sans_pro = Source_Sans_Pro({ weight: ['400', '600'], subsets: ['latin'], display: 'block' });
