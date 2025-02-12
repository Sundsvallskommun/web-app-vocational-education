import ButtonStackedIcon from '@components/button/button-stacked-icon.component';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

export const LoadMoreBlock: React.FC<{
  loadMoreCallback: () => void;
  className?: string;
  backgroundClass?: string;
  loadMoreColorClass?: string;
}> = ({ loadMoreCallback, className, backgroundClass = 'bg-white', loadMoreColorClass }) => {
  const handleOnClick = () => {
    loadMoreCallback();
  };

  return (
    <div className={`${className} ${backgroundClass} load-more-block w-full flex justify-center relative -mt-[7.5rem]`}>
      <ButtonStackedIcon
        onClick={handleOnClick}
        icon={
          <div className="w-[50px] h-[50px] mb-sm rounded-half bg-blue flex justify-center items-center group-hover:shadow-md">
            <AddOutlinedIcon className="!text-[1.25em] text-white [&>svg]:stroke-1 stroke-blue" />
          </div>
        }
        className={`shadow-top-block ${loadMoreColorClass}`}
      >
        <span className="text-body">Ladda fler</span>
      </ButtonStackedIcon>
    </div>
  );
};

export default LoadMoreBlock;
