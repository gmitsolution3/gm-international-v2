import CreateInterProfileMain from "../Components/create/CreateInterProfileMain";
import { getAllBatches } from "../../batch/Components/batch/BatchContent";

const CreateInternProfileMainPage = async () => {
  const batches = await getAllBatches();

  return (
    <div className="min-h-screen bg-background">
      <CreateInterProfileMain batches={batches.data} />
    </div>
  );
};

export default CreateInternProfileMainPage;
