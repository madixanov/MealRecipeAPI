import Header from "../components/Header"
import { useMealStore } from "../store/meal-store"
import gsap from "gsap"
import { useEffect } from "react"

export default function MealPage() {
    const meal = useMealStore((state) => state.meal)

    useEffect(() => {
    gsap.fromTo(".ingredient-heading", {opacity: 0, y: 100}, {opacity: 1, y: 0, duration: 0.5})
    gsap.fromTo(".content", {opacity: 0, y: 100}, {opacity: 1, y: 0, duration: 1})
    gsap.fromTo(".instruction-container", {opacity: 0, y: 100}, {opacity: 1, y: 0, duration: 1.5})
    }, [])

      if (!meal || !meal.mealName) {
        return <p>Loading meal...</p>;
    }

    return (
        <div className="meal-page-div">
            <Header />
            <div className="meal-page">
                <div className="ingredient-heading">
                    <h1>Name: {meal.mealName}</h1>
                    <h2>Category: {meal.category}</h2>
                    <h3>Area: {meal.area}</h3>
                </div>
                <div className="content">
                    <img src={meal.photo} alt={meal.mealName} className="photo" />
                    <div className="ingredients-list">
                        <ul className="ingredient-list">
                            {meal.ingredients.map((item, index) => {
                                const imgName = item.name
                                .toLowerCase()
                                .replace(/\s+/g, "-")
                                .replace(/[^\w-]/g, "")

                                const imgUrl = `https://www.themealdb.com/images/ingredients/${imgName}.png`

                                return (
                                <li key={index} className="ingredient-container">
                                    <img
                                    src={imgUrl}
                                    alt={item.name}
                                    style={{ width: "50px", marginRight: "10px" }}
                                    onError={(e) => (e.target.style.display = "none")}
                                    />
                                    {item.measure} {item.name}
                                </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                <div className="instruction-container">
                        <ol className="instruction-list">
                            {meal.instructions
                                .split(/\r?\n/)
                                .filter(line => line.trim() !== "")
                                .map((line, index) => (
                                <li key={index}>{line}</li>
                                ))}
                        </ol>
                    </div>
            </div>
        </div>
    )
}