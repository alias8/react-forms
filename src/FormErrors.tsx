import React from "react";

interface IProps {
    formErrors: {
        [name: string]: string;
    }
}
export const FormErrors = ({formErrors}: IProps) => {
    return <div className='formErrors'>
        {Object.keys(formErrors).map((fieldName, i) => {
            if (formErrors[fieldName].length > 0) {
                return (
                    <p key={i}>{fieldName} {formErrors[fieldName]}</p>
                )
            } else {
                return '';
            }
        })}
    </div>;
};
