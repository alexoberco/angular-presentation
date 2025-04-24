// Coincide con co.edu.javeriana.arqui.model.Purchase.kt: id, productId, quantity, userEmail, timestamp 
export interface Purchase {
    id?: number;
    productId: number;
    quantity: number;
    userEmail: string;
    timestamp: string; // ISO instant
  }
  