export interface Pageable {
  page: number;
  size: number;
  sort?: string;

  [key: string]: any;
}

export interface CommonResult<T> {
  code: number;
  message: string;
  data: T;
}

export interface UserDetail {
  id?: number | null | undefined;
  username?: string | null;
  nickName?: string | null;
  email?: string | null;
  phone?: string | null;
  accountExpired?: boolean | null;
  accountLocked?: boolean | null;
  enable?: boolean | null;
  roles: Role[] | string[];

  [key: string]: any;
}

export interface Role {
  id: number;
  name: string | null;
}

export interface Permission {
  id: number;
  path: string | null;
}

export interface PermissionVo extends Permission {
  roles: Role[];
}

export interface MenuVo {
  id: number | null;
  text: string | null;
  group: boolean | null;
  link: string | null;
  level: number | null;
  icon: string | null;
  parentId: string | null;
  hasChildren: boolean | null;
  enable: boolean | null;
}
