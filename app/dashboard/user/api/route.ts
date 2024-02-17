import { db } from '@/lib/bootstrap';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pageIndex = parseInt(searchParams.get('page') ?? '1');
  const pageSize = 10;
  const total = await db.user.count();
  const data = await db.user.findMany({ skip: (pageIndex - 1) * pageSize, take: pageSize });
  const response = Response.json(data);
  response.headers.set('total', total.toString());
  return response;
}
