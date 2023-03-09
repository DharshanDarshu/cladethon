import Category from "./Category";

type Props = {
  categories: [
    {
      _id: string;
      category: string;
      image: string;
    },
  ];
};

function Categories({ categories }: Props) {
  return (
    <div className='my-8 lg:my-16'>
      <h1 className='text-gray-700 text-xl lg:text-3xl font-semibold tracking-wide'>
        Shop Our Top Categories
      </h1>
      <div className='flex flex-col md:flex-row gap-y-2 lg:gap-3 mt-4 flex-shrink'>
        {categories.map(({ _id, category, image }) => (
          <Category
            key={_id}
            id={_id}
            category={category}
            image={image}
          />
        ))}
      </div>
    </div>
  );
}

export default Categories;
