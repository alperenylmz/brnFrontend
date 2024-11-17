import { useEffect, useState } from "react";

// Interface for the image formats
interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

// Interface for the cover image attributes
interface CoverImageAttributes {
  url: string;
  formats: {
    thumbnail: ImageFormat;
    large: ImageFormat;
    medium: ImageFormat;
    small: ImageFormat;
  };
}

// Interface for the cover image data
interface CoverImageData {
  id: number;
  attributes: CoverImageAttributes;
}

// Interface for the cover image
interface CoverImage {
  data: CoverImageData | null;
}

// Interface for the attributes of each blog post
interface BlogPostAttributes {
  Title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  miniDescription: string;
  coverImage: CoverImage;
}

// Interface for each item in the data array
interface BlogPostDataItem {
  id: number;
  attributes: BlogPostAttributes;
}

// Interface for the API response
interface ApiResponse {
  data: BlogPostDataItem[];
  meta: any;
}

// Interface for your blog post after transformation
interface BlogPost {
  id: number;
  title: string;
  description: string;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
  slug: string;
}

export default function useBlog(
  filter: string
): [
  BlogPost[],
  boolean,
  boolean,
  any,
  React.Dispatch<React.SetStateAction<any>>
] {
  const [data, setData] = useState<BlogPost[]>([]);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [reload, setReload] = useState<any>();

  useEffect(() => {
    async function getBlogPosts() {
      setLoading(true);
      try {
        const request = await fetch(
          `https://strapiornek3.onrender.com/api/blog-posts?${filter}&fields[0]=Title&fields[1]=slug&fields[2]=createdAt&fields[3]=miniDescription&populate[coverImage][fields][0]=url&populate[coverImage][fields][1]=formats`
        );
        
        const responseJson = await request.json();
        console.log(responseJson);

        const response: ApiResponse = responseJson;

        // Map over the array of blog posts
        const blogPosts: BlogPost[] = response.data.map(
          (item: BlogPostDataItem) => {
            const attributes = item.attributes;

            // Extract image URL
            const imageData = attributes.coverImage?.data;
            const imageUrl =
              imageData?.attributes?.url ||
              imageData?.attributes?.formats?.thumbnail?.url ||
              null;

            return {
              id: item.id,
              title: attributes.Title,
              description: attributes.miniDescription,
              imageUrl: imageUrl ? `https://strapiornek3.onrender.com${imageUrl}` : null,
              createdAt: attributes.createdAt,
              updatedAt: attributes.updatedAt,
              slug: attributes.slug,
            };
          }
        );

        setData(blogPosts.reverse());
      } catch (e: any) {
        console.log(e.message);
        setHasError(true);
        setError(e);
      } finally {
        setLoading(false);
      }
    }
    getBlogPosts();
  }, [reload, filter]);

  return [data, isLoading, hasError, error, setReload];
}


// // Rich Text içeriğini düz metne dönüştüren yardımcı fonksiyon
// function convertRichTextToPlainText(
//   richTextContent: RichTextBlock[]
// ): string {
//   if (!Array.isArray(richTextContent)) return "";
//   return richTextContent
//     .map((block: RichTextBlock) => {
//       if (block.type === "paragraph") {
//         return block.children
//           .map((child: RichTextChild) => child.text)
//           .join("");
//       }
//       // Diğer blok tipleri için ek işlemler yapabilirsiniz
//       return "";
//     })
//     .join("\n\n");
// }
