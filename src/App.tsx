import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Details from "./Details/Details";
import Favorites from "./Favorites/Favorites";
import { FavoritesProvider } from "./context/FavoritesContext";

export default function App(){
    
  return  (
    <FavoritesProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
      </FavoritesProvider>
  );
}



