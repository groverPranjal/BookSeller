import { ArrowLeft, MapPin } from "lucide-react"
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {/* left side */}
                <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        CheckOut Details
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Please Enter your information to complete order
                    </p>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-4 flex items-center">
                                <MapPin className="w-5 h-5 mr-2 text-[#43c6ac]"/
                            </h3>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Checkout