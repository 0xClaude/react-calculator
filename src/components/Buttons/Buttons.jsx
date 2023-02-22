import { useContext } from "react";
import Button from "./Button/Button";
import styles from "./Buttons.module.css";
import { Context } from "../../App";
import { create, all } from 'mathjs'

export default function Buttons() {

    const { result, setResult } = useContext(Context);


    const config = {}
    const math = create(all, config);

    const addInput = (input) => {
        if (result === 0 || result === "0") {
            setResult(String(input))
            return
        }
        if ((input === "+" || input === "-" || input === "*" || input === "/") &&
            (result.charAt(result.length - 1) === "+" || result.charAt(result.length - 1) === "-" || result.charAt(result.length - 1) === "*" || result.charAt(result.length - 1) === "/")) {
            return
        }
        setResult(previous => previous + String(input));
    }

    const reset = () => {
        setResult(0);
    }

    const calculate = () => {
        try {
            setResult(math.evaluate(result));
        } catch (error) {
            setResult("Error");
        }
    }

    return (
        <>
            <div className={styles.overview}>
                <div className={styles.row}>
                    <Button onClick={() => addInput(7)}>7</Button>
                    <Button onClick={() => addInput(8)}>8</Button>
                    <Button onClick={() => addInput(9)}>9</Button>
                    <Button onClick={() => addInput("+")}>+</Button>
                </div>
                <div className={styles.row}>
                    <Button onClick={() => addInput(4)}>4</Button>
                    <Button onClick={() => addInput(5)}>5</Button>
                    <Button onClick={() => addInput(6)}>6</Button>
                    <Button onClick={() => addInput("-")}>-</Button>
                </div>
                <div className={styles.row}>
                    <Button onClick={() => addInput(1)}>1</Button>
                    <Button onClick={() => addInput(2)}>2</Button>
                    <Button onClick={() => addInput(3)}>3</Button>
                    <Button onClick={() => addInput("*")}>*</Button>
                </div>
                <div className={styles.row}>
                    <Button onClick={() => addInput(0)}>0</Button>
                    <Button onClick={reset}>CE</Button>
                    <Button onClick={calculate}>=</Button>
                    <Button onClick={() => addInput("/")}>/</Button>
                </div>
            </div>
        </>
    );
};