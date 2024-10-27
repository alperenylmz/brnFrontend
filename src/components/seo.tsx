import Head from "next/head";

const DOMAIN = "https://www.brnmetaverse.net";
const DEFAULT_OG_IMAGE =
  "https://storage.googleapis.com/brandflow-bucket/personal/blog/portfolio-og.jpg";

export default function Seo({
  metaTitle = "BRN",
  metaDescription = "The cutting-edge cryptocurrency backed by the gaming industry, offering a seamless blend of value and versatility.",
  siteName = "BRN Metaverse",
  canonical = DOMAIN,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  twitterHandle = "@d__raptis",
}) {
  return (
    <Head>
      <title key="title">{`${metaTitle} – ${siteName}`}</title>
      <meta name="description" content={metaDescription} />
      <meta key="og_type" property="og:type" content={ogType} />
      <meta key="og_title" property="og:title" content={metaTitle} />
      <meta key="og_description" property="og:description" content={metaDescription} />
      <meta key="og_locale" property="og:locale" content="en_IE" />
      <meta key="og_site_name" property="og:site_name" content={siteName} />
      <meta key="og_url" property="og:url" content={canonical ?? DOMAIN} />
      <meta key="og_site_name" property="og:site_name" content={siteName} />
      <meta
        key="og_image"
        property="og:image"
        content={ogImage ?? DEFAULT_OG_IMAGE}
      />
      <meta
        key="og_image:alt"
        property="og:image:alt"
        content={`${metaTitle} | ${siteName}`}
      />
      <meta key="og_image:width" property="og:image:width" content="1200" />
      <meta key="og_image:height" property="og:image:height" content="630" />

      <meta name="robots" content="index,follow" />

      <meta
        key="twitter:card"
        name="twitter:card"
        content="summary_large_image"
      />
      <meta 
        key="twitter:site" 
        name="twitter:site" 
        content={twitterHandle} 
      />
      <meta
        key="twitter:creator"
        name="twitter:creator"
        content={twitterHandle}
      />
      <meta 
        key="twitter:title" 
        property="twitter:title" 
        content={metaTitle} 
      />
      <meta
        key="twitter:description"
        property="twitter:description"
        content={metaDescription}
      />

      <link rel="canonical" href={canonical ?? DOMAIN} />

      <link rel="shortcut icon" href="/favicon.ico" />
    </Head>
  );
}