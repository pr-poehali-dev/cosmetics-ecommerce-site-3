import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';

type CatalogFiltersProps = {
  categories: string[];
  brands: string[];
  selectedCategories: string[];
  selectedBrands: string[];
  priceRange: number[];
  onToggleCategory: (category: string) => void;
  onToggleBrand: (brand: string) => void;
  onPriceRangeChange: (range: number[]) => void;
  onResetFilters: () => void;
};

const CatalogFilters = ({
  categories,
  brands,
  selectedCategories,
  selectedBrands,
  priceRange,
  onToggleCategory,
  onToggleBrand,
  onPriceRangeChange,
  onResetFilters,
}: CatalogFiltersProps) => {
  return (
    <aside className="lg:w-64 space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Категории</h3>
        <div className="space-y-3">
          {categories.map(category => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`cat-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => onToggleCategory(category)}
              />
              <label htmlFor={`cat-${category}`} className="text-sm cursor-pointer">
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Бренды</h3>
        <div className="space-y-3">
          {brands.map(brand => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={() => onToggleBrand(brand)}
              />
              <label htmlFor={`brand-${brand}`} className="text-sm cursor-pointer">
                {brand}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Цена</h3>
        <div className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={onPriceRangeChange}
            max={10000}
            step={500}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{priceRange[0].toLocaleString('ru-RU')} ₽</span>
            <span>{priceRange[1].toLocaleString('ru-RU')} ₽</span>
          </div>
        </div>
      </div>

      <Button variant="outline" className="w-full" onClick={onResetFilters}>
        Сбросить фильтры
      </Button>
    </aside>
  );
};

export default CatalogFilters;
