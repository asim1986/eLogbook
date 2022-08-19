import Link from "next/link";
import Head from "next/head";
import { Navbar } from "../../components/NavBar";
import styles from "../../styles/Blog.module.scss";

const BlogPost = () => {
  return (
    <>
      <Head>
        <title>E-LogBook | Blog</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className={styles.main}>
        <div className={styles.blogTitle}>
          <h1>BlogPostTitle</h1>
          <p>25th|August|2022</p>
        </div>
        <section className={styles.blogImg}>
          <img src="../images/image1.png" alt="blog Image" />
        </section>
        <section className={styles.blogContent}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod eius
            obcaecati magnam quia dolor veritatis et suscipit, error tempore
            libero aut vero deleniti molestias voluptas labore minus sunt!
            Perferendis, sint.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod eius
            obcaecati magnam quia dolor veritatis et suscipit, error tempore
            libero aut vero deleniti molestias voluptas labore minus sunt!
            Perferendis, sint.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod eius
            obcaecati magnam quia dolor veritatis et suscipit, error tempore
            libero aut vero deleniti molestias voluptas labore minus sunt!
            Perferendis, sint.
          </p>
        </section>
      </main>
    </>
  );
};

export default BlogPost;
