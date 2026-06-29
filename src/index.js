import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import BlogPage from './Components/BlogPage'
import BodyContent from './Components/BodyContent'
import ReactGA from 'react-ga4'

const Playground = React.lazy(() => import('./Components/Playground'))

ReactGA.initialize('G-FE413KBQDW')

const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <BodyContent />,
            },
            {
                path: '/blogpage',
                element: <BlogPage />,
            },
            {
                path: '/playground',
                element: (
                    <Suspense fallback={<div className='w-screen h-screen flex items-center justify-center bg-black text-white text-sm'>Loading...</div>}>
                        <Playground />
                    </Suspense>
                ),
            },
        ],
    },
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<RouterProvider router={appRouter} />)

reportWebVitals()
