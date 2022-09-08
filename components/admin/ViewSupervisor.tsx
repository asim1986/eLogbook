import BackBlurDrop from "../BackBlurDrop";
import ViewDetails from "../ViewDetails";

const ViewSupervisor = ({ show }: { show: boolean }) => {
  const labels = [
    { title: "Staffid", value: "FUL34EDF" },
    { title: "Email", value: "kayode@fulokoja.edu.ng" },
    { title: "Department", value: "Computer Science" },
    { title: "School", value: "Federal University Lokoja" },
    { title: "Sex", value: "Female" },
  ];

  return (
    <>
      <BackBlurDrop show={show} />
      <ViewDetails
        show={show}
        labels={labels}
        img={true}
        title={"Dr Oluwanjimi Kayode"}
      />
    </>
  );
};

export default ViewSupervisor;
