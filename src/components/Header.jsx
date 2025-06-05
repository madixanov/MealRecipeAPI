import { useState } from "react";
import { useSearchStore } from "../store/search-store"

export default function Header() {
    const addToSearch = useSearchStore((state) => state.addToSearch)
    const [ inputValue, setInputValue ] = useState("")

    function handleChange(event) {
        setInputValue(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        addToSearch(inputValue);
        setInputValue("");
    }

    return (
        <header>
            <form className="heading" onSubmit={handleSubmit}>
                <h1>F<span>oo</span>dy Z<span>o</span>ne</h1>
                <input type="text" placeholder="Search Food..." value={inputValue} onChange={handleChange}/>
            </form>
            <div className="categories">
                <button>All</button>
                <button>Breakfast</button>
                <button>Seafood</button>
                <button>Dessert</button>
            </div>
        </header>
    )
}