import { Link } from "react-router-dom";
import { capitalizeFirstLetter, replaceCharacter } from "../helpers/string-helper";
import { CategoryItemInterface } from "../interfaces/components";
import useSearchStore from "../searchStore";

export default function CategoryItem({ category }: CategoryItemInterface) {
    const {
        handleSearchCategory,
        handleSearchText,
        handleSortBy,
        handleSortOrder,
    } = useSearchStore();

    const handleClick = (name: string) => {
        handleSearchCategory('category');
        handleSearchText(name);
        handleSortBy('id');
        handleSortOrder('ASC');
    };

    return (
        <Link
            to={`/boardgames?category=${category}`}
            className="text-decoration-none text-dark"
            onClick={() => handleClick(category)}
        >
            <div className="col d-flex flex-column align-items-center">
                <img src={`/${category}.svg`} alt={category} width={100} height={100}/>
                <h3 className="fs-4 pt-2">{capitalizeFirstLetter(replaceCharacter(category, '_', ' '))}</h3>
            </div>
        </Link>
    )
}