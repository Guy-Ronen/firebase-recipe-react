//import React
import { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { projectFirestore } from "../../firebase/config";

// import styles
import "./Create.css";

export default function Create() {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const ingredientInput = useRef(null);

  const history = useHistory();

  const handleAdd = (e) => {
    e.preventDefault();

    const ing = newIngredient.trim();
    if (ing && !ingredients.includes(ing)) {
      setIngredients((prevIngredients) => [...prevIngredients, ing]);
    }
    setNewIngredient("");
    ingredientInput.current.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const doc = {
      title,
      ingredients,
      method,
      cookingTime: cookingTime + " minutes",
    };
    try {
      await projectFirestore.collection("recipes").add(doc);
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="create">
      <h2 className="page-title">Add a New Recipe</h2>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe Titile:</span>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>

        <label>
          <span>Cooking Ingredients</span>
          <div className="ingredients">
            <input
              type="text"
              onChange={(e) => setNewIngredient(e.target.value)}
              value={newIngredient}
              ref={ingredientInput}
            />
            <button onClick={handleAdd} className="btn">
              Add
            </button>
          </div>
        </label>
        <p>
          Current Ingredients:{" "}
          {ingredients.map((i) => (
            <em key={i}>{i},</em>
          ))}
        </p>

        <label>
          <span>Enter Cooking Instructions:</span>
          <textarea
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>

        <label>
          <span>Cooking Time (in minutes):</span>
          <input
            type="number"
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required
          />
        </label>

        <button className="btn">Submit Recipe</button>
      </form>
    </div>
  );
}
