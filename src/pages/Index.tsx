import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';

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
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">ÉLÉGANCE</h1>
            
            <nav className="hidden md:flex items-center gap-8">
              {['home', 'catalog', 'about', 'promo', 'contact'].map(section => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`text-sm uppercase tracking-wider transition-colors ${
                    activeSection === section ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {section === 'home' && 'Главная'}
                  {section === 'catalog' && 'Каталог'}
                  {section === 'about' && 'О бренде'}
                  {section === 'promo' && 'Акции'}
                  {section === 'contact' && 'Контакты'}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Icon name="Search" size={20} />
              </Button>
              
              <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Icon name="ShoppingBag" size={20} />
                    {cartItemsCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {cartItemsCount}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-lg">
                  <SheetHeader>
                    <SheetTitle className="text-2xl">Корзина</SheetTitle>
                  </SheetHeader>
                  
                  <div className="mt-8 flex flex-col gap-6">
                    {cart.length === 0 ? (
                      <p className="text-center text-muted-foreground py-12">Корзина пуста</p>
                    ) : (
                      <>
                        <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto">
                          {cart.map(item => (
                            <div key={item.id} className="flex gap-4 pb-4 border-b">
                              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                              <div className="flex-1">
                                <h4 className="font-medium">{item.name}</h4>
                                <p className="text-sm text-muted-foreground">{item.brand}</p>
                                <div className="flex items-center gap-2 mt-2">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-7 w-7"
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  >
                                    <Icon name="Minus" size={14} />
                                  </Button>
                                  <span className="w-8 text-center">{item.quantity}</span>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-7 w-7"
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  >
                                    <Icon name="Plus" size={14} />
                                  </Button>
                                </div>
                              </div>
                              <div className="flex flex-col items-end justify-between">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => removeFromCart(item.id)}
                                >
                                  <Icon name="X" size={16} />
                                </Button>
                                <p className="font-medium">
                                  {(item.discount
                                    ? item.price * (1 - item.discount / 100)
                                    : item.price
                                  ).toLocaleString('ru-RU')} ₽
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="border-t pt-4">
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-lg font-medium">Итого:</span>
                            <span className="text-2xl font-bold">{cartTotal.toLocaleString('ru-RU')} ₽</span>
                          </div>
                          <Button className="w-full" size="lg">
                            Оформить заказ
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

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
                      <Card
                        key={product.id}
                        className="group border-0 shadow-none hover:shadow-lg transition-all duration-300 animate-fade-in-up"
                        style={{ animationDelay: `${idx * 100}ms` }}
                      >
                        <CardContent className="p-0">
                          <div className="relative overflow-hidden bg-secondary/30 aspect-square">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            {product.isNew && (
                              <Badge className="absolute top-4 left-4 bg-primary">Новинка</Badge>
                            )}
                            {product.discount && (
                              <Badge className="absolute top-4 right-4 bg-destructive">-{product.discount}%</Badge>
                            )}
                          </div>
                          <div className="p-6">
                            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                              {product.brand}
                            </p>
                            <h4 className="text-xl font-medium mb-2">{product.name}</h4>
                            <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                            <div className="flex items-center justify-between">
                              <div>
                                {product.discount ? (
                                  <div className="flex items-center gap-2">
                                    <span className="text-2xl font-medium">
                                      {(product.price * (1 - product.discount / 100)).toLocaleString('ru-RU')} ₽
                                    </span>
                                    <span className="text-sm text-muted-foreground line-through">
                                      {product.price.toLocaleString('ru-RU')} ₽
                                    </span>
                                  </div>
                                ) : (
                                  <span className="text-2xl font-medium">{product.price.toLocaleString('ru-RU')} ₽</span>
                                )}
                              </div>
                              <Button onClick={() => addToCart(product)}>
                                <Icon name="ShoppingBag" size={18} />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
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
                <aside className="lg:w-64 space-y-8">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Категории</h3>
                    <div className="space-y-3">
                      {categories.map(category => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox
                            id={`cat-${category}`}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={() => toggleCategory(category)}
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
                            onCheckedChange={() => toggleBrand(brand)}
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
                        onValueChange={setPriceRange}
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

                  <Button variant="outline" className="w-full" onClick={resetFilters}>
                    Сбросить фильтры
                  </Button>
                </aside>

                <div className="flex-1">
                  <div className="mb-6 text-sm text-muted-foreground">
                    Найдено товаров: {filteredProducts.length}
                  </div>
                  
                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {filteredProducts.map((product, idx) => (
                      <Card
                        key={product.id}
                        className="group border-0 shadow-none hover:shadow-lg transition-all duration-300 animate-scale-in"
                        style={{ animationDelay: `${idx * 50}ms` }}
                      >
                        <CardContent className="p-0">
                          <div className="relative overflow-hidden bg-secondary/30 aspect-square">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            {product.isNew && (
                              <Badge className="absolute top-4 left-4 bg-primary">Новинка</Badge>
                            )}
                            {product.discount && (
                              <Badge className="absolute top-4 right-4 bg-destructive">-{product.discount}%</Badge>
                            )}
                            {!product.inStock && (
                              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <span className="text-white font-medium">Нет в наличии</span>
                              </div>
                            )}
                          </div>
                          <div className="p-6">
                            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                              {product.brand}
                            </p>
                            <h4 className="text-xl font-medium mb-2">{product.name}</h4>
                            <p className="text-sm text-muted-foreground mb-1">{product.description}</p>
                            <p className="text-xs text-muted-foreground mb-4">{product.volume}</p>
                            <div className="flex items-center justify-between">
                              <div>
                                {product.discount ? (
                                  <div className="flex items-center gap-2">
                                    <span className="text-2xl font-medium">
                                      {(product.price * (1 - product.discount / 100)).toLocaleString('ru-RU')} ₽
                                    </span>
                                    <span className="text-sm text-muted-foreground line-through">
                                      {product.price.toLocaleString('ru-RU')} ₽
                                    </span>
                                  </div>
                                ) : (
                                  <span className="text-2xl font-medium">{product.price.toLocaleString('ru-RU')} ₽</span>
                                )}
                              </div>
                              <Button onClick={() => addToCart(product)} disabled={!product.inStock}>
                                <Icon name="ShoppingBag" size={18} />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
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
                    <Card
                      key={product.id}
                      className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-scale-in"
                      style={{ animationDelay: `${idx * 100}ms` }}
                    >
                      <CardContent className="p-0">
                        <div className="relative overflow-hidden bg-secondary/30 aspect-square">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <Badge className="absolute top-4 right-4 bg-destructive text-lg px-4 py-2">
                            -{product.discount}%
                          </Badge>
                        </div>
                        <div className="p-8">
                          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                            {product.brand}
                          </p>
                          <h4 className="text-2xl font-medium mb-2">{product.name}</h4>
                          <p className="text-sm text-muted-foreground mb-6">{product.description}</p>
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="flex items-center gap-3">
                                <span className="text-3xl font-medium">
                                  {(product.price * (1 - product.discount! / 100)).toLocaleString('ru-RU')} ₽
                                </span>
                                <span className="text-lg text-muted-foreground line-through">
                                  {product.price.toLocaleString('ru-RU')} ₽
                                </span>
                              </div>
                            </div>
                            <Button size="lg" onClick={() => addToCart(product)}>
                              В корзину
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
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
            <h2 className="text-2xl font-bold tracking-tight">ÉLÉGANCE</h2>
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
