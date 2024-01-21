import { siteConfig } from "@/libs/config";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" suppressHydrationWarning>
      <Head>
        <link rel="manifest" href="manifest.json" />
        <meta
          name="description"
          content={siteConfig.description}
          itemProp="description"
        />
        <meta
          name="keywords"
          content={siteConfig.keywords}
          itemProp="keywords"
        />
        <meta name="author" content={siteConfig.creator} />
        <meta
          name="copyright"
          content={siteConfig.copyright}
          itemProp="dateline"
        />
        <meta property="og:title" content={siteConfig.title} />
        <meta property="og:site_name" content={siteConfig.title} />
        <meta property="og:image" content="/images/icons/icon-192x192.png" />
        <meta property="og:url" content="" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="192" />
        <meta property="og:image:height" content="192" />
        <meta property="og:description" content={siteConfig.description} />
        {/* <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        /> */}
        <meta name="theme-color" content="#000" />
        <link
          rel="icon"
          type="image/png"
          sizes="72x72"
          href="/images/favicon.png"
        />
        <link rel="apple-touch-icon" href="/images/icons/icon-192x192.png" />
      </Head>
      <body className="bg-black">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
