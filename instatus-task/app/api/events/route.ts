import { PrismaClient } from '@prisma/client';
import { type NextRequest } from 'next/server'

const DOCS_PER_PAGE = 6;

const prisma : PrismaClient = new PrismaClient();
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const type = searchParams.get('type') as string;
  const query = searchParams.get('query');
  const page = parseInt(searchParams.get("page")?? "1") - 1;
  const events = await prisma.event.findMany({...{
    skip: page * DOCS_PER_PAGE,
    take: DOCS_PER_PAGE,
    include: {
      action: true
    }
    
  }, ...(query) &&{ where: {
    [type]: query
 }}}
  )
  const nextPage = await prisma.event.findFirst({...{
    skip: (page+1) * DOCS_PER_PAGE,
  }, ...(query) && { where: {
      [type]: query
    }
  }})
  const nextPageExists: boolean = null !== nextPage;
  const res = {events, nextPageExists};
  return new Response(JSON.stringify(res),
    {
      status: 200
    })
  //.../api/event
}

export async function POST(request: NextRequest){
  const event = await request.json();
  const res = await prisma.event.create({
    data: event
  })
  return new Response(JSON.stringify(res), {
    status: 200
  })
}