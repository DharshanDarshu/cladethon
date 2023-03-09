type Props = {
  image: string;
};

function Pick({ image }: Props) {
  return (
    <div className='hover:scale-105 transition-all duration-300 ease-out cursor-pointer'>
      <img
        src={image}
        alt=''
      />
    </div>
  );
}

export default Pick;
