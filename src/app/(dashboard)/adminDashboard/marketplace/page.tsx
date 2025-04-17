import axios from "axios";
import { FileEdit } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
interface Item {
  _id: string;
  productName: string;
  category: string;
  price: number;
  location: string;
  phoneNumber: string;
  listed: string;
  verifyStatus: boolean;
  userName: string;
  photos: string[];
}
export default async function Marketplace() {
  let items: Item[] = [];
  try {
    const res = await axios.get(
      `${process.env.NEXTAUTH_URL}/api/adminDashboard/marketplace`,
      {
        headers: Object.fromEntries(await headers()),
      }
    );
    items = res.data.data;
  } catch (error) {
    console.log(error);
  }
  console.log(items);
  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200 text-sm text-left ">
        <thead className="bg-green-100">
          <tr>
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Product</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">User</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {items.map((item) => (
            <tr key={item._id}>
              <td>
                <Image
                  src={item.photos[0] || ""}
                  alt={item.productName}
                  height={60}
                  width={60}
                />
              </td>
              <td className="px-4 py-2">{item.productName}</td>
              <td className="px-4 py-2">{item.category}</td>
              <td className="px-4 py-2">{item.price} ৳</td>
              <td className="px-4 py-2">{item.userName}</td>
              <td className="px-4 py-2">
                <span
                  className={`inline-block px-2 py-1 rounded text-xs ${
                    item.verifyStatus
                      ? "bg-green-200 text-green-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {item.verifyStatus ? "Verified" : "Unverified"}
                </span>
              </td>
              <td className="px-4 py-2">
                <button className=" text-white px-3 py-1 rounded mr-2">
                  <FileEdit className="text-green-400" />
                </button>
                <button className="bg-red-500 text-white px-3 py-1 rounded">
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
