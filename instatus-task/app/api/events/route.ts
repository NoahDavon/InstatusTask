import { type NextRequest } from 'next/server'
 
export function GET(request: NextRequest) {
  const prismaClient = 
  const searchParams = request.nextUrl.searchParams
  const type = searchParams.get('type');
  const query = searchParams.get('query');
  // query is "hello" for /api/event?query=hello
}