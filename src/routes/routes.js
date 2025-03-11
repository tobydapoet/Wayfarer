import Home from "../pages/Home";
import DESTINATIONS from "../pages/Destinations";
import About from "../pages/About";
import Profile from "../pages/Profile";
import Contact from "../pages/Contact";
import Blogs from "../pages/Blogs";
import Placement from "../pages/Destinations/Placement";
import Trips from "../pages/Destinations/Placement/Trips";
import Transports from "../pages/Destinations/Placement/Transports";
import Hotels from "../pages/Destinations/Placement/Hotels";
import SelectedPage from "../pages/SelectedPage/SelectedPage";
import Manage from "../pages/Manage/Manage";
import Business from "../pages/Manage/Business";
import Staffs from "../pages/Manage/Business/Staffs";
import Dashboard from "../pages/Manage/Business/Dashboard";
import Clients from "../pages/Manage/Business/Clients";
import Content from "../pages/Manage/Content";
import HomeContent from "../pages/Manage/Content/HomeContent";
import DestinationsContent from "../pages/Manage/Content/DestinationsContent";
import AboutUsContent from "../pages/Manage/Content/AboutUsContent";
import BlogContent from "../pages/Manage/Content/BlogContent";
import Partners from "../pages/Manage/Partners";
import Bills from "../pages/Manage/Bills";
import ProfileLayout from "../layouts/ProfileLayout";
import StaffInfo from "../pages/Manage/Business/Staffs/StaffInfo";
import ClientInfo from "../pages/Manage/Business/Clients/ClientInfo/ClientInfo";
import HomeContentInfo from "../pages/Manage/Content/HomeContent/HomeContentInfo/HomeContentInfo";

const publicRoutes = [
  { path: "/", component: Home, topic: "HOME", navbar: "trans" },
  { path: "/destinations", component: DESTINATIONS, topic: "DESTINATIONS" },
  { path: "/about", component: About, topic: "ABOUT US" },
  { path: "/blogs", component: Blogs, topic: "BLOG" },
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
            path: "/manage/business/staffs/:info",
            component: StaffInfo,
            layout: null,
          },
          {
            path: "/manage/business/clients/:info",
            component: ClientInfo,
            layout: null,
          },
        ],
      },
      {
        path: "content",
        component: Content,
        layout: null,
        children: [
          {
            path: "home_content",
            component: HomeContent,
            default: true,
            layout: null,
          },
          {
            path: "destinations_content",
            component: DestinationsContent,
            layout: null,
          },
          { path: "about_us_content", component: AboutUsContent, layout: null },
          { path: "blog_content", component: BlogContent, layout: null },
          {
            path: "/manage/content/home_content/:info",
            component: HomeContentInfo,
            layout: null,
          },
          {
            path: "/manage/content/home_content/Add_Content",
            component: HomeContentInfo,
            layout: null,
          },
        ],
      },
      { path: "partners", component: Partners, layout: null },
      { path: "bills", component: Bills, layout: null },
    ],
  },
  { path: "/contact", component: Contact, topic: "CONTACT US" },
  {
    path: "/:email",
    component: Profile,
    layout: ProfileLayout,
    topic: "PROFILE",
  },
  { path: "/:email/:selected", component: SelectedPage, layout: ProfileLayout },
  {
    path: "/destinations/:placement",
    component: Placement,
    children: [
      { path: "trips", component: Trips, default: true, layout: null },
      { path: "hotels", component: Hotels, layout: null },
      { path: "transports", component: Transports, layout: null },
    ],
  },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
