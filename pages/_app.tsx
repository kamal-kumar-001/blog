import '../styles/globals.css';
// import "../css/tailwind.css";
import { ThemeProvider } from "next-themes";
import type { AppProps } from 'next/app';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
import NextNProgress from 'nextjs-progressbar';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
        <ThemeProvider attribute="class">
            {/* <div className="container mx-auto font-sans"> */}
                <NextNProgress color="#000" />
                {/* <Navbar /> */}
                {/* <main className="pb-32"> */}
                    <Component {...pageProps} />
                {/* </main> */}
                {/* <Footer ></Footer> */}
            {/* </div> */}
            </ThemeProvider>
        </>
    );
}





export default MyApp;
