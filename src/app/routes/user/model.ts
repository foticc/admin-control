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
  roles?: string[] | null;

  [key: string]: any;
}

export interface Role {
  id: number;
  name: string | null;
}
