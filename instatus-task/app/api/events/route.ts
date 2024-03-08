import { PrismaClient } from '@prisma/client/extension';
import { type NextRequest } from 'next/server'

const DOCS_PER_PAGE = 6;
const prisma = new PrismaClient();
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const type = searchParams.get('type') as string;
  const query = searchParams.get('query');
  const page = parseInt(searchParams.get("page")?? "1") - 1;
  const events = await prisma.event.findMany({
    skip: page * DOCS_PER_PAGE,
    take: DOCS_PER_PAGE,
    where: {
      [type]: query
    }
  }
  )
  const nextPage = await prisma.event.findFirst({
    skip: (page+1) * DOCS_PER_PAGE,
    where: {
      [type]: query
    }
  })
  const nextPageExists: boolean = nextPage;
  const res = {events, nextPageExists};
  return new Response(JSON.stringify(res),
    {
      status: 200
    })
  // query is "hello" for /api/event?query=hello
}