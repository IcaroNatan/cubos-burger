import styles from "./cart.module.css";
import { ProductInCart } from "../../components/ProductInCart";
import { useLoaderData } from "react-router-dom";
import { IProductInCart } from "../../interfaces/productCart.interface";
import { ChangeEvent, useEffect, useState } from "react";
import { formatPrice } from "../../utils/formatPrice";
import { makeRequest } from "../../utils/makeRequest";

export function Cart(): JSX.Element {
  const productsInCartInitial = useLoaderData() as IProductInCart[];
  const [productsInCart, setProductsInCart] = useState<IProductInCart[]>(
    productsInCartInitial
  );
  const [total, setTotal] = useState<string>("R$ 0");

  const calcTotal = () => {
    const total = productsInCart.reduce(
      (acc: number, item: IProductInCart) =>
        (acc += item.quantity * item.price),
      0
    );

    setTotal(formatPrice(total));
  };

  const deleteProduct = async (productInCart: IProductInCart) => {
    const confirmDelete = confirm(
      "Tem certeza que deseja excluir este produto?"
    );
    if (!confirmDelete) return;

    await makeRequest(`/cart/${productInCart.id}`, "DELETE");
    const newProductsInCart = productsInCart.filter(
      (item) => item.id !== productInCart.id
    );
    setProductsInCart(newProductsInCart);
  };

  useEffect(() => {
    calcTotal();
  }, [productsInCart]);

  const updateQuantityInProductInCart = async (
    event: ChangeEvent<HTMLSelectElement>,
    productInCart: IProductInCart
  ) => {
    const valueQuantity = event.target.value;

    await makeRequest(`/cart/${productInCart.id}`, "PUT", {
      ...productInCart,
      quantity: Number(valueQuantity),
    });

    const newProductsInCart = productsInCart.filter((item) => {
      if (item.id === productInCart.id) {
        item.quantity = Number(valueQuantity);
      }
      return item;
    });

    setProductsInCart(newProductsInCart);

    calcTotal();
  };

  return (
    <main className="main__container container">
      <section className={styles.products}>
        <h1 className={styles.products__title}>Carrinho</h1>
        <div className={styles.products__body}>
          {productsInCart.map((item) => (
            <ProductInCart
              key={item.id}
              item={item}
              deleteProduct={deleteProduct}
              updateQuantityInProductInCart={updateQuantityInProductInCart}
            />
          ))}
        </div>
        <h1 className={styles.products__total}>Total: {total}</h1>
      </section>
    </main>
  );
}
