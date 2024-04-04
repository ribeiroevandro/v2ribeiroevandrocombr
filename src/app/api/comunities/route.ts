import { NextResponse } from "next/server";
import { load } from "outstatic/server";


export async function GET() {
  const db = await load()

  const allWorks = await db
    .find({ collection: 'devespace-api' }, [
      'title',
      'publishedAt',
      'slug',
      'content',
      'coverImage',
      'githubUrl'
    ])
    .sort({ publishedAt: -1 })
    .toArray()


  return NextResponse.json(allWorks);
}
