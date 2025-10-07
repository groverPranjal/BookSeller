import { ArrowLeft, CheckCircle, MapPin } from "lucide-react"
import Navbar from "./Navbar"
import { useEffect } from "react";
import axios from "axios";

function Checkout() {
    const API_BASE='hhtp://localhost:4000';
const IMG_BASE=API_BASE.replace('/api','');
 
const { cart, clearCart } = useCart();
const [formData, setFormData] = useState({
    name: '', email: '', phone: '', address: '',
    city: '', state: '', zip: '', paymentMethod: 'cod'
  });

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState(null);
  // capture total before clearing
  const [orderTotal, setOrderTotal] = useState(0);

  // State to hold map of book IDs to image paths
  const [images, setImages] = useState({});

  //fetch images
  useEffect(()=>{
    axios.get(`${API_BASE}/book`)
    .then(({data})=>{
        const books=Array.isArray(data)?data:data.books || [];
        const map={};
        books.forEach(b=>{
            if(b._id && b.image) map[b._id]=b.image;

        })
        setImages(map);

    })
    .catch(err=>console.error('could not load books images::',err));
  },[]);

  const handleChange=(e)=>{
    const {name,value}=e.target;
    setFormData(prev=>({...prev,[name]:value}));
  };
  const calculateTotal = () => cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const subtotal = calculateTotal();
  const tax = subtotal * 0.05;
  const total = subtotal + tax;


  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
        const token=localStorage.getItem('authToken');
        if(!token) throw new Error('Not authenticated');

        const items = cart.items.map(item => ({
  id:       item.id || item._id,    // <-- make sure this is the Mongo _id of the Book
  name:     item.title,
  price:    item.price,
  quantity: item.quantity || 1,
}));


      const paymentMethodLabel = formData.paymentMethod === 'cod'
        ? 'Cash on Delivery'
        : 'Online Payment';
      const paymentStatus = formData.paymentMethod === 'online'
        ? 'Paid'
        : 'Pending';

      const payload = {
        customer: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: {
            street: formData.address,
            city: formData.city,
            state: formData.state,
            zip: formData.zip,
          },
        },
        items,
        paymentMethod: paymentMethodLabel,
        paymentStatus,
        notes: formData.notes || '',
        deliveryDate: formData.deliveryDate || '',
      };

      const {data}=await axios.post(`${API_BASE}/order`,payload,{
        headers:{Authorization: `Bearer ${token}`},
      });
      setOrderTotal(total);
      await axios.delete(`${API_BASE}/cart/clear`,{
         headers:{Authorization: `Bearer ${token}`},
      });
      clearCart();

      if(formData.paymentMethod =='online' && data.checkoutUrl){
        window.location.href=data.checkoutUrl;
        return ;
      }
      setOrderId(data.order?.orderId|| null);
      setOrderPlaced(true);

    }
    catch(err){
        console.error('Order Submitting error',err);

    };
  }
  if(orderPlaced){
    return <div className="min-h-screen bg-gradient-to-br from-[#43c6ac] to-[#f8ffae] py-20">
        <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
                <div className="inline-flex item-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                    <CheckCircle className="h-12 w-12 text-green-500"/>
                    <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#1a237e] to-[#43C6AC] bg-clip-text text-transparent mb-4">
                        Order Confiremed!
                    </h1>
                    <p className="text-gray-600 text-lg mb-8">
                        Thank you for your purchase. Your order has been placed successfully.
                    </p>
                    <div className="bg-gradient-to-r from-[#43c6ac]/10 to-[#f8ffae]/10 rounded-xl mb-8 max-w-lg mx-auto">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-700">Order ID:</span>
                        <span className="font-bold text-gray-900">
                            {orderId}
                        </span>
                    </div>

                     <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-700">Payemnt Method:</span>
                        <span className="font-bold text-gray-900">
                            {formData.paymentMethod=== 'cod'?
                            "Cash on Delivery":"Online Payment"}
                        </span>
                    </div>

                     <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-700">Total Amount:</span>
                        <span className="text-xl font-bold text-[#1a237e]">
                           ₹ {orderTotal.toFixed(2)}
                        </span>
                    </div>
                    </div>
                    <p className="">

                    </p>
                </div>

            </div>
        </div>

    </div>
  }
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
                                <MapPin className="w-5 h-5 mr-2 text-[#43c6ac]"/>
                                Shipping Address
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