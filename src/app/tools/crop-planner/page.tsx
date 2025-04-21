"use client";
import { useState } from "react";

export default function CropPlanner() {
  const [fields, setFields] = useState([
    { id: 1, name: "Field 1", area: 5, unit: "hectares" },
  ]);

  const [plans, setPlans] = useState([
    {
      id: 1,
      fieldId: 1,
      season: "spring",
      crop: "corn",
      startDate: "",
      endDate: "",
      notes: "",
    },
  ]);

  const [nextFieldId, setNextFieldId] = useState(2);
  const [nextPlanId, setNextPlanId] = useState(2);
  const [activeTab, setActiveTab] = useState("fields");
  const [selectedField, setSelectedField] = useState(1);

  const crops = [
    { value: "corn", label: "Corn (Maize)", color: "bg-yellow-500" },
    { value: "wheat", label: "Wheat", color: "bg-amber-300" },
    { value: "rice", label: "Rice", color: "bg-green-200" },
    { value: "soybean", label: "Soybean", color: "bg-green-400" },
    { value: "potato", label: "Potato", color: "bg-yellow-700" },
    { value: "cotton", label: "Cotton", color: "bg-blue-100" },
    { value: "tomato", label: "Tomato", color: "bg-red-500" },
    { value: "lettuce", label: "Lettuce", color: "bg-green-300" },
    { value: "carrot", label: "Carrot", color: "bg-orange-500" },
    { value: "onion", label: "Onion", color: "bg-yellow-100" },
    { value: "fallow", label: "Fallow (Rest)", color: "bg-gray-200" },
  ];

  const seasons = [
    { value: "spring", label: "Spring" },
    { value: "summer", label: "Summer" },
    { value: "fall", label: "Fall (Autumn)" },
    { value: "winter", label: "Winter" },
    { value: "yearRound", label: "Year Round" },
  ];

  const addField = () => {
    setFields([
      ...fields,
      {
        id: nextFieldId,
        name: `Field ${nextFieldId}`,
        area: 5,
        unit: "hectares",
      },
    ]);
    setNextFieldId(nextFieldId + 1);
  };

  const removeField = (id) => {
    setFields(fields.filter((field) => field.id !== id));
    setPlans(plans.filter((plan) => plan.fieldId !== id));
    if (selectedField === id && fields.length > 1) {
      setSelectedField(fields.find((field) => field.id !== id)?.id || 0);
    }
  };

  const updateField = (id, key, value) => {
    setFields(
      fields.map((field) =>
        field.id === id ? { ...field, [key]: value } : field
      )
    );
  };

  const addPlan = () => {
    const newPlan = {
      id: nextPlanId,
      fieldId: selectedField,
      season: "spring",
      crop: "corn",
      startDate: "",
      endDate: "",
      notes: "",
    };
    setPlans([...plans, newPlan]);
    setNextPlanId(nextPlanId + 1);
  };

  const removePlan = (id) => {
    setPlans(plans.filter((plan) => plan.id !== id));
  };

  const updatePlan = (id, key, value) => {
    setPlans(
      plans.map((plan) => (plan.id === id ? { ...plan, [key]: value } : plan))
    );
  };

  const getCropColor = (cropValue) => {
    return (
      crops.find((crop) => crop.value === cropValue)?.color || "bg-gray-200"
    );
  };

  const findFieldName = (fieldId) => {
    return (
      fields.find((field) => field.id === fieldId)?.name || "Unknown Field"
    );
  };

  const getFieldPlans = () => {
    return plans.filter((plan) => plan.fieldId === selectedField);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md border border-green-200">
      <h2 className="text-2xl font-bold text-green-800 mb-6">Crop Planner</h2>

      <div className="flex mb-6 border-b border-gray-200">
        <button
          className={`py-2 px-4 ${
            activeTab === "fields"
              ? "border-b-2 border-green-500 text-green-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("fields")}
        >
          Fields
        </button>
        <button
          className={`py-2 px-4 ${
            activeTab === "plans"
              ? "border-b-2 border-green-500 text-green-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("plans")}
        >
          Planting Plans
        </button>
        <button
          className={`py-2 px-4 ${
            activeTab === "calendar"
              ? "border-b-2 border-green-500 text-green-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("calendar")}
        >
          Calendar View
        </button>
      </div>

      {activeTab === "fields" && (
        <div>
          <div className="mb-4 flex justify-end">
            <button
              onClick={addField}
              className="bg-green-600 text-white py-1 px-3 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 transition-colors"
            >
              Add Field
            </button>
          </div>

          <div className="space-y-4">
            {fields.map((field) => (
              <div
                key={field.id}
                className="p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center justify-between mb-3">
                  <input
                    type="text"
                    value={field.name}
                    onChange={(e) =>
                      updateField(field.id, "name", e.target.value)
                    }
                    className="font-medium text-lg border-b border-gray-300 focus:border-green-500 focus:outline-none"
                  />
                  <button
                    onClick={() => removeField(field.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>

                <div className="flex items-center">
                  <label className="mr-2 text-sm text-gray-600">Size:</label>
                  <input
                    type="number"
                    value={field.area}
                    onChange={(e) =>
                      updateField(
                        field.id,
                        "area",
                        parseFloat(e.target.value) || 0
                      )
                    }
                    className="w-20 p-1 border border-gray-300 rounded-md mr-2"
                    min="0.1"
                    step="0.1"
                  />
                  <select
                    value={field.unit}
                    onChange={(e) =>
                      updateField(field.id, "unit", e.target.value)
                    }
                    className="p-1 border border-gray-300 rounded-md"
                  >
                    <option value="hectares">Hectares</option>
                    <option value="acres">Acres</option>
                    <option value="sqm">Square Meters</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "plans" && (
        <div>
          <div className="mb-4 flex justify-between items-center">
            <select
              value={selectedField}
              onChange={(e) => setSelectedField(parseInt(e.target.value))}
              className="p-2 border border-gray-300 rounded-md"
            >
              {fields.map((field) => (
                <option key={field.id} value={field.id}>
                  {field.name}
                </option>
              ))}
            </select>

            <button
              onClick={addPlan}
              className="bg-green-600 text-white py-1 px-3 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 transition-colors"
            >
              Add Planting Plan
            </button>
          </div>

          <div className="space-y-4">
            {getFieldPlans().map((plan) => (
              <div
                key={plan.id}
                className="p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div
                      className={`w-4 h-4 rounded-full ${getCropColor(
                        plan.crop
                      )} mr-2`}
                    ></div>
                    <select
                      value={plan.crop}
                      onChange={(e) =>
                        updatePlan(plan.id, "crop", e.target.value)
                      }
                      className="font-medium text-lg border-b border-gray-300 focus:border-green-500 focus:outline-none mr-3"
                    >
                      {crops.map((crop) => (
                        <option key={crop.value} value={crop.value}>
                          {crop.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={() => removePlan(plan.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Season
                    </label>
                    <select
                      value={plan.season}
                      onChange={(e) =>
                        updatePlan(plan.id, "season", e.target.value)
                      }
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      {seasons.map((season) => (
                        <option key={season.value} value={season.value}>
                          {season.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={plan.startDate}
                        onChange={(e) =>
                          updatePlan(plan.id, "startDate", e.target.value)
                        }
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        End Date
                      </label>
                      <input
                        type="date"
                        value={plan.endDate}
                        onChange={(e) =>
                          updatePlan(plan.id, "endDate", e.target.value)
                        }
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Notes
                    </label>
                    <textarea
                      value={plan.notes}
                      onChange={(e) =>
                        updatePlan(plan.id, "notes", e.target.value)
                      }
                      className="w-full p-2 border border-gray-300 rounded-md resize-none"
                      rows="2"
                      placeholder="Additional notes about planting, care, etc."
                    ></textarea>
                  </div>
                </div>
              </div>
            ))}

            {getFieldPlans().length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No planting plans for this field yet. Click "Add Planting Plan"
                to create one.
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "calendar" && (
        <div>
          <div className="mb-4">
            <select
              value={selectedField}
              onChange={(e) => setSelectedField(parseInt(e.target.value))}
              className="p-2 border border-gray-300 rounded-md"
            >
              <option value={0}>All Fields</option>
              {fields.map((field) => (
                <option key={field.id} value={field.id}>
                  {field.name}
                </option>
              ))}
            </select>
          </div>

          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-100 p-3 border-b border-gray-200 font-medium">
              Calendar View
            </div>

            <div className="p-4">
              {plans
                .filter(
                  (plan) =>
                    selectedField === 0 || plan.fieldId === selectedField
                )
                .filter((plan) => plan.startDate && plan.endDate)
                .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
                .map((plan) => (
                  <div
                    key={plan.id}
                    className="mb-3 p-3 rounded-md border border-gray-200"
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-4 h-4 rounded-full ${getCropColor(
                          plan.crop
                        )} mr-2`}
                      ></div>
                      <div className="flex-1">
                        <div className="font-medium">
                          {crops.find((c) => c.value === plan.crop)?.label}
                          {selectedField === 0 &&
                            ` - ${findFieldName(plan.fieldId)}`}
                        </div>
                        <div className="text-sm text-gray-600">
                          {new Date(plan.startDate).toLocaleDateString()} -{" "}
                          {new Date(plan.endDate).toLocaleDateString()}
                          {plan.season !== "yearRound" &&
                            ` (${
                              seasons.find((s) => s.value === plan.season)
                                ?.label
                            })`}
                        </div>
                        {plan.notes && (
                          <div className="text-sm mt-1 italic">
                            {plan.notes}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

              {plans
                .filter(
                  (plan) =>
                    selectedField === 0 || plan.fieldId === selectedField
                )
                .filter((plan) => plan.startDate && plan.endDate).length ===
                0 && (
                <div className="text-center py-6 text-gray-500">
                  No scheduled plans with dates. Add start/end dates to your
                  planting plans to see them here.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
