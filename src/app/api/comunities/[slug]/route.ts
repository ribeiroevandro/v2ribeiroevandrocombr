import { NextRequest, NextResponse } from "next/server";
import { load } from "outstatic/server";

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  const db = await load()
  const community = await db
    .find({ collection: 'devespace-api', slug: params.slug }, [
      'title',
      'publishedAt',
      'slug',
      'content',
      'coverImage'
    ])
    .first()

  return NextResponse.json(community);
}
