import useFetch from "@/Hook/useFetch";
import Image from "next/image";

interface ProductModalProps {
  isOpen: boolean;
  id: string;
  onClose: () => void;
}
interface ProductData {
  productName: string;
  photos: string[];
  category: string;
  type: string;
  price: number;
  unit: string;
  quantity: number;
  condition: string;
  location: string;
  phoneNumber: string;
  isNegotiable: boolean;
  listed: string;
  description: string;
  userName: string;
}

export default function ProductModal({
  isOpen,
  onClose,
  id,
}: ProductModalProps) {
  const { data, error, loading } = useFetch<{ data: ProductData }>(
    `/api/adminDashboard/marketplace/${id}`
  );

  if (!isOpen) return null;
  if (loading)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-50">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-50">
        Something went wrong
      </div>
    );

  const item: ProductData = data?.data || ({} as ProductData);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-50">
      <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-2xl relative px-6 py-6 space-y-4">
        <button
          className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
          onClick={onClose}
        >
          Close
        </button>

        <h2 className="text-2xl font-semibold mb-2">{item?.productName}</h2>

        <div className="flex gap-4">
          {item?.photos?.map((photo: string, index: number) => (
            <Image
              key={index}
              src={photo}
              alt={`Photo ${index}`}
              height={128}
              width={128}
            />
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm mt-4">
          <p>
            <strong>Category:</strong> {item?.category}
          </p>
          <p>
            <strong>Type:</strong> {item?.type}
          </p>
          <p>
            <strong>Price:</strong> {item?.price} ৳ / {item?.unit}
          </p>
          <p>
            <strong>Quantity:</strong> {item?.quantity} {item?.unit}
          </p>
          <p>
            <strong>Condition:</strong> {item?.condition}
          </p>
          <p>
            <strong>Location:</strong> {item?.location}
          </p>
          <p>
            <strong>Phone:</strong> {item?.phoneNumber}
          </p>
          <p>
            <strong>Negotiable:</strong> {item?.isNegotiable ? "Yes" : "No"}
          </p>
          <p>
            <strong>Listed:</strong>{" "}
            {new Date(item?.listed).toLocaleDateString()}
          </p>
          <p>
            <strong>Seller:</strong> {item?.userName}
          </p>
        </div>

        <div className="mt-4">
          <h3 className="font-semibold">Description:</h3>
          <p className="text-sm text-gray-700">{item?.description}</p>
        </div>
      </div>
    </div>
  );
}
