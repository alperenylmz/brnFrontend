import { useEffect, useState } from "react";
import { API_HOST } from "@/config";

interface RichTextChild {
  type: string;
  text: string;
}

interface RichTextBlock {
  type: string;
  children: RichTextChild[];
}

interface BlogPost {
  id: number;
  title: string;
  description: string;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

interface BlogPostData {
  id: number;
  PostTitle: string;
  PostDescription: RichTextBlock[];
  url: string | null;
  Image: {
    data: {
      id: number;
      attributes: {
        name: string;
        url: string;
        formats: {
          thumbnail: {
            url: string;
          };
        };
        // Diğer alanlar
      };
    };
  } | null;
}

interface ApiResponse {
  data: {
    id: number;
    attributes: {
      Title: string;
      Description: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      slug: string;
      BlogPosts: BlogPostData[];
    };
  };
  meta: any;
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
        const request = await fetch(`http://51.20.121.61:1337/api/blog?populate[BlogPosts][populate][Image]=*`);
        const responseJson = await request.json();
        const response: ApiResponse = responseJson;

        const blogPostsData = response.data.attributes.BlogPosts;

        const blogPosts: BlogPost[] = blogPostsData.map(
          (postData: BlogPostData) => { 
            // PostDescription alanını düz metne dönüştürmek için yardımcı bir fonksiyon kullanıyoruz
            const description = convertRichTextToPlainText(
              postData.PostDescription
            );

            // Görsel URL'sini alıyoruz
            const imageUrl =
              postData.Image?.data?.attributes?.url ||
              postData.Image?.data?.attributes?.formats?.thumbnail?.url ||
              null;

            return {
              id: postData.id,
              title: postData.PostTitle,
              description: description,
              imageUrl:`http://51.20.121.61:1337${imageUrl}`,
              createdAt: response.data.attributes.createdAt,
              updatedAt: response.data.attributes.updatedAt,
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

// Rich Text içeriğini düz metne dönüştüren yardımcı fonksiyon
function convertRichTextToPlainText(
  richTextContent: RichTextBlock[]
): string {
  if (!Array.isArray(richTextContent)) return "";
  return richTextContent
    .map((block: RichTextBlock) => {
      if (block.type === "paragraph") {
        return block.children
          .map((child: RichTextChild) => child.text)
          .join("");
      }
      // Diğer blok tipleri için ek işlemler yapabilirsiniz
      return "";
    })
    .join("\n\n");
}
