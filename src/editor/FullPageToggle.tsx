import {BiCollapseHorizontal, BiExpandHorizontal} from 'react-icons/bi';

const toggleWrapper = {
    cursor: 'pointer',
    background: 'none',
    border: 'none',
};

const FullPageToggle = (props: {
    isFullPage: boolean;
    onClick: () => void;
}) => {
    const {isFullPage, onClick} = props;

    return (
        <button
            onClick={onClick}
            style={toggleWrapper}
            aria-label={
                isFullPage
                    ? 'Full Width Mode'
                    : 'Full Page Mode'
            }
        >
            {
                isFullPage ? <BiExpandHorizontal size={"2em"}/> : <BiCollapseHorizontal size={"2em"}/>
            }
        </button>

    );
}
export default FullPageToggle;