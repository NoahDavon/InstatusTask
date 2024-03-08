import { PrismaClient } from '@prisma/client';
import { type NextRequest } from 'next/server'

const DOCS_PER_PAGE = 6;
const translateFilter = {
  name: "actor_name",
  email: "target_name",
  targetID: "target_id",
  actor: "actor_id",
  actionID: "id"
}
const prisma : PrismaClient = new PrismaClient();
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const typeName = searchParams.get('type');
  const type = typeName? translateFilter[typeName]: null;
  const query = searchParams.get('query');
  const page = parseInt(searchParams.get("page")?? "1") - 1;
  console.log("type " + type + " query " + query )
  const events = await prisma.event.findMany({...{
    skip: page * DOCS_PER_PAGE,
    take: DOCS_PER_PAGE,
    include: {
      action: true
    }
    
  }, ...(query) &&{ where: {
    ...(type!=="id")&&{
      [type]: {
        search: query
      }
    },
    ...(type === "id")&&{
      action:{
        id: query
      }
    }
 }}}
  )
  const nextPage = await prisma.event.findFirst({...{
    skip: (page+1) * DOCS_PER_PAGE,
  }, ...(query) && { where: {
      ...(type!=="id")&&{
        [type]: {
          search: query
        }
      },
      ...(type === "id")&&{
        action:{
          id: query
        }
      }
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