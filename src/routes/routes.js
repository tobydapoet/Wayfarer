import Home from "../pages/Home";
import DESTINATIONS from "../pages/Destinations";
import About from "../pages/About";
import Profile from "../pages/Profile";
import Contact from "../pages/Contact";
import Blogs from "../pages/Blogs";
import Placement from "../pages/Destinations/Placement";
import SelectedPage from "../pages/SelectedPage/SelectedPage";
import Manage from "../pages/Manage/Manage";
import Business from "../pages/Manage/Business";
import Staffs from "../pages/Manage/Business/Staffs";
import Dashboard from "../pages/Manage/Business/Dashboard";
import Clients from "../pages/Manage/Business/Clients";
import DestinationsManage from "../pages/Manage/DestinationsManage";
import ProfileLayout from "../layouts/ProfileLayout";
import ClientInfo from "../pages/Manage/Business/Clients/ClientInfo/ClientInfo";
import DestinationInfo from "../pages/Manage/DestinationsManage/DestinationInfo/DestinationInfo";
import ServicesManage from "../pages/Manage/DestinationsManage/ServicesManage";
import ServiceIntroduce from "../pages/Manage/DestinationsManage/ServicesManage/ServiceIntroduce/ServiceIntroduce";
import PlacementInfo from "../pages/Destinations/PlacementInfo";
import Services from "../pages/Destinations/Placement/Services";
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
import { ContactProvicer } from "../contexts/ContactContext";
import ContactInfo from "../pages/Manage/ContactManage/ContactInfo/ContactInfo";
import AboutUsManage from "../pages/Manage/AboutUsManage";
import { AboutUsContext, AboutUsProvider } from "../contexts/AboutUsContext";
import { StaffProvider } from "../contexts/StaffContext";
import VoucherManage from "../pages/Manage/VoucherManage";
import { VoucherProvider } from "../contexts/VoucherContext";
import Vouchers from "../pages/Manage/VoucherManage/Vouchers/Vouchers";
import UsageVouchers from "../pages/Manage/VoucherManage/UsageVouchers/UsageVouchers";
import { UsageVoucherProvider } from "../contexts/UsageVoucherContext";
import { ClientProvider } from "../contexts/ClientContext";
import BonusPoint from "../pages/SelectedPage/BonusPoint/BonusPoint";

const publicRoutes = [
  {
    path: "/",
    component: Home,
    context: [BlogProvider, CityProvider, DestinationProvider],
    topic: "HOME",
  },
  {
    path: "/destinations",
    component: DESTINATIONS,
    context: CityProvider,
    topic: "DESTINATIONS",
  },
  {
    path: "/about",
    component: About,
    context: [AboutUsProvider, StaffProvider],
    topic: "ABOUT US",
  },
  { path: "/blogs", component: Blogs, context: BlogProvider, topic: "BLOG" },
  { path: "/bill", component: Bill },
  {
    path: "/contact",
    component: Contact,
    context: ContactProvicer,
    topic: "CONTACT US",
  },
  {
    path: "/blogs/:id",
    component: BlogInfo,
    context: BlogProvider,
  },
  {
    path: "/blogs/add_content",
    component: BlogAddWraper,
  },

  {
    path: "/destinations/:placement",
    component: Placement,
    context: DestinationProvider,
    children: [
      { path: ":type", component: Services, default: true, layout: null },
      { path: ":type/:id", component: PlacementInfo, layout: null },
    ],
  },
  {
    path: ":email",
    component: Profile,
    layout: ProfileLayout,
  },
  {
    path: ":email/:selected",
    component: SelectedPage,
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
    context: [UsageVoucherProvider],
    layout: ProfileLayout,
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
          { path: "staffs", component: Staffs, layout: null },
          {
            path: "dashboard",
            component: Dashboard,
            default: true,
            layout: null,
          },
          { path: "clients", component: Clients, layout: null },
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
            layout: null,
          },
          {
            path: "/manage/business/staffs/:email",
            component: StaffLayout,
            layout: null,
          },
        ],
      },
      {
        path: "destinations",
        component: DestinationsManage,
        context: [CityProvider, DestinationProvider],
        layout: null,
      },
      {
        path: "destinations/:placement",
        component: DestinationInfo,
        context: DestinationProvider,
        layout: null,
        children: [
          {
            path: ":type",
            component: ServicesManage,
            context: DestinationProvider,
            layout: null,
          },
          {
            path: ":type/:id",
            component: ServiceIntroduce,
            context: DestinationProvider,
            layout: null,
          },
        ],
      },

      {
        path: "/manage/about_us_content",
        component: AboutUsManage,
        context: AboutUsProvider,
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
        context: ContactProvicer,
        layout: null,
      },

      {
        path: "/manage/contact_manage/:id",
        component: ContactInfo,
        context: ContactProvicer,
        layout: null,
      },

      {
        path: "billsmanage",
        component: BillsManage,
        layout: null,
      },
      {
        path: "vouchers_manage",
        component: VoucherManage,
        context: [VoucherProvider, UsageVoucherProvider, ClientProvider],
        layout: null,
        children: [
          { path: "usage_vouchers", component: UsageVouchers, layout: null },
          { path: "vouchers", component: Vouchers, layout: null },
        ],
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
      { path: "/manage/billsmanage/:bill", component: BillEdit, layout: null },
    ],
  },
];
export { publicRoutes, privateRoutes };
