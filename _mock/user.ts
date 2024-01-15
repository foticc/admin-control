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
    accountExpired: Random.boolean(),
    accountLocked: Random.boolean(),
    enable: Random.boolean(),
    roles: { 'array|2': ['admin', 'root', 'user', 'sa'] }
  });
}

function genData(params: any): { total: number; list: any[] } {
  let ret = [...list];
  const pi = +params.pi;
  const ps = +params.ps;
  const start = (pi - 1) * ps;

  if (params.no) {
    ret = ret.filter(data => data.no.indexOf(params.no) > -1);
  }

  return { total: ret.length, list: ret.slice(start, ps * pi) };
}

export const USERS_API = {
  '/user/list': (req: MockRequest) => genData(req.queryString),
  '/user/list/:id': (req: MockRequest) => list.find(w => w.id === +req.params.id)
};
