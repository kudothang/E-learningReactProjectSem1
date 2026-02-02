
import {  Routes, Route } from 'react-router'
import './App.css'
import MainLayout from './components/layouts/MainLayout'

import CourseDetail from './pages/CourseDetail'
import CourseListPage from './pages/CoursePage'


function App() {
  
  return (
    <>
     
        <Routes>
        <Route element={<MainLayout />}>
        <Route path="/courses" element={<CourseListPage/>} />
        <Route path="/courses/:id" element={<CourseDetail />} />
      </Route>
      {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    
    </>
  )
}

export default App
