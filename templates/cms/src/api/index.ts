import * as login from './module/login';
import * as menu from './module/menu';
import * as user from './module/user';
import * as sysinfo from './module/sysinfo';
import * as role from './module/role';
import * as dict from './module/dict';
import * as params from './module/params';
export default Object.assign(
    {},
    login,
    menu,
    user,
    sysinfo,
    dict,
    role,
    params,
);
