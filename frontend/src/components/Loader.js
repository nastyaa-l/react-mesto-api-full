function Loader (props){
    return (
      <div className={props.isLoading ? "spinner" : ""}>
      </div>
    )}

export default Loader;

