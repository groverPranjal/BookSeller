import Sidebar from "./components/Sidebar"
import AddBook from "./components/AddBook"
import { Route,Routes } from "react-router-dom"
import ListBook from "./components/ListBook"

function App() {
  return (
    <div className='flex min-h-screen bg-gray-50'>
      <Sidebar/>
      <main className="flex-1 overflow-auto">
        <Routes>
          <Route path='/' element={<AddBook/>}></Route>
          <Route path="/list-books" element={<ListBook/>}></Route>
        </Routes>
      </main>

      
    </div>
  )
}

export default App