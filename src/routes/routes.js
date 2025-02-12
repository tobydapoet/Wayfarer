import Home from "../pages/Home";
import News from "../pages/News";
import About from "../pages/About";
import Profile from "../pages/Profile"
import Contact from "../pages/Contact";
import Blog from "../pages/Blog";

const publicRoutes = [
    {path:'/',component: Home , topic: 'HOME', navbar: 'trans'},
    {path:'/news',component: News, topic: 'NEWS'},
    {path:'/about',component: About, topic: 'ABOUT US'},
    {path:'/blog',component: Blog, topic: 'BLOG & PRESS'},
    {path:'/contact',component: Contact, topic: 'CONTACT US'},
    {path : '/profile', component: Profile, layout : null ,topic:'PROFILE'}
]
const privateRoutes = [

]
export {publicRoutes, privateRoutes}