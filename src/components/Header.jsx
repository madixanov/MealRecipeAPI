export default function Header() {
    return (
        <header>
            <div className="heading">
                <h1>F<span>oo</span>dy Z<span>o</span>ne</h1>
                <input type="text" placeholder="Search Food..." />
            </div>
            <div className="categories">
                <button>All</button>
                <button>Breakfast</button>
                <button>Seafood</button>
                <button>Dessert</button>
            </div>
        </header>
    )
}