import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import CatalogFilters from '@/components/CatalogFilters';

type Product = {
  id: number;
  name: string;
  brand: string;
  price: number;
  category: string;
  image: string;
  description: string;
  volume: string;
  inStock: boolean;
  isNew?: boolean;
  discount?: number;
};

const products: Product[] = [
  {
    id: 1,
    name: 'Eau de Parfum Essence',
    brand: 'LUMIÈRE',
    price: 8500,
    category: 'Парфюмерия',
    image: 'https://cdn.poehali.dev/projects/cad820ec-f1e6-4a32-8f3d-0cbccce390ad/files/685a1b05-20c1-4237-a9aa-f5be1e9d66f6.jpg',
    description: 'Изысканный аромат с нотами бергамота и жасмина',
    volume: '50 мл',
    inStock: true,
    isNew: true,
  },
  {
    id: 2,
    name: 'Rose Gold Cream',
    brand: 'BELLE VIE',
    price: 5200,
    category: 'Уход за лицом',
    image: 'https://cdn.poehali.dev/projects/cad820ec-f1e6-4a32-8f3d-0cbccce390ad/files/190984c1-52b7-4670-982d-bc9ca8dfafd0.jpg',
    description: 'Питательный крем для сияния кожи',
    volume: '30 мл',
    inStock: true,
    discount: 15,
  },
  {
    id: 3,
    name: 'Velvet Lipstick',
    brand: 'LUXE',
    price: 2800,
    category: 'Макияж',
    image: 'https://cdn.poehali.dev/projects/cad820ec-f1e6-4a32-8f3d-0cbccce390ad/files/399552aa-8d6c-44ba-9b7c-e0e98355e7c6.jpg',
    description: 'Бархатная помада с долгим эффектом',
    volume: '3.5 г',
    inStock: true,
  },
  {
    id: 4,
    name: 'Hydrating Serum',
    brand: 'BELLE VIE',
    price: 6800,
    category: 'Уход за лицом',
    image: 'https://cdn.poehali.dev/projects/cad820ec-f1e6-4a32-8f3d-0cbccce390ad/files/190984c1-52b7-4670-982d-bc9ca8dfafd0.jpg',
    description: 'Увлажняющая сыворотка с гиалуроновой кислотой',
    volume: '30 мл',
    inStock: true,
    isNew: true,
  },
  {
    id: 5,
    name: 'Midnight Perfume',
    brand: 'LUMIÈRE',
    price: 9200,
    category: 'Парфюмерия',
    image: 'https://cdn.poehali.dev/projects/cad820ec-f1e6-4a32-8f3d-0cbccce390ad/files/685a1b05-20c1-4237-a9aa-f5be1e9d66f6.jpg',
    description: 'Вечерний аромат с нотами амбры и ванили',
    volume: '75 мл',
    inStock: true,
    discount: 20,
  },
  {
    id: 6,
    name: 'Satin Blush',
    brand: 'LUXE',
    price: 2400,
    category: 'Макияж',
    image: 'https://cdn.poehali.dev/projects/cad820ec-f1e6-4a32-8f3d-0cbccce390ad/files/399552aa-8d6c-44ba-9b7c-e0e98355e7c6.jpg',
    description: 'Шелковистые румяна для естественного сияния',
    volume: '5 г',
    inStock: false,
  },
];

