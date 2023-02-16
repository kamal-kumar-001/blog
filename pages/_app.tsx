import '../styles/globals.css';
import '../styles/main.css'
import { ThemeProvider } from "next-themes";
import type { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
// import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps: { session, ...pageProps }, }: AppProps) {
    return (
        <>
        <ThemeProvider attribute="class">
                <NextNProgress  />
                {/* <SessionProvider session={session}> */}
      <Component {...pageProps} />
    {/* </SessionProvider> */}
            </ThemeProvider>
        </>
    );
}





export default MyApp;
