import Image from "next/image";

interface Schema {
  id: number;
  name_en: string;
  name_bn: string;
  type: string;
  image_url: string;
  benefits: string[];
  application: {
    method: string;
    documents_required: string[];
    deadline: string;
  };
}

async function getData(id: string): Promise<Schema | null> {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/schema/schemas.json`);
  const json = await res.json();
  return json.find((item: Schema) => item.id === parseInt(id)) || null;
}

export default async function Schemadetails({
  params,
}: {
  params: { id: string };
}) {
  const res = await params;
  const { id } = res;
  const scheme = await getData(id);

  if (!scheme) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <div className="p-6 w-11/12 lg:w-10/12 mx-auto my-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <div className="w-full">
          <Image
            src={scheme.image_url}
            alt={scheme.name_en}
            width={600}
            height={400}
            className="w-full h-auto object-cover rounded-md shadow-md"
            unoptimized
          />
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-green-700">
            {scheme.name_bn}
          </h3>
          <p className="text-gray-600 italic text-xl">{scheme.name_en}</p>
          <p className="text-gray-600 mb-3 mt-3">
            <strong className="text-black">Type:</strong> {scheme.type}
          </p>
          <h2 className="text-lg font-semibold mb-2">Benefits:</h2>
          <ul className="list-disc ml-5 mb-4 text-gray-700">
            {scheme.benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
          <h2 className="text-lg font-semibold mb-2">How to Apply:</h2>
          <p className="mb-1">
            <strong>Method:</strong> {scheme.application.method}
          </p>
          <p className="mb-1">
            <strong>Required Documents:</strong>{" "}
            {scheme.application.documents_required.join(", ")}
          </p>
          <p className="mb-4">
            <strong>Deadline:</strong> {scheme.application.deadline}
          </p>
          <button className="mt-6 px-5 py-2 w-full bg-green-700 text-white font-semibold rounded hover:bg-blue-700 transition">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}
