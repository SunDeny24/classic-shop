//카테고리 카드리스트
//src/components/ui/CategoryCardList.jsx

import CategoryCard from './CategoryCard';

export default function CategoryCardList() {
    return (
        <div className="bg-white">
            <div className="p-5 grid grid-cols-2 md:grid-cols-4 gap-4">
                <CategoryCard /> <CategoryCard /> <CategoryCard /> <CategoryCard />
                <CategoryCard /> <CategoryCard /> <CategoryCard /> <CategoryCard />
            </div>
        </div>
    );
}
