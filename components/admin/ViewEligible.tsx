import { IViewEligible } from "../../interfaces/comp.interface";
import BackBlurDrop from "../BackBlurDrop";
import ViewDetails from "../ViewDetails";

const ViewEligible = (props: IViewEligible) => {
  const { show, isAdmin = true, data, onDelCallback } = props;
  const labels = [
    { title: "Matric No", value: data?.matric },
    { title: "Supervisor", value: data?.supervisor },
    { title: "School", value: data?.institution },
    { title: "Department", value: data?.department },
    { title: "Level", value: data?.level },
    { title: "Date", value: data?.date },
  ];

  return (
    <>
      <BackBlurDrop show={show} style={true} isAdmin={isAdmin} />
      <ViewDetails
        id={data?.id}
        show={show}
        labels={labels}
        img={false}
        title={data?.matric}
        isAdmin={isAdmin}
        onDelCallback={onDelCallback}
      />
    </>
  );
};

export default ViewEligible;
