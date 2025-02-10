import Home from "../pages/Home";
import News from "../pages/News";
import About from "../pages/About"

const publicRoutes = [
    {path:'/',component: Home},
    {path:'/news',component: News},
    {path:'/about',component: About},
]
const priveRoutes = [

]
export {publicRoutes, priveRoutes}