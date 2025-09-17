import './App.css'
import { BrowserRouter, Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'

function App(){

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route path='/' element={<Landing />} />
                    <Route path='/route1' element={<Route1 />} />
                    <Route path='/route2' element={<Route2 />} />
                    <Route path='*' element={<ErrorPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )

}

function Layout() {
    return (
        <div style={{height: "100vh"}}>
            <Link to="/">Landing Page</Link>
            |
            <Link to="/route1">Route 1</Link>
            |
            <Link to="/route2">Route 2</Link>
            <div style={{height: "90vh"}}>
                <Outlet />
            </div>
            footer
        </div>
    )
}
function ErrorPage() {
    return (
        <div>
            Sorry page not found
        </div>
    )
}

function Landing() {
    return (
        <div>
            Landing Page
        </div>
    )
}

function Route1(){
    return (
        <div>
            Route 1...
        </div>
    )
}

function Route2(){
    return (
        <div>
            Route 2...
        </div>
    )
}

export default App