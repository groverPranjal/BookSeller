import { BookOpen, Filter, Trash2 } from "lucide-react";
import { styles as s } from "../assets/dummyStyles";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:4000"; // move this up

function ListBook() {
  const [books, setBooks] = useState([]);
  const [filterCategory, setFilterCategory] = useState("All");
  const [sortConfig, setSortConfig] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // fetch books
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await axios.get(`${API_BASE}/api/book`);
        setBooks(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch books");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  // categories
  const categories = useMemo(
    () => ["All", ...new Set(books.map((book) => book.category))],
    [books]
  );

  // sorting + filtering
  const displayedBooks = useMemo(() => {
    let filtered = books;
    if (filterCategory !== "All") {
      filtered = filtered.filter((book) => book.category === filterCategory);
    }

    if (sortConfig === "price") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortConfig === "rating") {
      filtered = [...filtered].sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  }, [books, filterCategory, sortConfig]);

  const tableHeaders = [
    { key: null, label: "Book" },
    { key: "author", label: "Author" },
    { key: null, label: "Category" },
    { key: "price", label: "Price" },
    { key: "rating", label: "Rating" },
    { key: null, label: "Actions" },
  ];

  // ⭐ rating component
  const RatingStar = ({ rating }) => (
    <div className={s.ratingContainer}>
      <div className={s.starContainer}>
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`h-4 w-4 ${
              i < Math.floor(rating) ? s.starFilled : s.starEmpty
            }`}
          >
            ★
          </span>
        ))}
      </div>
      <span className={s.ratingText}>{rating.toFixed(1)}</span>
    </div>
  );

  //delete books uisng id
     const handleDelete=async (id) => {
        if(!window.confirm('Are you sure?'))  return;
        try {
            await axios.delete(
                `${API_BASE}/api/book/${id}`,
                {validateStatus:status =>[200,204,500].includes(status)}

            );
            setBooks((prev0=>prev0.filter((book)=>book._id !==id)));
        } catch (err) {
            console.error(err);
        }
     }

  return (
    <div className={s.listBooksPage}>
      <div className={s.listBooksHeader}>
        <h1 className={s.listBooksTitle}>Manage Books Inventory</h1>
        <p className={s.listBooksSubtitle}>
          View, edit and manage your book collection.
        </p>
      </div>

      {/* controls */}
      <div className={s.controlsContainer}>
        <div className={s.controlsInner}>
          <div className="flex gap-3">
            <div className={s.filterGroup}>
              <div className={s.filterGlow}></div>
              <div className={s.filterContainer}>
                <Filter className={s.filterIcon} />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className={s.filterSelect}
                >
                  {categories.map((category) => (
                    <option value={category} key={category}>
                      {category === "All" ? "All Categories" : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* feedback */}
      {loading && <p>Loading Books....</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* table */}
      <div className={s.booksTableContainer}>
        <div className="overflow-x-auto">
          <table className={s.table}>
            <thead className={s.tableHead}>
              <tr>
                {tableHeaders.map((header) => (
                  <th
                    key={header.label}
                    className={s.tableHeader}
                    onClick={() =>
                      header.key &&
                      setSortConfig(sortConfig === header.key ? "" : header.key)
                    }
                  >
                    <div className={s.tableHeaderContent}>
                      {header.label}
                      {header.key && sortConfig === header.key && (
                        <span className="ml-1">↑</span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {displayedBooks.map((book) => (
                <tr key={book._id} className={s.tableRow}>
                  <td className={s.tableCell}>
                    <div className="flex items-center">
                      {book.image && (
                        <img
                          src={`${API_BASE}${book.image}`}
                          alt={book.title}
                          className="h-10 w-8 object-cover rounded"
                        />
                      )}
                      <div className="ml-4">
                        <div className={s.bookTitle}>{book.title}</div>
                      </div>
                    </div>
                  </td>
                  <td className={s.tableCell}>{book.author}</td>
                  <td className={s.tableCell}>
                    <span className={s.categoryBadge}>{book.category}</span>
                  </td>
                  <td className={s.tableCell}>{book.price}</td>
                  <td className={s.tableCell}>
                    <RatingStar rating={book.rating} />
                  </td>
                  <td className={`${s.tableCell} flex gap-3`}>
                    <button onClick={()=>handleDelete(book._id)} className={s.deleteButton}>
                        <Trash2 className="h-5 w-5"/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!displayedBooks.length && !loading && (
            <div className={s.emptyState}>
                <div className={s.emptyIconContainer}>
                    <BookOpen className={s.emptyIcon}/>
                </div>
                <h3 className={s.emptyTitle}>No Books found</h3>
                <p className={s.emptyMessage}>Try Adjusting your filter or sort options</p>
            </div>
        )}
      </div>
    </div>
  );
}

export default ListBook;
