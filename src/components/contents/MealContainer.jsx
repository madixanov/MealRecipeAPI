import { SEARCH_API } from "../api/search-api"
import { useSearchStore } from "../../store/search-store"
import { useState, useEffect } from "react"
import { useCategoryStore } from "../../store/category-store"
import { gsap } from "gsap"
import { Link, useLocation } from "react-router-dom"

export default function MealContainer() {

    const [ meals, setMeals ] = useState([])

    const category = useCategoryStore((state) => state.category)
    const searchValue = useSearchStore((state) => state.searchValue)

    const location = useLocation()

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

    useEffect(() => {
        if (category) {
            gsap.fromTo(
            ".meal-container",
            {opacity: 0, y: 100},
            {opacity: 1, y: 0, duration: 1}
        )
        } 
    }, [category])

    function checkCategory() {
        if (category) {
            return meals.filter(meal => meal.category === category)
                        .map((meal) => {
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
                    </div>)}
            ) 
            } else {
                return meals.map((meal) => {
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
                            <button>
                                <Link to="/meal-instructions" className="header-link">
                                    More...
                                </Link>
                            </button>
                        </div>
                    </div>)}
            )
        }
    }

    return checkCategory();

}