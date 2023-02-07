import '../styles/globals.css';
import '../styles/main.css'
import { ThemeProvider } from "next-themes";
import type { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
        <ThemeProvider attribute="class">
                <NextNProgress  />
                    <Component {...pageProps} />
            </ThemeProvider>
        </>
    );
}





export default MyApp;
