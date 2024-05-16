import { CheckIcon } from "@heroicons/react/20/solid";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import type { Pokemon as PokeType } from "../types/pokemon";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Confirmation from "../components/Confirmation";
import { useState } from "react";

export default function PokemonBD() {
  const [open, setOpen] = useState(false);

  const navigation = useNavigate();
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
  const { data: score } = useQuery({
    queryKey: ["score"],
    queryFn: async function () {
      const { data } = await axios.get(
        `http://localhost:8000/api/pokemon/score/${id}`,
        {
          timeout: 20000,
        },
      );

      return data;
    },
  });

  const values = {
    breadcrumbs: [
      { id: 1, name: "Pokedex", href: "/pokedex" },
      { id: 2, name: pokemon?.name?.toUpperCase(), href: "#" },
    ],
  };

  const mutation = useMutation({
    mutationFn: async function (id: string) {
      const { data } = await axios.delete(
        `http://localhost:8000/api/pokemon/delete/${id}/`,
      );
      return data;
    },
    onSuccess: () => navigation("/pokedex"),
  });

  const handleDelete = async () => {
    try {
      await mutation.mutateAsync(pokemon?.id || "");
      console.log("Mutación completada exitosamente");
    } catch (error) {
      console.error("Error al realizar la mutación:", error);
    }
  };

  return (
    <main>
      <Confirmation
        borrar={handleDelete}
        open={open}
        setOpen={setOpen}
      />
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-4 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          {/* Product details */}
          <div className="lg:max-w-lg lg:self-end">
            <nav aria-label="Breadcrumb">
              <ol
                role="list"
                className="flex items-center space-x-2"
              >
                {values.breadcrumbs.map((breadcrumb, breadcrumbIdx) => (
                  <li key={breadcrumb.id}>
                    <div className="flex items-center text-sm">
                      <a
                        href={breadcrumb.href}
                        className="font-medium text-gray-500 hover:text-gray-900"
                      >
                        {breadcrumb.name}
                      </a>
                      {breadcrumbIdx !== values.breadcrumbs.length - 1 ? (
                        <svg
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                          className="ml-2 h-5 w-5 flex-shrink-0 text-gray-300"
                        >
                          <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                        </svg>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="mt-4">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {pokemon?.name?.toUpperCase()}
              </h1>
              <h3>Score: {Math.floor(score?.score) || ""} puntos</h3>
            </div>

            <section
              aria-labelledby="information-heading"
              className="mt-4"
            >
              <h2
                id="information-heading"
                className="sr-only"
              >
                Product information
              </h2>

              <div className="flex items-center">
                <p className="text-lg text-gray-900 sm:text-xl">
                  {pokemon?.types?.[0]}
                </p>

                <div className="ml-4 border-l border-gray-300 pl-4">
                  <p className="text-lg text-gray-900 sm:text-xl">
                    {pokemon?.types?.[1]}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2">
                <section>
                  <div className="mt-4 space-y-6">
                    <p className="text-base text-gray-500">
                      Estadísticas base:
                    </p>
                  </div>
                  <ul>
                    {Object.entries(pokemon?.base_stats || {})?.map(
                      ([key, value]) => (
                        <li
                          className="flex items-center"
                          key={key}
                        >
                          <CheckIcon
                            className="h-5 w-5 flex-shrink-0 text-green-500"
                            aria-hidden="true"
                          />
                          <strong className="ml-2 text-sm text-gray-500">
                            {key}:
                          </strong>
                          {"   "}
                          {value}
                        </li>
                      ),
                    )}
                  </ul>
                </section>
                <div className="mt-6">
                  <div className="mt-4 space-y-6">
                    <p className="text-base text-gray-500">Habilidades: </p>
                  </div>
                  <div className="flex flex-col mt-4 space-y-3">
                    {pokemon?.abilities?.map((ab) => (
                      <a
                        href="#"
                        className="group inline-flex text-base font-medium"
                      >
                        <ShieldCheckIcon
                          className="mr-2 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                        <span className="text-gray-500 hover:text-gray-700">
                          {ab}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Product image */}
          <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
            <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
              <img
                src={pokemon?.sprite_url}
                alt={pokemon?.name}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          {/* Product form */}
          <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
            <section aria-labelledby="options-heading">
              <h2
                id="options-heading"
                className="sr-only"
              >
                Product options
              </h2>

              <div>
                <div className="sm:flex sm:justify-between">
                  {/* Size selector */}

                  <p className="block text-sm font-medium text-gray-700">
                    Características físicas
                  </p>
                  <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="relative block cursor-pointer rounded-lg border border-gray-300 p-4 focus:outline-none">
                      <div>
                        <p className="text-base font-medium text-gray-900">
                          Peso
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          {pokemon?.weight}
                        </p>
                        <div
                          className="pointer-events-none absolute -inset-px rounded-lg"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="relative block cursor-pointer rounded-lg border border-gray-300 p-4 focus:outline-none">
                      <div>
                        <p className="text-base font-medium text-gray-900">
                          Altura
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          {pokemon?.height}
                        </p>
                        <div
                          className="pointer-events-none absolute -inset-px rounded-lg"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="mt-4">
                  <a
                    href="#"
                    className="group inline-flex text-sm text-gray-500 hover:text-gray-700"
                  >
                    <span>What size should I buy?</span>
                    <QuestionMarkCircleIcon
                      className="ml-2 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </a>
                </div> */}
                <div className="mt-10">
                  <button
                    onClick={() => setOpen(true)}
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-red-600 px-8 py-3 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                  >
                    Quitar de Pokedex
                  </button>
                  <Link
                    to={`/pokedex/edit/${pokemon?.id}`}
                    // onClick={handleSubmit}
                    className="flex w-full mt-4 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                  >
                    Editar Pokemón
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
