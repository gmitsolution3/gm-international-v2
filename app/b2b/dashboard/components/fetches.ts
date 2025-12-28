export const getB2BScholarshipPackage = async()=>{
    const res = await fetch("https://gm-international-server-gamma.vercel.app/get-b2b-scholarship-package",{
        cache: "no-store"
    });

    if(!res.ok) throw new Error ("Data not found");

    return res.json();
}

export const getB2BTouristPackage = async()=>{
    const res = await fetch(
      "https://gm-international-server-gamma.vercel.app/get-b2b-tourist-package",{
        cache: "no-store"
      }
    );

    if (!res.ok) throw new Error("Data not found");

    return res.json();
}


export const getB2BDocumentCount = async()=>{
    const res = await fetch("https://gm-international-server-gamma.vercel.app/b2b-documents-count",{
        cache: "no-store"
    });

    if (!res.ok) throw new Error("Data not found");

    return res.json();
}