import React from "react";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";

interface PriceQuantityProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  watch: UseFormWatch<FormData>;
}
export default function PriceQuantity({
  register,
  errors,
  watch,
}: PriceQuantityProps) {
  const category = watch("category");
  return (
    <div
      className={`${
        category === "pesticides" ? "hidden" : ""
      } col-span-2 grid-cols-2 grid gap-4`}
    >
      <div>
        <label className="block text-sm font-medium text-gray-700">Unit</label>
        <select
          {...register("unit", { required: "Unit is required" })}
          className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Select unit</option>
          <option value="kg">kg</option>
          <option value="ton">ton</option>
          <option value="piece">piece</option>
          <option value="litre">litre</option>
          <option value="dozen">dozen</option>
        </select>
        {errors.unit && (
          <p className="text-red-500 text-sm">{errors.unit.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Quantity
        </label>
        <input
          {...register("quantity", {
            required: "Quantity is required",
            valueAsNumber: true,
          })}
          type="number"
          placeholder="Enter quantity"
          className="border [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none p-2 rounded-md w-full"
        />
        {errors.quantity && (
          <p className="text-red-500 text-sm">{errors.quantity.message}</p>
        )}
      </div>
    </div>
  );
}
