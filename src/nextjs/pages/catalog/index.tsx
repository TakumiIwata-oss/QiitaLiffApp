import { useState } from "react";
import CatalogPage from "../../components/pages/catalog/CatalogPage";
import Complete from "../../components/pages/catalog/Complete";

export default function Catalog() {
  const [isComplete, setIsComplete] = useState(false);

  if (isComplete) return <Complete />;
  else return <CatalogPage setIsComplete={setIsComplete} />;
}
