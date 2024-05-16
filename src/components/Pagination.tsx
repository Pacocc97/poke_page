type Props = {
  total: number;
};

const Pagination = (props: Props) => {
  const searchParams = new URLSearchParams(location.search);
  const productPage = Number(searchParams.get("limit")) || 1;
  const page = Number(searchParams.get("offset")) || 0;
  console.log(productPage);

  return (
    <nav
      className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Mostrando{" "}
          <span className="font-medium">
            {productPage * (page + 1) - productPage + 1}
          </span>{" "}
          al <span className="font-medium">{productPage * (page + 1)}</span> of{" "}
          <span className="font-medium">{props.total}</span> resultados
        </p>
      </div>
      <div className="flex flex-1 justify-between sm:justify-end">
        <a
          href={`buscar?limit=${productPage}&offset=${
            page === 0 ? 0 : page - 1
          }`}
          className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
        >
          Atrás
        </a>
        <a
          href={`buscar?limit=${productPage}&offset=${page + 1}`}
          className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
        >
          Siguiente
        </a>
      </div>
    </nav>
  );
};
export default Pagination;
