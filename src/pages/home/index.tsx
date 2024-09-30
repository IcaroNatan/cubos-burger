import { useLoaderData } from "react-router-dom";
import { Product } from "../../components/Product";
import styles from "./home.module.css";
import { IProduct } from "../../interfaces/product.interface";

export function Home(): JSX.Element {
  const productsList = useLoaderData() as IProduct[];
  const hamburguer = productsList.filter(
    (item) => item.category === "hamburguer"
  );
  const drinks = productsList.filter((item) => item.category === "bebidas");

  return (
    <main className="main__container container">
      <section className={styles.products}>
        <h1 className={styles.products__title}>Hamburguer</h1>
        <div className={styles.products__body}>
          {hamburguer.map((item) => (
            <Product key={item.id} item={item} />
          ))}
        </div>
      </section>
      <hr className={styles.space} />
      <section className={styles.products}>
        <h1 className={styles.products__title}>Bebidas</h1>
        <div className={styles.products__body}>
          {drinks.map((item) => (
            <Product key={item.id} item={item} />
          ))}
        </div>
      </section>
    </main>
  );
}
