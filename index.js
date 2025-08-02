import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/" , async(req, res) => {
    try{
        const response = await axios.get("https://www.themealdb.com/api/json/v1/1/random.php");
        const meal = response.data.meals[0];
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];

            if (ingredient && ingredient.trim()) {
                ingredients.push(`${measure} ${ingredient}`);
            }
        }
        res.render("index.ejs",{
            mealName: meal.strMeal,
            mealImage: meal.strMealThumb,
            category: meal.strCategory,
            area: meal.strArea,
            instructions: meal.strInstructions,
            ingredients: ingredients,
            youtubeLink: meal.strYoutube,
        });
    } catch (error) {
        console.error("Error fetching meal data:", error);
        res.status(500).send("Internal Server Error");
    }
    
});

app.listen(port , (req,res) => {
    console.log(`Listening on port ${port}`);
});