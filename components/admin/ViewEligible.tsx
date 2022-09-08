import BackBlurDrop from "../BackBlurDrop";
import ViewDetails from "../ViewDetails";

const ViewEligible = ({ show }: { show: boolean }) => {
  const labels = [
    { title: "Matric No", value: "SCI17CSC031" },
    { title: "Supervisor", value: "Dr Kayode Olawunyi" },
    { title: "School", value: "Federal University Lokoja" },
    { title: "Department", value: "Computer Science" },
    { title: "Level", value: "400" },
  ];

  return (
    <>
      <BackBlurDrop show={show} />
      <ViewDetails
        show={show}
        labels={labels}
        img={false}
        title={"Malik Abdulrahim"}
      />
    </>
  );
};

export default ViewEligible;
