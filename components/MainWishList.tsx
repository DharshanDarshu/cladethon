import { use, useState } from "react";
import { cookies } from "next/headers";
import WishLists from "./WishList/WishLists";
import WishListWithOutLogin from "./WishList/WishListWithOutLogin";

const getWishList = async (token: string) => {
  const response = await fetch(
    `${process.env.RESTFUL_API}/wishlist`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
      next: {
        revalidate: 0.0001,
      },
    },
  );

  const wishlist = await response.json();

  return wishlist;
};

function MainWishList() {
  const nextCookies = cookies();
  const accessToken = nextCookies.get("access_token");
  const accesstoken =
    accessToken && JSON.parse(accessToken?.value);
  const wishlist = use(getWishList(accesstoken));
  return (
    <div>
      {accesstoken ? (
        <WishLists
          token={accesstoken}
          wishlist={wishlist}
        />
      ) : (
        <WishListWithOutLogin />
      )}
    </div>
  );
}

export default MainWishList;
