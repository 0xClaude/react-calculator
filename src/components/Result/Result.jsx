import styles from "./Result.module.css";
import { useContext } from "react";

import { Context } from "../../App";

export default function Result() {

    const { result } = useContext(Context);

    return (
        <>
            <div className={styles.result}>{result}</div>
        </>
    );
};