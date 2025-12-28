export const getAllScholarshipDocumnetCount = async()=>{
    const documents = await fetch("https://gm-international-server-gamma.vercel.app/get-all-scholarship-document",{
        cache: "no-store"
    })

    if(!documents) throw new Error("Data not found in db");

    return documents.json();
}