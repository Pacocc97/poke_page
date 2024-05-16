import axios from "axios";

import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { PokemonList } from "../types/pokemon";
import Pagination from "../components/Pagination";

export default function Home() {
  const searchParams = new URLSearchParams(location.search);
  const productPage = Number(searchParams.get("limit")) || 10;
  const page = Number(searchParams.get("offset")) || 0;
  const { data } = useQuery<PokemonList>({
    queryKey: ["todos"],
    queryFn: async function () {
      const { data } = await axios.get(
        `http://localhost:8000/api/pokemon/list?limit=${productPage}&offset=${page}`,
        {
          timeout: 20000,
        },
      );

      return data;
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
                    Pokemons
                  </h1>
                  <p className="mt-2 text-sm text-gray-300">Lista de pokemon</p>
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
                            Name
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
                        {data?.results?.map(
                          (pokemon: { name: string; url: string }) => (
                            <tr key={pokemon.url}>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                                {pokemon.name}
                              </td>

                              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                <Link
                                  className="text-indigo-400 hover:text-indigo-300"
                                  to={`/pokemon/${pokemon.name}`}
                                >
                                  Ver
                                  <span className="sr-only">
                                    , {pokemon.name}
                                  </span>
                                </Link>
                              </td>
                            </tr>
                          ),
                        )}
                      </tbody>
                    </table>
                    <Pagination total={data?.count || 0} />
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
