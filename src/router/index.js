import { createBrowserRouter } from 'react-router-dom'

// import Login from '../pages/Login'
import Login from '@/pages/Login'
import Layout from '@/pages/Layout'
import {AuthRoute} from '@/components/AuthRoute'
import TravellingGuideline from '@/pages/TravellingGuideline'
import TravelRoutes from '@/pages/TravelRoutes'
import PersonalInformation from '@/pages/PersonalInformation'
import Administrator from '@/pages/Administrator'
import ArticleDetailsPage from '@/pages/Article'
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children:[
        {
            path:'',
            element:<TravellingGuideline/>
        },
        {
            path:'travelRoutes',
            element:<TravelRoutes/>
        },
        {
            path:'personalInformation',
            element:<PersonalInformation/>
        },
        {
            path:'administrator',
            element:<Administrator/>
        },
    ]
  },
  {
    path: '/login',
    element: <Login />,
  },
])

export default router