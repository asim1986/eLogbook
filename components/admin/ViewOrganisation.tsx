import BackBlurDrop from "../BackBlurDrop";
import ViewDetails from "../ViewDetails";

const ViewOrganisation = ({ show }: { show: boolean }) => {
  const labels = [
    { title: "Industry Name", value: "nHub Foundation, Jos" },
    { title: "Industry Type", value: "Information Technology" },
    { title: "Employers", value: "12" },
    { title: "Email", value: "solade@nhub.com" },
    { title: "Phone", value: "+2349034278913" },
    { title: "Address", value: "Along Old Airport Road, Jos, Plateau State" },
  ];

  return (
    <>
      <BackBlurDrop show={show} />
      <ViewDetails
        show={show}
        labels={labels}
        img={true}
        title={"nHub Foundation, Jos"}
      />
    </>
  );
};

export default ViewOrganisation;
