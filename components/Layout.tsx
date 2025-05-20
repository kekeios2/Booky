import Head from 'next/head';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-navy-dark noise-bg">
      <Head>
        <style jsx global>{`
          :root {
            --navy-dark: #0e1525;
          }
          
          /* Create noise effect with CSS */
          .noise-bg {
            position: relative;
          }
          
          .noise-bg::before {
            content: "";
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
            pointer-events: none;
            z-index: 0;
            opacity: 0.4;
          }
          
          /* Ensure content stays above the noise layer */
          .noise-bg > * {
            position: relative;
            z-index: 1;
          }
        `}</style>
      </Head>
      <main>{children}</main>
    </div>
  );
}
