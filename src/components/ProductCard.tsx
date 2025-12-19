import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
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

type ProductCardProps = {
  product: Product;
  onAddToCart: (product: Product) => void;
  index?: number;
  showVolume?: boolean;
  size?: 'default' | 'large';
};

const ProductCard = ({ product, onAddToCart, index = 0, showVolume = false, size = 'default' }: ProductCardProps) => {
  return (
    <Card
      className="group border-0 shadow-none hover:shadow-lg transition-all duration-300 animate-scale-in"
      style={{ animationDelay: `${index * 50}ms` }}
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
            <Badge className={`absolute top-4 right-4 bg-destructive ${size === 'large' ? 'text-lg px-4 py-2' : ''}`}>
              -{product.discount}%
            </Badge>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-medium">Нет в наличии</span>
            </div>
          )}
        </div>
        <div className={size === 'large' ? 'p-8' : 'p-6'}>
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
            {product.brand}
          </p>
          <h4 className={`font-medium mb-2 ${size === 'large' ? 'text-2xl' : 'text-xl'}`}>{product.name}</h4>
          <p className={`text-sm text-muted-foreground ${size === 'large' ? 'mb-6' : 'mb-1'}`}>{product.description}</p>
          {showVolume && (
            <p className="text-xs text-muted-foreground mb-4">{product.volume}</p>
          )}
          <div className="flex items-center justify-between">
            <div>
              {product.discount ? (
                <div className="flex items-center gap-2">
                  <span className={`font-medium ${size === 'large' ? 'text-3xl' : 'text-2xl'}`}>
                    {(product.price * (1 - product.discount / 100)).toLocaleString('ru-RU')} ₽
                  </span>
                  <span className={`text-muted-foreground line-through ${size === 'large' ? 'text-lg' : 'text-sm'}`}>
                    {product.price.toLocaleString('ru-RU')} ₽
                  </span>
                </div>
              ) : (
                <span className={`font-medium ${size === 'large' ? 'text-3xl' : 'text-2xl'}`}>
                  {product.price.toLocaleString('ru-RU')} ₽
                </span>
              )}
            </div>
            <Button 
              onClick={() => onAddToCart(product)} 
              disabled={!product.inStock}
              size={size === 'large' ? 'lg' : 'default'}
            >
              {size === 'large' ? 'В корзину' : <Icon name="ShoppingBag" size={18} />}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
