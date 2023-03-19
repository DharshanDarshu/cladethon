import Products from "../../components/Products";
import SearchMain from "../../components/SearchMain";

type Props = {
  searchParams: {
    search: string;
  };
};

function SearchPage({ searchParams: { search } }: Props) {
  const decodeSearch = decodeURI(search);

  return <SearchMain search={decodeSearch} />;
}

export default SearchPage;
