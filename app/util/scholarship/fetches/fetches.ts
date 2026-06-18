const getScholarshipPkg = async () => {
  const data = await fetch(
    `${process.env.NEXT_EXPRESS_BASE_URL}/scholarship-package/api/v1/get-home/scholarship-pkg`,
    {
      cache: "no-cache",
    },
  );
  return await data.json();
};

const getFilterData = async () => {
  const fData = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/scholarship-package/api/v1/get-scholarship-filtered`,
  );
  return await fData.json();
};


const getAllScholarshipPkg = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/scholarship-package/api/v1/get/available-pkg`,
  );
  return await response.json();
};

const ScholarshipFetch = {
  getScholarshipPkg,
  getFilterData,
  getAllScholarshipPkg,
};
export default ScholarshipFetch