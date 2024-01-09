import { Route, Routes } from 'react-router-dom'
import { LoginPage } from '../pages/Login/Login';
import { Page404 } from '../pages/Page404/Page404';
import { RegisterPage } from '../pages/Register/Register';
import { HomePage } from '../pages/Home/Home';

export default function MainRoutes() {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='*' element={<Page404/>} />
        </Routes>
    );
}