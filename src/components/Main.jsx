import MealContainer from "./contents/MealContainer"
import { useSearchStore } from "../store/search-store"
import { useEffect } from "react"
import { gsap } from "gsap";

export default function Main() {
    const searchValue = useSearchStore((state) => state.searchValue)
    const addToSearch = useSearchStore((state) => state.addToSearch)

    function handleClick() {
        addToSearch("a")
    }

    useEffect(() => {
        gsap.fromTo(
            ".meal-list",
            {opacity: 0, y: 100},
            {opacity: 1, y: 0, duration: 1}
        )
    }, [searchValue])

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