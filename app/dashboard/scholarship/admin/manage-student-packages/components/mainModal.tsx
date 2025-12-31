"use client";

import type React from "react";

import { useEffect, useReducer, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SelectDropdown from "./selectDropDown";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { CheckCircle2Icon } from "lucide-react";
import Swal from "sweetalert2";
import { Checkbox } from "@/components/ui/checkbox";
import { EducationMasterFormData } from "../../add-university/components/EducationMasterForm";

interface Universities {
  all: string[];
  australia: string[];
  china: string[];
  malaysia: string[];
}

type Course = { value: string };

type University = {
  name: string;
  location: string;
  courses: Course[];
};

type EducationMaster = {
  _id: string;
  country: string;
  universities: University[];
  isActive: boolean;
};

interface countryOption {
  id: number;
  name: string;
}

interface ImgFormData {
  secure_url?: string;
}

const countryOptions: countryOption[] = [
  { id: 0, name: "All" },
  { id: 1, name: "Australia" },
  { id: 2, name: "China" },
  { id: 3, name: "Malaysia" },
  { id: 3, name: "Bangladesh" },
];

const UniversitiesProgram: string[] = [
  "Select Program",
  "Health & Medicine",
  "Business",
  "Engineering",
  "Language & Culture",
  "Computing & IT",
  "Teaching & Education",
  "Economics",
  "Art & Design",
];

const studyLevel: string[] = [
  "Select study level",
  "Doctorate",
  "Postgraduate",
  "Undergraduate",
  "Vocational (vet)",
  "Pre-Degree & Vocational",
  "Foundation",
  "School",
];

const duration: string[] = [
  "Select Duration",
  "2 year",
  "3 year",
  "4 year",
  "6 year",
  "8 year",
];

const language: string[] = ["English", "Bangla", "Chinese", "Malaya"];



const initialState = {
  selectedCountry: null,
  selectedUniversity: null,
  selectedCourse: null,

  filteredUniversities: [] as University[],
  filteredCourses: [] as string[],

  universityData: [] as EducationMaster[],
};



function reducer(state: any, action: any) {
  switch (action.type) {
    case "SET_UNIVERSITY_DATA":
      return { ...state, universityData: action.payload };

    case "SET_COUNTRY": {
      const countryData = state.universityData.find(
        (c: any) => c.country === action.payload
      );

      return {
        ...state,
        selectedCountry: action.payload,
        selectedUniversity: null,
        selectedCourse: null,
        filteredUniversities: countryData?.universities || [],
        filteredCourses: [],
      };
    }

    case "SET_UNIVERSITY": {
      const university = state.filteredUniversities.find(
        (u: any) => u.name === action.payload
      );

      return {
        ...state,
        selectedUniversity: action.payload,
        selectedCourse: null,
        filteredCourses: university
          ? university.courses.map((c: any) => c.value)
          : [],
      };
    }

    case "SET_PROGRAM":
      return { ...state, selectedCourse: action.payload };

    case "SET_STUDY_LEVEL":
      return { ...state, selectStudyLevel: action.payload };

    case "SET_DURATION":
      return { ...state, selectDuration: action.payload };
    case "SET_LANGUAGE":
      return { ...state, selectLanguage: action.payload };

    default:
      return state;
  }
}

type Inputs = {
  imgURL: string;
  packagePrice: string;
  universityUrl: string;
  deadlineDate: string;
  startingDate: string;
  tuitionFree: string;
  sl_No: string;
  scholarshipDetails: string;
  universitysDescription: string;
  courseName: string;
  applicationRequirement: string;
  idCard: string;
  b2bPrice: string;
  addForB2B: boolean;
  isInternationalStudent: boolean;
};

interface FunProps {
  onClose: () => void;
  universityData: EducationMasterFormData[];
}

function MainModal({ onClose, universityData }: FunProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [imgformData, setImgFormData] = useState<ImgFormData>({
    secure_url: "",
  });
  const [packageFormData, setPackageFormData] = useState<Inputs | null>();
  const [uploading, setUploading] = useState(false);
  // const [forB2BUser, setForB2BUser] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      addForB2B: false,
      isInternationalStudent: false,
    },
  });

  const forB2BUser = watch("addForB2B");
  const b2bPrice = watch("b2bPrice");
  const internationalStudent = watch("isInternationalStudent");

  const onSubmit: SubmitHandler<Inputs> | null = async (data) => {
    // setPackageFormData(data);

    const formData = {
      ...data,
      imgURL: imgformData.secure_url,
      selectedCountry,
      selectedUniversity,
      selectUniversitiesProgram :state.selectedCourse,
      selectStudyLevel,
      selectDuration,
      selectLanguage,
      createdAt: new Date(),
      forB2BUser: forB2BUser,
      B2BPrice: b2bPrice,
      isInternationalStudent: internationalStudent,
    };
    console.log(formData);
    try {
      const addPackage = await fetch(
        "https://gm-international-server-gamma.vercel.app/admin/scholarship-package-management",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await addPackage.json();

      if (!result) {
        Swal.fire({
          title: "Scholarship Package Added successfully",
          icon: "error",
          draggable: false,
          showConfirmButton: false,
          timer: 2000,
        });
        return;
      }

      if (result.insertedId) {
        Swal.fire({
          title: "Scholarship Package Added successfully",
          icon: "success",
          draggable: false,
          showConfirmButton: false,
          timer: 2000,
        });
        onClose();
        setPackageFormData(null);
      }
    } catch (error) {
      console.error("Error while adding package:", error);
    }
  };

  const {
    // formData,
    selectedCountry,
    selectedUniversity,
    filteredUniversities,
    selectUniversitiesProgram,
    selectStudyLevel,
    selectDuration,
    selectLanguage,
  } = state;

  const formData = {
    ...packageFormData,
    imgURL: imgformData.secure_url,
    selectedCountry,
    selectedUniversity,
    selectUniversitiesProgram,
    selectStudyLevel,
    selectDuration,
    selectLanguage,
  };

  useEffect(() => {
    fetch("/api/universities")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "SET_UNIVERSITIES", payload: data }))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (universityData?.length) {
      dispatch({
        type: "SET_UNIVERSITY_DATA",
        payload: universityData.filter((u) => u.isActive),
      });
    }
  }, [universityData]);

  const handleInputChange = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    // Cloudinary Upload
    setUploading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "pcakge_img_uploade");
    data.append("cloud_name", "dqyfwfeed");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dqyfwfeed/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const result = await res.json();

      if (!result.secure_url) {
        throw new Error("Image upload failed");
      }
      setImgFormData((prev) => ({
        ...prev,
        secure_url: result.secure_url,
      }));
      setUploading(false);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <div className="mx-auto max-w-4xl overflow-auto bg-white/40">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-red-600">Create package</h1>
        <p className="text-sm text-gray-600 mt-1">Fill in all information</p>
      </div>

      <Card className="p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* top row */}
          <div className="bg-[#F3F3F3] p-6 rounded-2xl">
            <h3 className="text-start mb-4">* Fill up to add packages</h3>

            <div className="grid gap-6 grid-cols-3">
              {/* fist row */}

              {/* select country */}
              <div className="space-y-2">
                {/* <DropDown /> */}
                <div>
                 
                  <SelectDropdown
                    label="Country"
                    options={state.universityData.map((c: any) => c.country)}
                    selected={state.selectedCountry}
                    onChange={(value) =>
                      dispatch({ type: "SET_COUNTRY", payload: value })
                    }
                  />
                </div>
              </div>

              {/* select university */}
              <div className="space-y-2">
                <SelectDropdown
                  label="University"
                  options={state.filteredUniversities.map((u: any) => u.name)}
                  selected={state.selectedUniversity}
                  onChange={(value) =>
                    dispatch({ type: "SET_UNIVERSITY", payload: value })
                  }
                />
              </div>

              {/* upload package img */}
              <div className="space-y-2">
                <Label htmlFor="imageUrl" className="text-sm font-medium">
                  Package Thumbnail & LOGO
                </Label>
                {uploading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-4 border-red-600"></div>
                    <span className="text-black">Loading...</span>
                  </div>
                ) : (
                  <div>
                    <Input
                      id="imageUrl"
                      name="imageUrl"
                      placeholder="upload package photo"
                      onChange={handleInputChange}
                      className="bg-white"
                      type="file"
                    />
                    <Label className="text-sm font-medium">
                      {imgformData.secure_url && (
                        <span className="text-green-500">
                          Image uploaded successfully
                        </span>
                      )}
                    </Label>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-[#F3F3F3] p-6 rounded-2xl">
            {/* second row */}
            <div className="grid gap-6 grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="packagePrice" className="text-sm font-medium">
                  Amount in BDT
                </Label>
                <Input
                  id="packagePrice"
                  placeholder="Amount"
                  // value={formData.packagePrice}
                  {...register("packagePrice", { required: true })}
                  className="bg-white"
                />
              </div>

              <div className="space-y-2">
                <SelectDropdown
                  label="*Program"
                  options={state.filteredCourses}
                  selected={state.selectedCourse}
                  onChange={(value) =>
                    dispatch({ type: "SET_PROGRAM", payload: value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="universityUrl" className="text-sm font-medium">
                  University web URL
                </Label>
                <Input
                  id="universityUrl"
                  placeholder="URL"
                  // onChange={handleInputChange}
                  className="bg-white"
                  {...register("universityUrl", { required: true })}
                />
              </div>
            </div>

            {/* third row */}
            <div className="grid gap-6 grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="deadlineDate" className="text-sm font-medium">
                  Deadline date
                </Label>
                <Input
                  id="deadlineDate"
                  placeholder=""
                  className="bg-white"
                  type="date"
                  {...register("deadlineDate", { required: true })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="startingDate" className="text-sm font-medium">
                  Starting Date
                </Label>
                <Input
                  id="startingDate"
                  placeholder=""
                  // onChange={handleInputChange}
                  className="bg-white"
                  type="date"
                  {...register("startingDate", { required: true })}
                />
              </div>
              <div className="space-y-2">
                <SelectDropdown
                  label="*Study level"
                  options={studyLevel}
                  selected={selectStudyLevel}
                  onChange={(value) =>
                    dispatch({ type: "SET_STUDY_LEVEL", payload: value })
                  }
                />
              </div>
            </div>

            {/* fourth row */}
            <div className="grid gap-6 grid-cols-3">
              <div className="space-y-2">
                <SelectDropdown
                  label="*Duration"
                  options={duration}
                  selected={selectDuration}
                  onChange={(value) =>
                    dispatch({ type: "SET_DURATION", payload: value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tuitionFree" className="text-sm font-medium">
                  Tuition Fees in BDT
                </Label>
                <Input
                  id="tuitionFree"
                  placeholder=""
                  // onChange={handleInputChange}
                  className="bg-white"
                  {...register("tuitionFree", { required: true })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sl_No" className="text-sm font-medium">
                  Sl. No.
                </Label>
                <Input
                  id="sl_No."
                  placeholder=""
                  // onChange={handleInputChange}
                  className="bg-white"
                  {...register("sl_No", { required: true })}
                />
              </div>
            </div>

            {/* five row */}
            <div className="flex justify-between gap-6 items-center">
              <div className="space-y-2 flex-1">
                <Label
                  htmlFor="scholarshipDetails"
                  className="text-sm font-medium"
                >
                  Scholarship Details
                </Label>
                <textarea
                  id="scholarshipDetails"
                  placeholder="Enter Scholarship Details here....."
                  // onChange={handleInputChange}
                  className="bg-white w-full rounded-lg px-3"
                  {...register("scholarshipDetails", { required: true })}
                />
              </div>
              <div className="space-y-2 max-w-61.25 w-full">
                <SelectDropdown
                  label="Technical language"
                  options={language}
                  selected={selectLanguage}
                  onChange={(value) =>
                    dispatch({ type: "SET_LANGUAGE", payload: value })
                  }
                />
              </div>
            </div>

            {/* six row */}
            <div className="flex justify-between gap-6 items-center">
              <div className="space-y-2 flex-1">
                <Label
                  htmlFor="universitysDescription"
                  className="text-sm font-medium"
                >
                  University description
                </Label>
                <textarea
                  id="universitysDescription"
                  placeholder="University Details here....."
                  className="bg-white w-full rounded-lg px-3"
                  {...register("universitysDescription", { required: true })}
                />
              </div>
              <div className="space-y-2 max-w-61.25 w-full">
                <Label htmlFor="courseName" className="text-sm font-medium">
                  Course name
                </Label>
                <Input
                  id="courseName"
                  placeholder=""
                  className="bg-white"
                  {...register("courseName", { required: true })}
                />
              </div>
            </div>
            <div className="flex justify-between gap-6 items-center">
              <div className="space-y-2 flex-1">
                <Label
                  htmlFor="applicationRequirement"
                  className="text-sm font-medium"
                >
                  Apply Requirements
                </Label>
                <textarea
                  id="applicationRequirement"
                  placeholder="University Details here....."
                  className="bg-white w-full rounded-lg px-3"
                  {...register("applicationRequirement", { required: true })}
                />
              </div>
              <div className="space-y-2 max-w-61.25 w-full">
                <Label htmlFor="idCard" className="text-sm font-medium">
                  ID Card
                </Label>
                <Input
                  id="idCard"
                  placeholder=""
                  className="bg-white"
                  {...register("idCard", { required: true })}
                />
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <Controller
                  name="addForB2B"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) => field.onChange(checked)}
                    />
                  )}
                />
                This package for b2b
              </label>
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <Controller
                  name="isInternationalStudent"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) => field.onChange(checked)}
                    />
                  )}
                />
                This package for International Student
              </label>
            </div>
            <div className="my-5 ">
              {forB2BUser && (
                <div className="space-y-2 max-w-61.25 w-full">
                  <Label htmlFor="b2bPrice">B2B Price</Label>
                  <Input
                    id="b2bPrice"
                    {...register("b2bPrice", { required: forB2BUser })}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-around pt-6">
            <div className="flex gap-3">
              <Button
                type="submit"
                className="bg-black hover:bg-black/80 text-white"
              >
                Add More +
              </Button>
            </div>
            <div>
              <Button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Clear Form
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default MainModal;
