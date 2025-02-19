import Home from "../pages/Home";
import DESTINATIONS from "../pages/Destinations";
import About from "../pages/About";
import Profile from "../pages/Profile"
import Contact from "../pages/Contact";
import Blogs from "../pages/Blogs";
import Placement from "../pages/Placement";

const publicRoutes = [
    {path:'/',component: Home , topic: 'HOME', navbar: 'trans'},
    {path:'/destinations',component: DESTINATIONS, topic: 'DESTINATIONS'},
    {path:'/about',component: About, topic: 'ABOUT US'},
    {path:'/blogs',component: Blogs, topic: 'BLOG'},
    {path:'/contact',component: Contact, topic: 'CONTACT US'},
    {path : '/:email', component: Profile, layout : null ,topic:'PROFILE'},
    {path:'/destinations/:placement',component: Placement},
]
const privateRoutes = [

]
export {publicRoutes, privateRoutes}