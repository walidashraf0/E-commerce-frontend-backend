import { faUserPlus, faUsers, faBagShopping, faCirclePlus, faShop } from "@fortawesome/free-solid-svg-icons";

export const links = [
    {
        name: "Users",
        path: "users",
        icon: faUsers,
        role: ["1995"]
    },
    {
        name: "Add User",
        path: "/dashboard/user/add",
        icon: faUserPlus,
        role: ["1995"]
    },
    {
        name: "Categories",
        path: "/dashboard/categories",
        icon: faBagShopping,
        role: ["1995", "1999"]
    },
    {
        name: "Add Category",
        path: "/dashboard/category/add",
        icon: faCirclePlus,
        role: ["1995", "1999"]
    },
    {
        name: "Products",
        path: "/dashboard/products",
        icon: faShop,
        role: ["1995", "1999"]
    },
    {
        name: "Add Products",
        path: "/dashboard/product/add",
        icon: faCirclePlus,
        role: ["1995", "1999"]
    },
];