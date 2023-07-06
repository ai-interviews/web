type Props = {
  title: string;
  subtext: string;
};

export function TextField({ title, subtext}: Props) {
  return (
    <div className="card w-96 bg-primary text-primary-content">
      <div className="card-body">
       <h4 className="card-title">{title}</h4>
       <p>{subtext}</p>
      </div>
    </div> 
  );
}

