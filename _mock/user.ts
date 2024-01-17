import { MockRequest } from '@delon/mock';
import { Random } from 'mockjs';

const list: any[] = [];
const total = 50;

for (let i = 0; i < total; i += 1) {
  list.push({
    id: i + 1,
    username: Random.name(),
    nickName: Random.cname(),
    email: Random.email(),
    phone: Random.string('0123456789', 12, 12),
    accountExpagered: Random.boolean(),
    accountLocked: Random.boolean(),
    enable: Random.boolean(),
    roles: [
      { id: 1, name: 'admin' },
      { id: 2, name: 'user' },
      { id: 3, name: 'root' },
      {
        id: 4,
        name: 'sa'
      }
    ].splice(Random.integer(0, 2), Random.integer(1, 3))
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

export const USERS_Apage = {
  '/user/list': (req: MockRequest) => genData(req.queryString),
  '/user/list/:id': (req: MockRequest) => list.find(w => w.id === +req.params.id)
};
