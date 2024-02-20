import { db } from '@/lib/bootstrap';

export async function POST(request: Request) {
  const body = await request.json();
  const page = body.page ?? 1;
  const pageSize = body.pageSize ?? 10;
  const total = await db.user.count();
  const data = await db.user.findMany({ skip: (page - 1) * pageSize, take: pageSize });
  const response = Response.json(data);
  response.headers.set('X-Total-Count', total.toString());
  return response;
}
