import axios from "axios";

import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { PokeDex } from "../types/pokemon";

export default function Pokedex() {
  const { data } = useQuery<PokeDex>({
    queryKey: ["pokedex"],
    queryFn: async function () {
      try {
        const { data } = await axios.get<PokeDex>(
          `http://localhost:8000/api/pokemon/all`,
          {
            timeout: 20000,
          },
        );
        return data;
      } catch (error) {
        console.error("Error al obtener la Pokédex:", error);
        throw error;
      }
    },
  });

  return (
    <main>
      <div className="bg-gray-900">
        <div className="mx-auto max-w-7xl">
          <div className="bg-gray-900 py-10">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <h1 className="text-base font-semibold leading-6 text-white">
                    Pokemons en pokedex
                  </h1>
                  <p className="mt-2 text-sm text-gray-300">
                    Total de puntos: {Math.floor(data?.score || 0)}
                  </p>
                </div>
              </div>
              <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table className="min-w-[50%] divide-y divide-gray-700">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"
                          >
                            Pokemon
                          </th>
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"
                          >
                            Altura
                          </th>
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"
                          >
                            Peso
                          </th>
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"
                          >
                            Creado
                          </th>
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"
                          >
                            Actualizado
                          </th>
                          <th
                            scope="col"
                            className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                          >
                            <span className="sr-only">Add</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800">
                        {data?.results?.map((pokemon) => (
                          <tr key={pokemon.id}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                              {/* {pokemon.id} */}
                              <div className="flex items-center">
                                <div className="h-11 w-11 flex-shrink-0">
                                  <img
                                    className="h-11 w-11 rounded-full"
                                    src={pokemon.sprite_url}
                                    alt=""
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="font-medium text-gray-200">
                                    {pokemon?.name?.toUpperCase()}
                                  </div>
                                  <div className="mt-1 text-gray-500">
                                    {pokemon.id}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                              {pokemon?.height}
                            </td>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                              {pokemon?.weight}
                            </td>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                              {new Date(
                                pokemon?.created_at,
                              ).toLocaleDateString()}
                            </td>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                              {new Date(
                                pokemon?.updated_at,
                              ).toLocaleDateString()}
                            </td>

                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                              <Link
                                className="text-indigo-400 hover:text-indigo-300"
                                to={`/pokedex/${pokemon.id}`}
                              >
                                Ver
                                <span className="sr-only">
                                  , {pokemon.name}
                                </span>
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
