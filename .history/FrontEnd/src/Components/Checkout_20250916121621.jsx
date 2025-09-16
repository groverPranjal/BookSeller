import { ArrowLeft } from "lucide-react"
import Navbar from "./Navbar"

function Checkout() {
  return (
    <>
    <Navbar/>
    <div className="nim-h-screen bg-gradient-to-br pt-28 from-[#43c6ac] to-[#F8ffae] py-12">
        <div className="container mx-auto px-4">
            <Link to='/cart' className='inline-flex items-center text-[#1a237e]
            font-medium mb-6 hover:underline'>
               <ArrowLeft className="w-5 h-5 mr-2"/>
               Back to chart
            </Link>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl"></div>
        </div>
    </div>
    </>
  )
}

export default Checkout