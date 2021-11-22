// React imports
import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import trashcan from "../assets/trash-can.svg";
import { projectFirestore } from "../firebase/config";

//style imports
import "./RecipeList.css";

export default function RecipeList({ recipes }) {
  const { mode } = useTheme();

  if (recipes.length === 0) {
    return <div className="error">No recipes to load...</div>;
  }
  const handleDelete = (id) => {
    projectFirestore.collection("recipes").doc(id).delete();
  };
  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div key={recipe.id} className={`card ${mode}`}>
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} to cook.</p>
          <div>{recipe.method.substring(0, 100)}...</div>
          <Link to={`recipes/${recipe.id}`}>Cook This</Link>
          <img
            src={trashcan}
            onClick={() => handleDelete(recipe.id)}
            className="delete"
          />
        </div>
      ))}
    </div>
  );
}
