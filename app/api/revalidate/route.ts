import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { parseBody } from "next-sanity/webhook";

const LOCALES = ["en", "fr"] as const;
const WORK_CATEGORY_PATHS = [
  "/works/category/photographie",
  "/works/category/peinture",
  "/works/category/sculpture",
  "/works/category/design",
];

type SanityWebhookBody = {
  _type?: string;
  slug?: string | { current?: string } | null;
  category?: string | null;
  operation?: string;
};

function getSlug(slug: SanityWebhookBody["slug"]) {
  if (typeof slug === "string") return slug;
  if (slug && typeof slug.current === "string") return slug.current;
}

function localized(paths: string[]) {
  return LOCALES.flatMap((locale) =>
    paths.map((path) => `/${locale}${path === "/" ? "" : path}`),
  );
}

function getTags(type: string) {
  switch (type) {
    case "artist":
      return ["artists", "artworks", "exhibitions", "series"];
    case "exhibition":
      return ["exhibitions", "artists", "artworks", "series"];
    case "artwork":
      return ["artworks", "artists", "exhibitions", "series"];
    case "series":
      return ["series", "artworks", "artists", "exhibitions"];
    case "news":
      return ["news"];
    case "bag":
      return ["bag"];
    case "viewing":
      return ["viewing", "artworks", "series"];
    default:
      return [];
  }
}

function categoryToPath(category: string | null | undefined) {
  switch (category?.toLowerCase()) {
    case "photographie":
      return "/works/category/photographie";
    case "peinture":
      return "/works/category/peinture";
    case "sculpture":
      return "/works/category/sculpture";
    case "design":
      return "/works/category/design";
    default:
      return null;
  }
}

function getPaths(body: SanityWebhookBody) {
  const slug = getSlug(body.slug);
  const paths = new Set<string>(localized(["/"]));

  switch (body._type) {
    case "artist":
      localized(["/artists"]).forEach((path) => paths.add(path));
      if (slug) {
        localized([`/artists/artist/${slug}`]).forEach((path) =>
          paths.add(path),
        );
      }
      break;
    case "exhibition":
      localized(["/expositions"]).forEach((path) => paths.add(path));
      if (slug) {
        localized([`/expositions/${slug}`]).forEach((path) =>
          paths.add(path),
        );
      }
      break;
    case "artwork": {
      const categoryPath = categoryToPath(body.category);
      localized(categoryPath ? [categoryPath] : WORK_CATEGORY_PATHS).forEach(
        (path) => paths.add(path),
      );
      if (slug) {
        localized([`/works/${slug}`]).forEach((path) => paths.add(path));
      }
      break;
    }
    case "series":
      localized(WORK_CATEGORY_PATHS).forEach((path) => paths.add(path));
      break;
    case "news":
      localized(["/art-actu"]).forEach((path) => paths.add(path));
      break;
    case "bag":
      localized(["/about", "/contact", "/mali-art"]).forEach((path) =>
        paths.add(path),
      );
      break;
    case "viewing":
      localized(["/viewing-room"]).forEach((path) => paths.add(path));
      if (slug) {
        localized([`/viewing-room/${slug}`]).forEach((path) =>
          paths.add(path),
        );
      }
      break;
  }

  return [...paths];
}

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;

  if (!secret) {
    return NextResponse.json(
      { message: "Missing SANITY_REVALIDATE_SECRET" },
      { status: 500 },
    );
  }

  const { body, isValidSignature } = await parseBody<SanityWebhookBody>(
    req,
    secret,
  );

  if (!isValidSignature) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
  }

  if (!body?._type) {
    return NextResponse.json(
      { message: "Missing Sanity document type" },
      { status: 400 },
    );
  }

  const tags = getTags(body._type);
  if (!tags.length) {
    return NextResponse.json(
      { message: `Unsupported Sanity document type: ${body._type}` },
      { status: 400 },
    );
  }

  const paths = getPaths(body);

  tags.forEach((tag) => revalidateTag(tag, "max"));
  paths.forEach((path) => revalidatePath(path));

  return NextResponse.json({
    revalidated: true,
    type: body._type,
    operation: body.operation ?? null,
    tags,
    paths,
  });
}
