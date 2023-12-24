import { siteConfig } from "@/libs/config";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" suppressHydrationWarning>
      <Head>
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
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
