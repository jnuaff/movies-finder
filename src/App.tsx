import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Details from "./components/Details/Details";
import Favorites from "./components/Favorites/Favorites";
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



