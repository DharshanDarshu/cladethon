import axios from "axios";
// import * as cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const { headers, body } = req;

  try {
    const { data, headers: returnedHeaders } =
      await axios.post(
        "http://localhost:4000/user/login", // Node.js backend path
        body, // Login body (email + password)
        { headers }, // Headers from the Next.js Client
      );
    //  Update headers on requester using headers from Node.js server response
    Object.entries(returnedHeaders).forEach((keyArr) =>
      res.setHeader(keyArr[0], keyArr[1] as string),
    );

    // res.setHeader(
    //   "Set-Cookie",
    //   cookie.serialize("accessToken", data.accessToken, {
    //     httpOnly: true,
    //     maxAge: 10, // 1 week
    //   }),
    // );

    res.send(data); // Send data from Node.js server response
  } catch ({ response: { status, data } }) {
    // Send status (probably 401) so the axios interceptor can run.
    res.status(Number(status)).json(data);
  }
};
