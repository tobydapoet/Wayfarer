import Home from "../pages/Home";
import DESTINATIONS from "../pages/Destinations";
import About from "../pages/About";
import Profile from "../pages/Profile"
import Contact from "../pages/Contact";
import BlogNews from "../pages/Blog&News";

const publicRoutes = [
    {path:'/',component: Home , topic: 'HOME', navbar: 'trans'},
    {path:'/destinations',component: DESTINATIONS, topic: 'DESTINATIONS'},
    {path:'/about',component: About, topic: 'ABOUT US'},
    {path:'/blog&news',component: BlogNews, topic: 'BLOG & NEWS'},
    {path:'/contact',component: Contact, topic: 'CONTACT US'},
    {path : '/:email', component: Profile, layout : null ,topic:'PROFILE'}
]
const privateRoutes = [

]
export {publicRoutes, privateRoutes}