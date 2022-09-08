import BackBlurDrop from "../BackBlurDrop";
import ViewDetails from "../ViewDetails";

const ViewCoordinator = ({ show }: { show: boolean }) => {
  const labels = [
    { title: "Staffid", value: "FUL34EDF" },
    { title: "Email", value: "malik@fulokoja.edu.ng" },
    { title: "Department", value: "Computer Science" },
    { title: "School", value: "Federal University Lokoja" },
    { title: "Sex", value: "Male" },
  ];

  return (
    <>
      <BackBlurDrop show={show} />
      <ViewDetails
        show={show}
        labels={labels}
        img={true}
        title={"Malik Abdulrahim"}
      />
    </>
  );
};

export default ViewCoordinator;
