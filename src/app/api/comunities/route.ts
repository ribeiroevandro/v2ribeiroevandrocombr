import { NextResponse } from "next/server";
import { load } from "outstatic/server";


export async function GET() {
  const db = await load()

  const allWorks = await db
    .find({ collection: 'work' }, [
      'title',
      'publishedAt',
      'description',
      'slug',
      'author',
      'content',
      'coverImage'
    ])
    .sort({ publishedAt: -1 })
    .toArray()


  return NextResponse.json(allWorks);
}
