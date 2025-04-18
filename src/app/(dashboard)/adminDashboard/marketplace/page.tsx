import TableData from "@/components/admin/Dashboard/TableData";
import { headers } from "next/headers";
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
    const res = await fetch(
      `${process.env.NEXTAUTH_URL}/api/adminDashboard/marketplace`,
      {
        headers: Object.fromEntries(await headers()),
        cache: "force-cache",
      }
    );
    const data = await res.json();
    items = data.data;
  } catch (error) {
    console.log(error);
  }
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
            <TableData key={item._id} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
