import { Filter } from "lucide-react"
import { styles as s } from "../assets/dummyStyles"

function ListBook() {
  return (
   <div className={s.listBooksPage}>
    <div className={s.listBooksHeader}>
        <h1 className={s.listBooksTitle}>Mange Books Inventory</h1>
        <p className={s.listBooksSubtitle}>
            View, edit and mange your book collection.
        </p>
    </div>

    {/* controls section */}

    <div className={s.controlsContainer}>
        <div className={s.controlsInner}>
            <div className="flex gap-3">
                <div className={s.filterGroup}>
                    <div className={s.filterGlow}></div>
                    <div className={s.filterContainer}>
                        <Filter className={s.filterIcon}/>
                    </div>
                </div>
            </div>
        </div>
    </div>
   </div>
  )
}

export default ListBook