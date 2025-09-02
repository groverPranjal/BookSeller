import { useState } from "react";
import { styles as s } from "../assets/dummyStyles";
import axios from "axios";
import { BookPlus, Star } from "lucide-react";
const initialFormData = {
  title: "",
  author: "",
  price: "",
  image: null,
  rating: 4,
  category: "Fiction",
  description: "",
  preview: "",
};

const categories = [
  "Fiction",
  "Non-Fiction",
  "Mystery",
  "Sci-Fi",
  "Biography",
  "Self-Help",
  "Thriller",
];
const API_BASE = "http://localhost:4000";

function AddBook() {
  const [formData, setFormData] = useState(initialFormData);
  const [hoverRating, setHoverRating] = useState(0);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: null, text: null });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: null, text: null });

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "preview" && value !== null) {
        payload.append(key, value);
      }
    });
    try {
      await axios.post(`${API_BASE}/api/book`, payload);
      setMessage({ type: "success", text: "Book added Successfully!" });
      setFormData(initialFormData);
    } catch (err) {
      console.error("Add Book error:", err.response?.data, err);
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to add book.",
      });
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFormData((prev) => ({
      ...prev,
      image: file,
      preview: URL.createObjectURL(file),
    }));
  };

  //star rating function
  const handleStarClick = (rating) => {
    setFormData((prev) => ({ ...prev, rating }));
  };

  return (
    <div className={s.addBooksPage}>
      <div className={s.addBooksContainer}>
        <div className={s.headerContainer}>
          <div>
            <h1 className={s.headerTitle}> Add New Book</h1>
            <p className={s.headerSubtitle}>
              Fill in the details to add new book to your store.
            </p>
          </div>
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit} className={s.formContainer}>
          <div className={s.formGrid}>
            <div className={s.formItem}>
              <label className={s.formLabel}>Book Title</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={s.formInput}
                placeholder="Enter Book Title"
                required
              />
            </div>

            <div className={s.formItem}>
              <label className={s.formLabel}>Author</label>
              <input
                name="author"
                value={formData.author}
                onChange={handleChange}
                className={s.formInput}
                placeholder="Enter author name"
                required
              />
            </div>

            <div className={s.formItem}>
              <label className={s.formLabel}>Price (₹)</label>
              <input
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                className={s.formInput}
                placeholder="Enter Price"
                required
              />
            </div>
            <div className={s.formItem}>
              <label className={s.formLabel}>Rating</label>
              <div className={s.ratingContainer}>
                <div className={s.starContainer}>
                  {[1, 2, 3, 4, 5].map((starValue) => (
                    <button
                      key={starValue}
                      type="button"
                      onClick={() => handleStarClick(starValue)}
                      onMouseEnter={() => setHoverRating(starValue)}
                      onMouseLeave={() => setHoverRating(0)}
                      aria-label={`Rate ${starValue} star${
                        starValue !== 1 ? "s" : ""
                      }`}
                    >
                      <Star
                        className={`w-5 h-5 ${
                          (hoverRating || formData.rating) >= starValue
                            ? s.starFilled
                            : s.starEmpty
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <p className={s.ratingText}>
                  {formData.rating} Star{formData.rating !== 1 ? "s" : ""}
                </p>
              </div>
            </div>

            
              
              <div className={s.formItem}>
                <label className={s.formLabel}>Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={s.formInput}
                >
                  {categories.map((cat) => (
                    <option value={cat} key={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className={s.formItem}>
                <label className={s.formLabel}>Cover Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className={s.formInput}
                />
              </div>

              <div className={`${s.formItem} md:col-span-2`}>
                <label className={s.formLabel}>Description </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className={s.formTextarea}
                  placeholder="Enter Book Description"
                ></textarea>
              </div>
            
          </div>
             {formData.preview &&(
                <div className={s.previewContainer}>
                    <h3 className={s.previewTitle}> Cover Preview</h3>
                    <img src={formData.preview} alt="Image" className={s.previewImg}/>
                </div>
             )}

             {message.text && (
                <p className={`text-${message.type ==='success'?'green':'red'}-500`}>{message.text}</p>
             )}
             <div className={s.submitContainer}>
                <button type='submit' className={s.submitButton} disabled={loading}>
                   <BookPlus className="w-5 h-5"/>
                   <span>Add Book To Collection</span>
                </button>
             </div>
        </form>
      </div>
    </div>
  );
}

export default AddBook;
