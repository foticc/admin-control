import { MockRequest } from '@delon/mock';
import { Random } from 'mockjs';

const list: any[] = [];
const total = 50;

const OK = {
  code: 200,
  message: 'ok',
  data: 1
};

const FAIL = {
  code: 500,
  message: 'ok',
  data: 0
};

for (let i = 0; i < total; i += 1) {
  list.push({
    id: i + 1,
    path: Random.url()
  });
}

function genData(params: any): { total: number; list: any[] } {
  let ret = [...list];
  const page = +params.page;
  const size = +params.size;
  const start = (page - 1) * size;

  if (params.no) {
    ret = ret.filter(data => data.no.indexOf(params.no) > -1);
  }

  return { total: ret.length, list: ret.slice(start, size * page) };
}

export const PERMISSION_API = {
  '/perms/page': (req: MockRequest) => genData(req.queryString),
  '/perms/:id': (req: MockRequest) => list.find(w => w.id === +req.params.id),
  'POST /perms': (req: MockRequest) => (req.queryString.status === 'success' ? OK : FAIL)
};
