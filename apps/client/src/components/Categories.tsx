import CategoryItem from './CategoryItem';

export default function Categories() {
  const categories = ['wargame','fighting', 'adventure', 'economic', 'horror', 'puzzle', 'card_game', 'dice', 'fantasy', 'science_fiction', 'party_game', 'childrens_game']

  return (
    <div className="container px-4 py-5" id="icon-grid">
      <h2 className="pb-2 border-bottom">Top Categories</h2>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-5 py-5">
        {categories.map((name, i)=> (
          <CategoryItem key={i} category={name} />
        ))}
      </div>
    </div>
  );
}
