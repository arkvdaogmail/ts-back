"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./Home.module.sass";

const HomePage = () => {
    return (
        <div className={styles.outer}>
            <Header />
            <div className={styles.container}>
                <h1>Welcome to Our App</h1>
                <div className={styles.links}>
                    <a href="/pay" className={styles.link}>Pay</a>
                    <a href="/review" className={styles.link}>Review</a>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default HomePage;
