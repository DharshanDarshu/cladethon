import Category from "./Category";

function Categories() {
  return (
    <div className='my-16'>
      <h1 className='text-gray-700 text-3xl font-semibold tracking-wide'>
        Shop Our Top Categories
      </h1>
      <div className='flex gap-3 mt-4 flex-shrink flex-wrap'>
        <Category />
        <Category />
        <Category />
        <Category />
        <Category />
        <Category />
        <Category />
      </div>
    </div>
  );
}

export default Categories;
