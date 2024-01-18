import { MockRequest } from '@delon/mock';
import { Random } from 'mockjs';

const list: any[] = [];
const total = 50;

for (let i = 0; i < total; i += 1) {
  list.push({
    id: i + 1,
    text: Random.ctitle(),
    group: true,
    level: 1,
    link: Random.url(),
    icon: Random.word()
  });
}

function gendata(): any[] {
  return list;
}

export const menu_api = {
  '/menu/load': (req: MockRequest) => gendata()
};
