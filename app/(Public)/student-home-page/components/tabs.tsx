import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";

export function TabsSection() {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
        <Tabs defaultValue="Courses" className="w-full">
         
          <TabsList className="mb-8 grid w-full grid-cols-3 gap-2 bg-[#CA23281A] p-2 md:flex md:flex-row md:justify-center md:gap-0 md:rounded-none">
            <TabsTrigger
              value="Courses"
              className="text-md md:text-lg w-full rounded-md md:w-auto md:flex-1"
            >
              Courses
            </TabsTrigger>
            <TabsTrigger
              value="Scholarships"
              className="text-md md:text-lg w-full rounded-md md:w-auto md:flex-1"
            >
              Scholarships
            </TabsTrigger>
            <TabsTrigger
              value="Universities"
              className="text-md md:text-lg w-full rounded-md md:w-auto md:flex-1"
            >
              Universities
            </TabsTrigger>
          </TabsList>

          {/* Courses Tab */}
          <TabsContent value="Courses" className="px-2">
            <div className="flex flex-col gap-4 md:flex-row md:gap-6 md:justify-between">
              {/* Course Subject */}
              <NativeSelect className="w-full md:w-1/3">
                <NativeSelectOption value="">
                  Enter Course Subject e.g. Law
                </NativeSelectOption>
                <NativeSelectOption value="health">
                  Health & Medicine
                </NativeSelectOption>
                <NativeSelectOption value="business">
                  Business
                </NativeSelectOption>
                <NativeSelectOption value="engineering">
                  Engineering
                </NativeSelectOption>
                <NativeSelectOption value="language">
                  Language & Culture
                </NativeSelectOption>
                <NativeSelectOption value="it">
                  Computing & IT
                </NativeSelectOption>
                <NativeSelectOption value="education">
                  Teaching & Education
                </NativeSelectOption>
                <NativeSelectOption value="economics">
                  Economics
                </NativeSelectOption>
                <NativeSelectOption value="art">
                  Art & Design
                </NativeSelectOption>
              </NativeSelect>

              
              <NativeSelect className="w-full md:w-1/3">
                <NativeSelectOption value="">
                  Select Study Level
                </NativeSelectOption>
                <NativeSelectOption value="undergraduate">
                  Undergraduate
                </NativeSelectOption>
                <NativeSelectOption value="postgraduate">
                  Postgraduate
                </NativeSelectOption>
                <NativeSelectOption value="phd">PhD</NativeSelectOption>
               
              </NativeSelect>

              
              <NativeSelect className="w-full md:w-1/3">
                <NativeSelectOption value="">
                  Select Study Destination
                </NativeSelectOption>
                <NativeSelectOption value="uk">
                  United Kingdom
                </NativeSelectOption>
                <NativeSelectOption value="usa">
                  United States
                </NativeSelectOption>
                <NativeSelectOption value="canada">Canada</NativeSelectOption>
                <NativeSelectOption value="australia">
                  Australia
                </NativeSelectOption>
               
              </NativeSelect>
            </div>
          </TabsContent>

  
          <TabsContent value="Scholarships" className="px-2">
            <div className="flex flex-col gap-4 md:flex-row md:gap-6 md:justify-center">
             
              <NativeSelect className="w-full md:w-1/2">
                <NativeSelectOption value="">
                  Select Study Level
                </NativeSelectOption>
              </NativeSelect>

              {/* Study Destination */}
              <NativeSelect className="w-full md:w-1/2">
                <NativeSelectOption value="">
                  Select Study Destination
                </NativeSelectOption>
                {/* অপশন */}
              </NativeSelect>
            </div>
          </TabsContent>

          <TabsContent value="Universities" className="px-2">
            <div className="flex flex-col gap-4 md:flex-row md:gap-6 md:justify-center">
              {/* University Name */}
              <NativeSelect className="w-full md:w-1/2">
                <NativeSelectOption value="">
                  Search By University Name
                </NativeSelectOption>
               
              </NativeSelect>

         
              <NativeSelect className="w-full md:w-1/2">
                <NativeSelectOption value="">
                  Select Study Destination
                </NativeSelectOption>
          
              </NativeSelect>
            </div>
          </TabsContent>

          
          <div className="mt-8 flex justify-center">
            <button
              // onClick={handleSearch}
              className="bg-red-500 px-8 py-3 text-lg font-bold text-white rounded-xl hover:bg-red-600 hover:scale-105 transition-all duration-300 shadow-md"
            >
              Search
            </button>
          </div>
        </Tabs>
      </div>
    </div>
  );
}