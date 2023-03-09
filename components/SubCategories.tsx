import SubCategory from "./SubCategory";

type Props = {
  subcategories: [
    {
      _id: string;
      category: string;
      subcategory: [
        {
          name: string;
          image: string;
        },
      ];
    },
  ];
};

function SubCategories({ subcategories }: Props) {
  return (
    <div className='mt-3 md:mt-5 lg:mt-10'>
      {subcategories.map(
        ({ _id, subcategory, category }) => (
          <SubCategory
            key={_id}
            category={category}
            subcategory={subcategory}
          />
        ),
      )}
    </div>
  );
}

export default SubCategories;
