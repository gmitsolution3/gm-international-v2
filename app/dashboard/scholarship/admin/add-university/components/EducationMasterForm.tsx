"use client";

import { useForm, useFieldArray } from "react-hook-form";
import Swal from "sweetalert2";

type University = {
  name: string;
  location: string;
  admission_semester: { value: string }[];
  courses: { value: string }[];
  languages: { value: string }[];
  coverages: { value: string }[];
};

export type EducationMasterFormData = {
  country: string;
  universities: University[];
  isActive: boolean;
};

export default function EducationMasterForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EducationMasterFormData>({
    defaultValues: {
      country: "",
      universities: [
        {
          name: "",
          location: "",
          admission_semester: [{ value: "" }],
          courses: [{ value: "" }],
          languages: [{ value: "" }],
          coverages: [{ value: "" }],
        },
      ],

      isActive: true,
    },
  });

  const {
    fields: universityFields,
    append: addUniversity,
    remove: removeUniversity,
  } = useFieldArray({
    control,
    name: "universities",
  });

  const onSubmit = async (data: EducationMasterFormData) => {
    try {
      const addUniversityDetails = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/add-university`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await addUniversityDetails.json();

      if (!result) {
        Swal.fire({
          title: "University can't Added",
          icon: "error",
          draggable: false,
          showConfirmButton: false,
          timer: 2000,
        });
        return;
      }

      if (result.insertedId) {
        Swal.fire({
          title: "University Added successfully",
          icon: "success",
          draggable: false,
          showConfirmButton: false,
          timer: 2000,
        });
        reset();
      }
    } catch (error) {
      console.error("Error while adding package:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6"
    >
      {/* Country */}
      <div>
        <label className="block text-sm font-medium mb-1">Country</label>
        <input
          {...register("country", { required: "Country is required" })}
          className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-700"
          placeholder="Bangladesh"
        />
        {errors.country && (
          <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>
        )}
      </div>

      {/* Universities */}
      <div className="space-y-6">
        {universityFields.map((university, uIndex) => (
          <div
            key={university.id}
            className="rounded-lg border p-4 sm:p-5 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold">
                University {uIndex + 1}
              </h3>
              {universityFields.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeUniversity(uIndex)}
                  className="text-sm text-red-500"
                >
                  Remove
                </button>
              )}
            </div>

            {/* University Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  University Name
                </label>
                <input
                  {...register(`universities.${uIndex}.name`, {
                    required: "University name is required",
                  })}
                  className="w-full rounded-md border px-3 py-2 text-sm"
                  placeholder="University of Dhaka"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Location
                </label>
                <input
                  {...register(`universities.${uIndex}.location`, {
                    required: "Location is required",
                  })}
                  className="w-full rounded-md border px-3 py-2 text-sm"
                  placeholder="Dhaka"
                />
              </div>
            </div>

            {/* Courses */}
            <CoursesField
              control={control}
              register={register}
              universityIndex={uIndex}
              name="courses"
              label="Course"
            />
            <CoursesField
              control={control}
              register={register}
              universityIndex={uIndex}
              label="Admission Semester"
              name="admission_semester"
            />
            <CoursesField
              control={control}
              register={register}
              universityIndex={uIndex}
              name="languages"
              label="Language"
            />
            <CoursesField
              control={control}
              register={register}
              universityIndex={uIndex}
              name="coverages"
              label="Coverage"
            />
          </div>
        ))}
      </div>

      {/* Add University */}
      <button
        type="button"
        onClick={() =>
          addUniversity({
            name: "",
            location: "",
            courses: [{ value: "" }],
            admission_semester: [{ value: "" }],
            languages: [{ value: "" }],
            coverages: [{ value: "" }],
          })
        }
        className="text-sm font-medium text-red-600"
      >
        + Add Another University
      </button>

      {/* Submit */}
      <div className="pt-4">
        <button
          type="submit"
          className="w-full sm:w-auto rounded-md bg-red-700 px-6 py-2 text-white text-sm hover:bg-red-800"
        >
          Save Education Master
        </button>
      </div>
    </form>
  );
}

// function CoursesField({
//   control,
//   register,
//   universityIndex,
//   label,
// }: {
//   control: any;
//   register: any;
//   universityIndex: number;
//   label: string
// }) {
//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: `universities.${universityIndex}.${label}`,
//   });

//   return (
//     <div className="space-y-3">
//       <label className="block text-sm font-medium">{label}</label>

//       {fields.map((field, cIndex) => (
//         <div key={field.id} className="flex gap-2">
//           <input
//             {...register(
//               `universities.${universityIndex}.${label}.${cIndex}.value`,
//               { required: true }
//             )}
//             className="flex-1 rounded-md border px-3 py-2 text-sm"
//             placeholder="BSc in Computer Science & Engineering"
//           />

//           {fields.length > 1 && (
//             <button
//               type="button"
//               onClick={() => remove(cIndex)}
//               className="text-sm text-red-500"
//             >
//               ✕
//             </button>
//           )}
//         </div>
//       ))}

//       <button
//         type="button"
//         onClick={() => append({ value: "" })}
//         className="text-xs text-red-700"
//       >
//         {`+ ${label}`}
//       </button>
//     </div>
//   );
// }

function CoursesField({
  control,
  register,
  universityIndex,
  name,
  label,
}: {
  control: any;
  register: any;
  universityIndex: number;
  name: string;
  label: string;
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `universities.${universityIndex}.${name}`,
  });

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium">{label}</label>

      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-2">
          <input
            {...register(
              `universities.${universityIndex}.${name}.${index}.value`,
              { required: true }
            )}
            className="flex-1 rounded-md border px-3 py-2 text-sm"
          />

          {fields.length > 1 && (
            <button
              type="button"
              onClick={() => remove(index)}
              className="text-sm text-red-500"
            >
              ✕
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={() => append({ value: "" })}
        className="text-xs text-red-700"
      >
        {`+ ${label}`}
      </button>
    </div>
  );
}
