import { SEARCH_API } from "../api/search-api"
import { useSearchStore } from "../../store/search-store"
import { useState, useEffect } from "react"
import { useCategoryStore } from "../../store/category-store"
import { useMealStore } from "../../store/meal-store"
import { gsap } from "gsap"
import { Link, useLocation, useNavigate } from "react-router-dom"

export default function MealContainer() {

    const [ meals, setMeals ] = useState([])

    const category = useCategoryStore((state) => state.category)
    const searchValue = useSearchStore((state) => state.searchValue)

    const addToMeal = useMealStore((state) => state.addToMeal)

    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
    if (searchValue) {
        const fetchData = async () => {
                const res = await fetch(SEARCH_API(searchValue))
                const data = await res.json()
               if (data.meals) {
                    setMeals(
                        data.meals.map((meal) => {
                        const ingredients = []

                        for (let i = 1; i <= 20; i++) {
                            const ing = meal[`strIngredient${i}`]
                            const meas = meal[`strMeasure${i}`]

                            if (ing && ing.trim()) {
                            ingredients.push({
                                name: ing.trim(),
                                measure: meas?.trim() || "",
                            })
                            }
                        }

                        return {
                            mealId: meal.idMeal,
                            mealName: meal.strMeal,
                            category: meal.strCategory,
                            area: meal.strArea,
                            instructions: meal.strInstructions,
                            photo: meal.strMealThumb,
                            ingredients: ingredients,
                        }
                        })
                    )
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

    const handleClick = (meal) => {
        addToMeal(meal);
        navigate("/meal-instructions");
        };

    function checkCategory() {
    const filteredMeals = category
        ? meals.filter(meal => meal.category === category)
        : meals

    return filteredMeals.map((meal) => (
        <div className="meal-container" key={meal.mealId}>
            <div className="image-container">
                <img src={meal.photo} alt={meal.mealName} />
            </div>
            <div className="meal-description">
                <div className="meal-text">
                    <h2 className="title">{meal.mealName}</h2>
                    <p className="short-instructions">{meal.instructions}</p>
                </div>
                <button onClick={() => handleClick(meal)}>More...</button>
            </div>
        </div>
    ));
}

    return checkCategory()

}