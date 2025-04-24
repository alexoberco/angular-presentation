// Coincide con co.edu.javeriana.arqui.model.Product.kt: id, name, stock, status 
export interface Product {
    id?: number;
    name: string;
    stock: number;
    status: 'available' | 'out_of_stock';
  }
  