import Pick from "./Pick";

function Picks() {
  return (
    <div className='mt-12'>
      <h1 className='text-3xl font-semibold text-gray-800  mb-4 mx-2'>
        Top Picks
      </h1>
      <div className='flex'>
        <Pick
          image='https://assets.myntassets.com/f_webp,w_140,c_limit,fl_progressive,dpr_2.0/assets/images/2022/2/23/062cea23-9a6a-44b9-bdd4-87cae6a462311645602543339-Kurta-sets.jpg'
          link='/categories/womens/kurta sets'
        />
        <Pick
          image='https://assets.myntassets.com/f_webp,w_140,c_limit,fl_progressive,dpr_2.0/assets/images/2022/2/23/8d65d400-decd-4f42-902c-a40350a16ed11645602543346-Kurtas.jpg'
          link='/categories/womens/kurtas'
        />
        <Pick
          image='https://assets.myntassets.com/f_webp,w_140,c_limit,fl_progressive,dpr_2.0/assets/images/2022/2/23/398ee53b-5899-4a9a-9d0b-b35d60c01cb41645602543325-Dresses.jpg'
          link='/categories/womens/Dresses'
        />
        <Pick
          image='https://assets.myntassets.com/f_webp,w_140,c_limit,fl_progressive,dpr_2.0/assets/images/2022/2/23/2f410d81-7fae-400e-9ecc-b4a8b6df72b91645602543430-Women-Jeans.jpg'
          link='/categories/mens/jeans'
        />
        <Pick
          image='https://assets.myntassets.com/f_webp,w_140,c_limit,fl_progressive,dpr_2.0/assets/images/2022/2/23/82a9be01-3032-4725-9500-bcc94366b7931645602543399-Mens-Shirts.jpg'
          link='/categories/mens/shirt'
        />
        <Pick
          image='https://assets.myntassets.com/f_webp,w_140,c_limit,fl_progressive,dpr_2.0/assets/images/2022/2/23/c6b09c0f-5c57-472c-a3fc-854ec506a90e1645602543387-Men-T-shirt.jpg'
          link='/categories/mens/tshirt'
        />
        <Pick
          image='https://assets.myntassets.com/f_webp,w_140,c_limit,fl_progressive,dpr_2.0/assets/images/2022/2/23/f08e2bac-9bed-4f87-b022-0dce8defeded1645602543380-Men-Trousers.jpg'
          link='/categories/mens/trouser'
        />
      </div>
    </div>
  );
}

export default Picks;
