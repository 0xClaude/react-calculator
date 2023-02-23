import { all, create } from 'mathjs';
import React, { useCallback, useContext, useEffect } from "react";
import { Context } from "../../App";
import Button from "./Button/Button";
import styles from "./Buttons.module.css";

// Configuring the math module
const config = {}
const math = create(all, config);

// Helper constants
const operators = ["+", "-", "*", "/"];
const decimal = ["."];

// Define allowed keypresses
const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "+", "-", "*", "/"];

export default function Buttons() {

    const { result, setResult } = useContext(Context);

    // Handling (most) buttons
    const addInput = useCallback((input) => {
        // Handle decimals
        if (decimal.includes(input)) {
            // Add a zero at the beginning if needed
            if ((input.charAt(input.length - 1) === "0") || (operators.includes(result.charAt(result.length - 1)))) {
                setResult(previous => previous + "0.");
                return;
            }
            // Don't allow two decimal points
            if (decimal.includes(result.charAt(result.length - 1))) {
                return;
            }
        }

        // Don't allow two operators consecutively
        if (operators.includes(result.charAt(result.length - 1)) && (operators.includes(input) || decimal.includes(result.charAt(result.length - 1)))) {
            return;
        }

        // Handling the first number
        if (result.length === 1 && result.charAt(0) === "0") {
            setResult(input);
            return;
        }

        // Handle the rest numbers
        setResult(previous => previous + String(input));
    }, [result, setResult]);

    // AC button
    const reset = () => {
        setResult("0");
    }

    // +/- button
    const plusminus = () => {
        setResult(previous => String(math.evaluate(`${previous} * -1`)));
    }

    // Handling % button
    const percentage = (perc) => {
        setResult(String(result / 100));
    }

    // Handling = button
    const calculate = useCallback(() => {
        try {
            setResult(String(math.evaluate(result)));
        } catch (error) {
            setResult("Error");
        }
    }, [result, setResult]);

    // Add EventListeners for keypresses
    useEffect(() => {
        const keyHandler = ({ key }) => {
            // Only allow certain keys
            if (numbers.includes(key)) {
                addInput(key);
            } else if (key === "Enter") {
                calculate();
            }
        }

        window.addEventListener("keydown", keyHandler);

        // Cleanup function
        return () => {
            window.removeEventListener("keydown", keyHandler);
        }
    }, [addInput, calculate]);

    return (
        <>
            <div className={styles.overview}>
                <div className={styles.row}>
                    <Button onClick={reset}>AC</Button>
                    <Button onClick={plusminus}>+/-</Button>
                    <Button onClick={percentage}>%</Button>
                    <Button onClick={() => addInput("/")}>÷</Button>
                </div>
                <div className={styles.row}>
                    <Button onClick={() => addInput("7")}>7</Button>
                    <Button onClick={() => addInput("8")}>8</Button>
                    <Button onClick={() => addInput("9")}>9</Button>
                    <Button onClick={() => addInput("*")}>X</Button>
                </div>
                <div className={styles.row}>
                    <Button onClick={() => addInput("4")}>4</Button>
                    <Button onClick={() => addInput("5")}>5</Button>
                    <Button onClick={() => addInput("6")}>6</Button>
                    <Button onClick={() => addInput("-")}>-</Button>
                </div>
                <div className={styles.row}>
                    <Button onClick={() => addInput("1")}>1</Button>
                    <Button onClick={() => addInput("2")}>2</Button>
                    <Button onClick={() => addInput("3")}>3</Button>
                    <Button onClick={() => addInput("+")}>+</Button>
                </div>
                <div className={styles.row}>
                    <Button onClick={() => addInput("0")}>0</Button>
                    <Button onClick={() => addInput(".")}>.</Button>
                    <Button onClick={calculate}>=</Button>
                    <Button onClick={() => window.location = "https://github.com/0xClaude/react-calculator"}>&lt;/&gt;</Button>
                </div>
            </div>
        </>
    );
};