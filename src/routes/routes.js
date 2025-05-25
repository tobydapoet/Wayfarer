import Home from "../pages/Home";
import DESTINATIONS from "../pages/Destinations";
import About from "../pages/About";
import Profile from "../pages/Profile";
import Contact from "../pages/Contact";
import Blogs from "../pages/Blogs";
import Placement from "../pages/Destinations/Placement";
import Manage from "../pages/Manage/Manage";
import Business from "../pages/Manage/Business";
import Staffs from "../pages/Manage/Business/Staffs";
import Dashboard from "../pages/Manage/Business/Dashboard";
import Clients from "../pages/Manage/Business/Clients";
import DestinationsManage from "../pages/Manage/DestinationsManage";
import ProfileLayout from "../layouts/ProfileLayout";
import ClientInfo from "../pages/Manage/Business/Clients/ClientInfo/ClientInfo";
import DestinationInfo from "../pages/Manage/DestinationsManage/DestinationInfo";
import ServiceIntroduce from "../pages/Manage/DestinationsManage/ServiceIntroduce/ServiceIntroduce";
import PlacementInfo from "../pages/Destinations/PlacementInfo";
import Bill from "../pages/Bill";
import BlogManage from "../pages/Manage/BlogManage";
import BillsManage from "../pages/Manage/BillsManage";
import BillEdit from "../pages/Manage/BillsManage/BillEdit";
import ClientAdd from "../pages/Manage/Business/Clients/ClientAdd";
import AboutUsEdit from "../pages/Manage/AboutUsManage/AboutUsEdit/AboutUsEdit";
import ContactManage from "../pages/Manage/ContactManage";
import BlogInfo from "../pages/Blogs/BlogInfo";
import StaffLayout from "../pages/Manage/Business/Staffs/StaffWrapper";
import BlogAddWraper from "../pages/Blogs/BlogAddWrapper/BlogAddWrapper";
import { CityProvider } from "../contexts/CityContext";
import { BlogProvider } from "../contexts/BlogContext";
import { DestinationProvider } from "../contexts/DestinationContext";
import { ContactProvider } from "../contexts/ContactContext";
import ContactInfo from "../pages/Manage/ContactManage/ContactInfo/ContactInfo";
import AboutUsManage from "../pages/Manage/AboutUsManage";
import { AboutUsProvider } from "../contexts/AboutUsContext";
import { StaffProvider } from "../contexts/StaffContext";
import VoucherManage from "../pages/Manage/VoucherManage";
import { VoucherProvider } from "../contexts/VoucherContext";
import Vouchers from "../pages/Manage/VoucherManage/Vouchers/Vouchers";
import UsageVouchers from "../pages/Manage/VoucherManage/UsageVouchers/UsageVouchers";
import { UsageVoucherProvider } from "../contexts/UsageVoucherContext";
import { ClientProvider } from "../contexts/ClientContext";
import BonusPoint from "../pages/SelectedPage/BonusPoint/BonusPoint";
import PayTypeManage from "../pages/Manage/PayTypeManage/PayTypeManage";
import { PayTypeProvider } from "../contexts/PayTypeContext";
import { BillProvider } from "../contexts/BillContext";
import { ScheduleProvider } from "../contexts/ScheduleContext";
import Processing from "../pages/SelectedPage/Processing";
import Favourite from "../pages/SelectedPage/Favourite";
import MyBlogs from "../pages/SelectedPage/MyBlogs/MyBlogs";
import { FeedBackProvider } from "../contexts/FeedbackContext";
import { BlogFavouriteProvider } from "../contexts/BlogFavouriteContext";
import { DestinationFavouriteProvider } from "../contexts/DestinationFavouriteContext";
import ContactResponse from "../pages/ContactResponse";
import { KpiTargetProvider } from "../contexts/KpiTargertContext";
import ForgetPassword from "../pages/ForgetPassword/ForgetPassword";
import OTPIdentify from "../pages/OTPIdentify/OTPIdentify";
import { UserOTPProvider } from "../contexts/UserOTPContext";
import ResetPassword from "../pages/ResetPassword";
import { AccountProvider } from "../contexts/AccountContext";
import Unauthorized from "../pages/Unauthorized";

