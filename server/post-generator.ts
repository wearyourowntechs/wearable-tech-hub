import axios from "axios";
import { invokeLLM } from "./_core/llm";

interface ProductInfo {
  title: string;
  description: string;
  imageUrl?: string;
  price?: string;
  url: string;
}

interface GeneratedCaptions {
  general: string;
  facebook: string;
  instagram: string;
  tiktok: string;
  x: string;
  pinterest: string;
  hashtags: string;
}

/**
 * Extract product information from a Stripe product URL
 */
export async function extractProductFromUrl(url: string): Promise<ProductInfo> {
  try {
    // Fetch the page to extract metadata
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      timeout: 10000,
    });

    // Extract Open Graph metadata
    const titleMatch = data.match(/<meta property="og:title" content="([^"]+)"/);
    const descriptionMatch = data.match(
      /<meta property="og:description" content="([^"]+)"/
    );
    const imageMatch = data.match(/<meta property="og:image" content="([^"]+)"/);
    const priceMatch = data.match(/\$[\d,]+\.?\d*/);

    return {
      title: titleMatch ? titleMatch[1] : "Product",
      description: descriptionMatch ? descriptionMatch[1] : "",
      imageUrl: imageMatch ? imageMatch[1] : undefined,
      price: priceMatch ? priceMatch[0] : undefined,
      url,
    };
  } catch (error) {
    console.error("Failed to extract product info:", error);
    throw new Error("Failed to fetch product information from URL");
  }
}

/**
 * Generate AI captions for each platform with hashtags
 */
export async function generateCaptions(
  productInfo: ProductInfo
): Promise<GeneratedCaptions> {
  const prompt = `You are a social media expert. Generate engaging captions for a product with the following details:

Title: ${productInfo.title}
Description: ${productInfo.description}
${productInfo.price ? `Price: ${productInfo.price}` : ""}
URL: ${productInfo.url}

Generate captions for each platform with the following requirements:
- Facebook: 200-300 characters, professional and engaging
- Instagram: 150-200 characters, trendy and hashtag-friendly
- TikTok: 100-150 characters, casual and fun
- X (Twitter): Max 280 characters total including hashtags
- Pinterest: 200-300 characters, descriptive and keyword-rich
- General: 150-200 characters for any platform
- Hashtags: 5-8 relevant hashtags (start with #)

Return as JSON with keys: general, facebook, instagram, tiktok, x, pinterest, hashtags`;

  try {
    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content:
            "You are a social media marketing expert. Generate platform-specific captions that are engaging, relevant, and optimized for each platform.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "social_media_captions",
          strict: true,
          schema: {
            type: "object",
            properties: {
              general: {
                type: "string",
                description: "General caption for any platform",
              },
              facebook: {
                type: "string",
                description: "Facebook-optimized caption",
              },
              instagram: {
                type: "string",
                description: "Instagram-optimized caption",
              },
              tiktok: {
                type: "string",
                description: "TikTok-optimized caption",
              },
              x: {
                type: "string",
                description: "X/Twitter-optimized caption",
              },
              pinterest: {
                type: "string",
                description: "Pinterest-optimized caption",
              },
              hashtags: {
                type: "string",
                description: "Relevant hashtags",
              },
            },
            required: [
              "general",
              "facebook",
              "instagram",
              "tiktok",
              "x",
              "pinterest",
              "hashtags",
            ],
            additionalProperties: false,
          },
        },
      },
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error("No content in LLM response");
    }

    const parsed = JSON.parse(content);
    return parsed as GeneratedCaptions;
  } catch (error) {
    console.error("Failed to generate captions:", error);
    throw new Error("Failed to generate AI captions");
  }
}

/**
 * Download image from URL and return as base64 or URL
 */
export async function downloadImage(imageUrl: string): Promise<string> {
  try {
    // For now, just return the URL - in production you might want to upload to S3
    return imageUrl;
  } catch (error) {
    console.error("Failed to download image:", error);
    return "";
  }
}

/**
 * Generate a complete post from a product URL
 */
export async function generatePostFromUrl(
  productUrl: string,
  platforms: string[] = ["facebook", "instagram", "tiktok", "x", "pinterest"]
) {
  // Extract product info
  const productInfo = await extractProductFromUrl(productUrl);

  // Generate captions
  const captions = await generateCaptions(productInfo);

  // Download/process image
  const imageUrl = productInfo.imageUrl
    ? await downloadImage(productInfo.imageUrl)
    : undefined;

  return {
    caption: captions.general,
    facebookCaption: captions.facebook,
    instagramCaption: captions.instagram,
    tiktokCaption: captions.tiktok,
    xCaption: captions.x,
    pinterestCaption: captions.pinterest,
    hashtags: captions.hashtags,
    imageUrl,
    amazonLink: productUrl,
    platforms,
    productTitle: productInfo.title,
    productDescription: productInfo.description,
  };
}
