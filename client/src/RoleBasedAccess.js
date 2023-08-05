import rbac from "rbacjs";

const rolesConfig = [
  {
    roles: ["USER"],
    permissions: ["READ"],
  },
  {
    roles: ["ADMIN"],
    permissions: ["DELETE", "READ", "EDIT", "CREATE"],
  },
];

export default new rbac({ rolesConfig });
