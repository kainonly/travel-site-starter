import { db } from '@/lib/bootstrap';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') ?? '1');
  const pageSize = parseInt(searchParams.get('pageSize') ?? '10');
  const total = await db.user.count();
  const data = await db.user.findMany({ skip: (page - 1) * pageSize, take: pageSize });
  const response = Response.json(data);
  response.headers.set('X-Total-Count', total.toString());
  return response;
}