const publicRoutes = [
  {
    path: "/",
    component: Home,
    context: [
      BlogProvider,
      CityProvider,
      DestinationProvider,
      BlogFavouriteProvider,
      BillProvider,
    ],
    topic: "HOME",
  },
  {
    path: "/destinations",
    component: DESTINATIONS,
    context: [CityProvider, DestinationProvider],
    topic: "DESTINATIONS",
  },
  {
    path: "/about",
    component: About,
    context: [AboutUsProvider, StaffProvider],
    topic: "ABOUT US",
  },
  {
    path: "/blogs",
    component: Blogs,
    context: [BlogProvider, BlogFavouriteProvider],
    topic: "BLOG",
  },
  {
    path: "/bill",
    component: Bill,
    context: [
      DestinationProvider,
      ScheduleProvider,
      ClientProvider,
      UsageVoucherProvider,
      PayTypeProvider,
      BillProvider,
    ],
  },
  {
    path: "/contact/:id",
    component: ContactResponse,
    context: ContactProvider,
  },
  {
    path: "/contact",
    component: Contact,
    context: ContactProvider,
    topic: "CONTACT US",
  },
  {
    path: "/blogs/:id",
    component: BlogInfo,
    context: [BlogProvider, BlogFavouriteProvider],
  },
  {
    path: "/blogs/add_content",
    component: BlogAddWraper,
  },

  {
    path: "/destinations/:placement",
    component: Placement,
    context: [
      FeedBackProvider,
      DestinationProvider,
      DestinationFavouriteProvider,
      BillProvider,
    ],
  },
  {
    path: "/destinations/:placement/:id",
    component: PlacementInfo,
    context: [
      FeedBackProvider,
      DestinationProvider,
      DestinationFavouriteProvider,
      BillProvider,
    ],
  },
  {
    path: ":email",
    component: Profile,
    context: [StaffProvider, ClientProvider, UsageVoucherProvider],
    layout: ProfileLayout,
  },
  {
    path: ":email/processing",
    component: Processing,
    context: [BillProvider, FeedBackProvider],
    layout: ProfileLayout,
  },
  {
    path: ":email/favourite",
    component: Favourite,
    context: [
      BlogProvider,
      BlogFavouriteProvider,
      DestinationProvider,
      DestinationFavouriteProvider,
      FeedBackProvider,
      BillProvider,
    ],
    layout: ProfileLayout,
  },
  {
    path: ":email/my_blogs/",
    component: MyBlogs,
    context: BlogProvider,
    layout: ProfileLayout,
  },
  {
    path: ":email/my_blogs/:id",
    component: BlogInfo,
    context: BlogProvider,
    layout: ProfileLayout,
  },
  {
    path: ":email/bonus",
    component: BonusPoint,
    context: UsageVoucherProvider,
    layout: ProfileLayout,
  },
  { path: "/indentify", context: UserOTPProvider, component: ForgetPassword },
  {
    path: "/indentify/:email",
    context: UserOTPProvider,
    component: OTPIdentify,
  },
  {
    path: "/indentify/:email/reset",
    context: [ClientProvider, StaffProvider],
    component: ResetPassword,
  },
  {
    path: "/unauthorized",
    component: Unauthorized,
  },
];
const privateRoutes = [
  ...publicRoutes,
  {
    path: "/manage",
    component: Manage,
    topic: "MANAGEMENT",
    children: [
      {
        path: "business",
        component: Business,
        layout: null,
        default: true,
        children: [
          {
            path: "staffs",
            component: Staffs,
            roles: ["super admin"],
            layout: null,
          },
          {
            path: "dashboard",
            component: Dashboard,
            context: [BillProvider, KpiTargetProvider],
            default: true,
            layout: null,
          },
          {
            path: "clients",
            component: Clients,
            layout: null,
          },
          {
            path: "/manage/business/clients/add_content",
            component: ClientAdd,
            layout: null,
          },
          {
            path: "/manage/business/staffs/add_content",
            component: StaffLayout,
            layout: null,
          },
          {
            path: "/manage/business/clients/:email",
            component: ClientInfo,
            context: BillProvider,
            layout: null,
          },
          {
            path: "/manage/business/staffs/:email",
            component: StaffLayout,
            roles: ["admin"],
            layout: null,
          },
        ],
      },
      {
        path: "destinations",
        component: DestinationsManage,
        roles: ["admin"],
        context: [CityProvider, DestinationProvider],
        layout: null,
      },
      {
        path: "destinations/:placement",
        component: DestinationInfo,
        roles: ["admin"],
        context: [
          FeedBackProvider,
          DestinationProvider,
          DestinationFavouriteProvider,
          BillProvider,
        ],
        layout: null,
      },
      {
        path: "destinations/:placement/:id",
        component: ServiceIntroduce,
        roles: ["admin"],
        context: [DestinationProvider, DestinationFavouriteProvider],
        layout: null,
      },

      {
        path: "/manage/about_us_content",
        component: AboutUsManage,
        context: AboutUsProvider,
        roles: ["admin"],
        layout: null,
      },
      {
        path: "/manage/about_us_content/add_content",
        component: AboutUsEdit,
        context: AboutUsProvider,
        layout: null,
      },
      {
        path: "/manage/about_us_content/:id",
        component: AboutUsEdit,
        context: AboutUsProvider,
        layout: null,
      },
      {
        path: "blog_content",
        component: BlogManage,
        context: BlogProvider,
        layout: null,
      },

      {
        path: "contact_manage",
        component: ContactManage,
        context: ContactProvider,
        layout: null,
      },

      {
        path: "/manage/contact_manage/:id",
        component: ContactInfo,
        context: ContactProvider,
        layout: null,
      },

      {
        path: "billsmanage",
        component: BillsManage,
        context: BillProvider,
        layout: null,
      },
      {
        path: "vouchers_manage",
        component: VoucherManage,
        roles: ["admin"],
        context: [VoucherProvider, UsageVoucherProvider, ClientProvider],
        layout: null,
        children: [
          { path: "usage_vouchers", component: UsageVouchers, layout: null },
          { path: "vouchers", component: Vouchers, layout: null },
        ],
      },
      {
        path: "paytypes_manage",
        component: PayTypeManage,
        roles: ["super admin"],
        context: PayTypeProvider,
        layout: null,
      },
      {
        path: "/manage/blog_content/add_content",
        component: BlogAddWraper,
        layout: null,
      },
      {
        path: "/manage/blog_content/:id",
        component: BlogInfo,
        context: BlogProvider,
        layout: null,
      },

      {
        path: "/manage/billsmanage/:id",
        component: BillEdit,
        context: [ScheduleProvider, BillProvider],
        layout: null,
      },
    ],
  },
];
export { publicRoutes, privateRoutes };
