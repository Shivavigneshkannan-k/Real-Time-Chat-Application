

const SidePanel = ({comp}) => {
  return (
    <div className={`grid grid-cols-3 gap-5 m-4 h-[80%] w-1/2 ${comp==="signup"?"ml-auto":"mr-auto"}`}>
        <div className="skeleton h-32 w-32"></div>
        <div className="skeleton h-32 w-32"></div>
        <div className="skeleton h-32 w-32"></div>
        <div className="skeleton h-32 w-32"></div>

        <div className="skeleton h-32 w-32"></div>
        <div className="skeleton h-32 w-32"></div>
        <div className="skeleton h-32 w-32"></div>
        <div className="skeleton h-32 w-32"></div>
        <div className="skeleton h-32 w-32"></div>
    </div>
  );
};

export default SidePanel;
