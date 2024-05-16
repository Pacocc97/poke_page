import { useMutation, useQuery } from "@tanstack/react-query";
import type { Pokemon as PokeType } from "../types/pokemon";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const Edit = () => {
  const [saved, setSaved] = useState(false);
  const { id } = useParams();
  const { data: pokemon } = useQuery<PokeType>({
    queryKey: ["pokemons"],
    queryFn: async function () {
      const { data } = await axios.get(
        `http://localhost:8000/api/pokemon/detail/${id}`,
        {
          timeout: 20000,
        },
      );

      return data;
    },
  });

  const [formData, setFormData] = useState({
    name: pokemon?.name || "",
    height: pokemon?.height || 0,
    weight: pokemon?.weight || 0,
    base_stats: {
      hp: pokemon?.base_stats.hp || 0,
      attack: pokemon?.base_stats.attack || 0,
      defense: pokemon?.base_stats.defense || 0,
      specialAttack: pokemon?.base_stats.specialAttack || 0,
      specialDefense: pokemon?.base_stats.specialDefense || 0,
      speed: pokemon?.base_stats.speed || 0,
    },
    ...pokemon,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const [parentName, childName] = name.split(".");

    if (childName) {
      setFormData({
        ...formData,
        [parentName]: {
          ...formData[parentName],
          [childName]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value, // Si no hay subdivisión, actualiza directamente la propiedad del objeto formData
      });
    }
  };

  const mutation = useMutation({
    mutationFn: async function (id: string) {
      const { data } = await axios.put(
        `http://localhost:8000/api/pokemon/update/${id}`,
        formData,
      );
      return data;
    },
    onSuccess: () => {
      toast("Cambios guardados", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setSaved(true);
    },
  });

  // Función para enviar los datos del formulario al servidor
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await mutation.mutateAsync(pokemon?.id || "");
      console.log("Mutación completada exitosamente");
    } catch (error) {
      console.error("Error al realizar la mutación:", error);
    }
  };
  return (
    <div className="space-y-10 divide-y divide-gray-900/10">
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
        <div className="px-4 sm:px-0">
          <h2 className="text-base font-semibold leading-7 text-white">
            Info del pokemon
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Edite los datos de su pokemon.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
        >
          <div className="px-4 py-6 sm:p-8">
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Nombre
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="height"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Altura
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="height"
                    id="height"
                    autoComplete="address-level2"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={formData.height}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="weight"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Peso
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="weight"
                    id="weight"
                    autoComplete="address-level1"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={formData.weight}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="height"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  HP
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="base_stats.hp"
                    id="base_stats.hp"
                    autoComplete="address-level2"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={formData.base_stats?.hp}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="weight"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Attack
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="base_stats.attack"
                    id="base_stats.attack"
                    autoComplete="address-level1"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={formData.base_stats?.attack}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="postal-code"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Defense
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="base_stats.defense"
                    id="base_stats.defense"
                    autoComplete="postal-code"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={formData.base_stats?.defense}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="height"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Special Attack
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="base_stats.special-attack"
                    id="base_stats.special-attack"
                    autoComplete="address-level2"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={formData.base_stats?.["special-attack"]}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="weight"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Special-defense
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="base_stats.special-defense"
                    id="base_stats.special-defense"
                    autoComplete="address-level1"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={formData.base_stats?.["special-defense"]}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="postal-code"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Speed
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="base_stats.speed"
                    id="base_stats.speed"
                    autoComplete="postal-code"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={formData.base_stats?.speed}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
            {!saved ? (
              <>
                <Link
                  to={`/pokedex/${id}`}
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Guardar
                </button>
              </>
            ) : (
              <Link
                to={`/pokedex/${id}`}
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Volver
              </Link>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
