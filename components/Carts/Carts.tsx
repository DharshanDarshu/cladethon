"use client";
import { useEffect, useState } from "react";
import Cart from "./Cart";
import NoItem from "./NoItem";
import TotalAmount from "./TotalAmount";

type Props = {
  email: string;
  carts: [
    {
      _id: string;
      title: string;
      productId: string;
      image: string;
      price: number;
      items: number;
    },
  ];
};

function Carts({ carts, email }: Props) {
  let totalAmount = 0;
  if (carts) {
    carts.map((cart) => {
      return (totalAmount += cart.price * cart.items);
    });
  }
  const [changeItems, setChangeItems] = useState<
    number | undefined
  >();
  const [index, setIndex] = useState<any>();
  const [removeId, setRemoveId] = useState<any>();
  const [total, setTotal] = useState<number>(totalAmount);
  const [addition, setAddition] = useState<
    boolean | undefined
  >();
  const [newCart, setNewCart] = useState<any>(carts);

  useEffect(() => {
    if (index >= 0 && changeItems) {
      newCart[index].items = changeItems;
      const newPrice = newCart[index].price;
      if (addition) {
        setTotal(totalAmount + +newPrice);
      } else {
        setTotal(totalAmount - +newPrice);
      }
    }
  }, [changeItems, index]);

  useEffect(() => {
    if (removeId) {
      const cart = newCart.filter(
        (cart: any) => cart._id !== removeId,
      );

      let totalAmount = 0;

      const total = cart.map((cart: any) => {
        return (totalAmount += cart.price * cart.items);
      });

      setTotal(total);

      setNewCart(cart);
    }
  }, [removeId]);

  const handleItemsChange = (
    items: number,
    index: number,
    addition: boolean,
  ) => {
    setChangeItems(items);
    setIndex(index);
    setAddition(addition);
  };

  const handleRemove = (id: number) => {
    console.log(id);
    setRemoveId(id);
  };

  return (
    <div className='flex flex-col-reverse md:flex-row md:space-x-2 mt-2 lg:mt-12'>
      {newCart?.length ? (
        <>
          <div className='flex-1'>
            {newCart.map(
              (
                {
                  _id,
                  image,
                  items,
                  title,
                  price,
                  productId,
                }: any,
                index: number,
              ): any => (
                <Cart
                  key={_id}
                  image={image}
                  title={title}
                  items={items}
                  price={price}
                  email={email}
                  index={index}
                  id={_id}
                  productId={productId}
                  onChangeItems={handleItemsChange}
                  onRemove={handleRemove}
                />
              ),
            )}
          </div>
          <TotalAmount
            totalAmount={total}
            carts={newCart}
          />
        </>
      ) : (
        <NoItem />
      )}
    </div>
  );
}

export default Carts;
