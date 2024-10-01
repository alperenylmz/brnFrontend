import {Poppins,Archivo_Black} from 'next/font/google'

const poppins_regular = Poppins({weight: '300', subsets: ['latin'] });
const poppins_bold = Poppins({weight: '600', subsets: ['latin'] });
export const poppins = {
    regular: poppins_regular,
    bold: poppins_bold
}

export const archivo_black = Archivo_Black({weight: '400', subsets: ['latin'] })