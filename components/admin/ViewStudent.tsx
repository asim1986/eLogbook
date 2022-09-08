import BackBlurDrop from "../BackBlurDrop";
import ViewDetails from "../ViewDetails";

const ViewStudent = ({ show }: { show: boolean }) => {
  const labels = [
    { title: "Matric No", value: "SCI17CSC031" },
    { title: "Email", value: "incrediblechamp1@gmail.com" },
    {
      title: "Address",
      value: "Opp. New Government House, Rayfield Jos, Plateau State, Nigeria",
    },
    { title: "School", value: "Federal University Lokoja" },
    { title: "Department", value: "Computer Science" },
    { title: "Level", value: "400" },
    { title: "Sex", value: "Male" },
    { title: "Organisation", value: "nHub Foundation, Jos" },
  ];

  return (
    <>
      <BackBlurDrop show={show} />
      <ViewDetails
        show={show}
        labels={labels}
        img={true}
        title={"Vicolas Akoh"}
      />
    </>
  );
};

export default ViewStudent;
