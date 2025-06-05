import MealContainer from "./contents/MealContainer"
import { useSearchStore } from "../store/search-store"

export default function Main() {
    const searchValue = useSearchStore((state) => state.searchValue)
    const addToSearch = useSearchStore((state) => state.addToSearch)

    function handleClick() {
        addToSearch("a")
    }

    return (
        <main>
            <div className="result-row">
                    {searchValue === "a" ? null : <h1>Result: {searchValue}</h1>}
                    {searchValue === "a" ? null : <button onClick={handleClick}>Clear</button>}
            </div>

            <div className="meal-list">
                <MealContainer />
            </div>
        </main>
    )
}