type CartItem = Product & { quantity: number };

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const categories = ['Парфюмерия', 'Уход за лицом', 'Макияж'];
  const brands = ['LUMIÈRE', 'BELLE VIE', 'LUXE'];

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    return categoryMatch && brandMatch && priceMatch;
  });

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const cartTotal = cart.reduce((sum, item) => {
    const price = item.discount ? item.price * (1 - item.discount / 100) : item.price;
    return sum + price * item.quantity;
  }, 0);

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange([0, 10000]);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        cart={cart}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        cartTotal={cartTotal}
        cartItemsCount={cartItemsCount}
      />

      <main className="pt-20">
        {activeSection === 'home' && (
          <>
            <section className="relative h-[80vh] flex items-center justify-center bg-gradient-to-br from-secondary via-white to-secondary/30">
              <div className="container mx-auto px-6 text-center animate-fade-in">
                <h2 className="text-6xl md:text-7xl lg:text-8xl font-light mb-6 tracking-tight">
                  Красота в деталях
                </h2>
                <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto font-light">
                  Откройте для себя мир премиальной косметики и парфюмерии
                </p>
                <Button size="lg" className="text-base px-8" onClick={() => setActiveSection('catalog')}>
                  Перейти в каталог
                </Button>
              </div>
            </section>

            <section className="py-24 bg-white">
              <div className="container mx-auto px-6">
                <h3 className="text-4xl md:text-5xl font-light text-center mb-16">Новинки</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {products
                    .filter(p => p.isNew)
                    .map((product, idx) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={addToCart}
                        index={idx}
                      />
                    ))}
                </div>
              </div>
            </section>
          </>
        )}

        {activeSection === 'catalog' && (
          <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
              <h2 className="text-5xl font-light mb-12 text-center">Каталог</h2>
              
              <div className="flex flex-col lg:flex-row gap-12">
                <CatalogFilters
                  categories={categories}
                  brands={brands}
                  selectedCategories={selectedCategories}
                  selectedBrands={selectedBrands}
                  priceRange={priceRange}
                  onToggleCategory={toggleCategory}
                  onToggleBrand={toggleBrand}
                  onPriceRangeChange={setPriceRange}
                  onResetFilters={resetFilters}
                />

                <div className="flex-1">
                  <div className="mb-6 text-sm text-muted-foreground">
                    Найдено товаров: {filteredProducts.length}
                  </div>
                  
                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {filteredProducts.map((product, idx) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={addToCart}
                        index={idx}
                        showVolume={true}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'about' && (
          <section className="py-24 bg-white">
            <div className="container mx-auto px-6 max-w-4xl">
              <h2 className="text-5xl font-light mb-12 text-center animate-fade-in">О бренде</h2>
              <div className="space-y-8 text-lg leading-relaxed text-muted-foreground animate-fade-in-up">
                <p>
                  <span className="text-4xl font-light text-foreground">ÉLÉGANCE</span> — это философия красоты, 
                  воплощенная в каждом продукте. Мы создаем косметику и парфюмерию для тех, кто ценит качество, 
                  изысканность и внимание к деталям.
                </p>
                <p>
                  Наша миссия — дарить уверенность и подчеркивать естественную красоту. Каждый продукт разрабатывается 
                  с использованием премиальных ингредиентов и передовых технологий, чтобы обеспечить максимальную 
                  эффективность и комфорт использования.
                </p>
                <p>
                  Мы сотрудничаем с ведущими европейскими лабораториями и тщательно отбираем каждый компонент. 
                  Элегантность упаковки отражает качество содержимого — минималистичный дизайн и роскошные материалы 
                  создают неповторимый опыт использования наших продуктов.
                </p>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'promo' && (
          <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
              <h2 className="text-5xl font-light mb-12 text-center animate-fade-in">Акции</h2>
              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {products
                  .filter(p => p.discount)
                  .map((product, idx) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={addToCart}
                      index={idx}
                      size="large"
                    />
                  ))}
              </div>
            </div>
          </section>
        )}

        {activeSection === 'contact' && (
          <section className="py-24 bg-white">
            <div className="container mx-auto px-6 max-w-2xl">
              <h2 className="text-5xl font-light mb-12 text-center animate-fade-in">Контакты</h2>
              <div className="space-y-8 animate-fade-in-up">
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-8 space-y-6">
                    <div className="flex items-start gap-4">
                      <Icon name="MapPin" size={24} className="text-primary mt-1" />
                      <div>
                        <h3 className="text-lg font-medium mb-2">Адрес</h3>
                        <p className="text-muted-foreground">
                          г. Москва, Кутузовский проспект, 48<br />
                          ТЦ "Времена года", 2 этаж
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Icon name="Phone" size={24} className="text-primary mt-1" />
                      <div>
                        <h3 className="text-lg font-medium mb-2">Телефон</h3>
                        <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Icon name="Mail" size={24} className="text-primary mt-1" />
                      <div>
                        <h3 className="text-lg font-medium mb-2">Email</h3>
                        <p className="text-muted-foreground">info@elegance-beauty.ru</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Icon name="Clock" size={24} className="text-primary mt-1" />
                      <div>
                        <h3 className="text-lg font-medium mb-2">Режим работы</h3>
                        <p className="text-muted-foreground">
                          Ежедневно с 10:00 до 22:00
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="bg-secondary/30 py-12 mt-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <img src="https://cdn.poehali.dev/files/лого.png" alt="ÉLÉGANCE" className="h-10" />
            <p className="text-sm text-muted-foreground">
              © 2024 ÉLÉGANCE. Все права защищены.
            </p>
            <div className="flex gap-6">
              <Button variant="ghost" size="icon">
                <Icon name="Instagram" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Facebook" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Mail" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;