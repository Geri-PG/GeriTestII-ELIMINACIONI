import React, {useEffect, useState} from "react";
import classes from './FormInput.module.css';

export default function FormInput({ value, title, placeholder, validationErrors, onChange }) {
    const [inputValue, setInputValue] = useState('');

    const handleValueChange = (event) => {
        const newValue = event.target.value;
        setInputValue(newValue);
        onChange(newValue);
    };

    useEffect(() => {
        if (value) {
            setInputValue(value);
        }
    }, []);


    return (
        <div className={classes["form-group"]}>
            <label htmlFor={title.toLowerCase()}>{title}</label>
            <input
                type="text"
                name={title.toLowerCase()}
                value={inputValue}
                onChange={handleValueChange}
                placeholder={placeholder}
                className={validationErrors.length > 0 ? classes['error-input'] : ''}
            />
            {validationErrors ?
                <p className={classes['error-message']}>
                    {validationErrors[0]}
                </p>
                : null}
        </div>
    );
}
