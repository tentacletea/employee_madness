import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EquipmentTable from "../Components/EquipmentTable/index";

const fetchCharacters = (signal) => {
  return fetch("/api/characters", { signal }).then((res) => res.json());
};

const deleteCharacter = (id) => {
  return fetch(`/api/characters/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const EquipmentList = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const handleDelete = (id) => {
    deleteCharacter(id).catch((err) => {
      console.log(err);
    });

    setData((characters) => {
      return characters.filter((character) => character._id !== id);
    });
  };

  useEffect(() => {
    const controller = new AbortController();

    fetchCharacters(controller.signal)
      .then((characters) => {
        setLoading(false);
        setData(characters);
        console.log(characters)
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setData(null);
          throw error;
        }
      });

    return () => controller.abort();
  }, []);



  if (loading) {
    return <Loading />;
  }

  return <EquipmentTable characters={data} onDelete={handleDelete} />;
};

export default EquipmentList;
