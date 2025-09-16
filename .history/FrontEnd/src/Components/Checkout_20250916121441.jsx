import Navbar from "./Navbar"

function Checkout() {
  return (
    <>
    <Navbar/>
    <div className="nim-h-screen bg-gradient-to-br pt-28 from-[#43c6ac] to-[#F8ffae] py-12">
        <div className="container mx-auto px-4">
            <Link to='/cart' className='inline-flex items-center text-[#1a237e]
            font-medium '></Link>
        </div>
    </div>
    </>
  )
}

export default Checkout