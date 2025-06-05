import { SEARCH_API } from "../api/search-api"
import { useSearchStore } from "../../store/search-store"
import { useState, useEffect } from "react"

export default function MealContainer() {

    const [ meals, setMeals ] = useState([])

    const searchValue = useSearchStore((state) => state.searchValue)

    useEffect(() => {
    if (searchValue) {
        const fetchData = async () => {
                const res = await fetch(SEARCH_API(searchValue))
                const data = await res.json()
                if (data.meals) {
                    setMeals(data.meals.map((meal) => ({
                        mealId: meal.idMeal,
                        mealName: meal.strMeal,
                        category: meal.strCategory,
                        area: meal.strArea,
                        instructions: meal.strInstructions,
                        photo: meal.strMealThumb
                    })))
                }
        }

        fetchData()
    }
}, [searchValue])

    return (
        meals.map((meal) => {
            return (
                <div className="meal-container" key={meal.mealId}>
                    <div className="image-container">
                        <img src={meal.photo} alt={meal.mealName} />
                    </div>
                    <div className="meal-description">
                        <div className="meal-text">
                            <h2>{meal.mealName}</h2>
                            <p>{meal.instructions}</p>
                        </div>
                        <button>More...</button>
                    </div>
                </div>
            )
        })        
    )
}