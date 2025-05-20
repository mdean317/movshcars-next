import { ChangeEvent} from 'react';
import { allYears } from '../../../lib/staticData';
import { Category } from '../../../lib/types';
import { allCategories } from '../../../lib/staticData';

type YearAndCategoryProps = {

    year: number;
    category: Category;
    setYear: (year: number) => void;
    setCategory: (category: Category) => void;
};

export default function YearAndCatDropboxes({year, category, setYear, setCategory}: YearAndCategoryProps) {

    // Function to run on a change in the form data. 
    const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {

        const newCategoryID = parseInt(event.target.value);
        const newCategory = allCategories.find((category) => category.category_id === newCategoryID);
        if (newCategory) {
             setCategory(newCategory)
        }
       
    }

  return (
            <div className="flex gap-4">
                <select className="border-2 rounded-2xl p-1 border-gray-300 w-32"  name="year" id="year" required value={year} onChange={(e) => setYear(Number(e.target.value))}>
                            {allYears.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                </select>
               <select className="border-2 rounded-2xl p-1 border-gray-300 w-60" name="category" id="category" required value={category.category_id} onChange={handleCategoryChange}>
                            {allCategories.map((category) => (
                            <option key={category.category_id} value={category.category_id}>
                                {category.name}
                            </option>
                        ))}
                </select>
                
            </div>
  )
}