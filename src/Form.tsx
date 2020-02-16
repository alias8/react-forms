import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import {FormErrors} from "./FormErrors";

const MINIMUM_YEAR = new Date().getFullYear() - 18;
const TODAY = new Date();
const MINIMUM_BIRTHDAY = TODAY.setFullYear(MINIMUM_YEAR);

interface IState {
    name: string;
    gender: string;
    dob: Date | null;
    contact: {
        mobile: string;
        work: string;
        home: string;
    };
    guardian: {
        name: string;
        contact: string;
        consent: boolean;
    };
    formErrors: {};
    formValid: boolean;
    nameValid: boolean;
    dateValid: boolean;
}

interface IProps {
    formSchema: {
        name?: boolean;
        dob?: boolean;
        gender?: boolean;
        contact?: boolean;
        guardian?: boolean;
    };
}

export class Form extends React.Component<IProps, IState> {
    state = {
        name: "",
        gender: "undefined",
        dob: new Date(),
        contact: {
            mobile: "",
            work: "",
            home: ""
        },
        guardian: {
            name: "",
            contact: "",
            consent: true
        },
        formErrors: {
            name: "",
            date: ""
        },
        formValid: false,
        nameValid: false,
        dateValid: false
    };

    handleSubmit = (event: any) => {
        event.preventDefault();
        const returnedObj: any = {};
        Object.keys(this.props.formSchema).forEach(key => {
            if((this.state as any)[key]) {
                returnedObj[key] = (this.state as any)[key];
            }

        });
        return returnedObj;
    };

    validateField(fieldName: string, value: any) {
        let fieldValidationErrors = this.state.formErrors;
        let nameValid = this.state.nameValid;
        let dateValid = this.state.dateValid;

        switch(fieldName) {
            case "name":
                nameValid = /\w+ \w+/i.test(value);
                fieldValidationErrors.name = nameValid ? "": "is invalid";
                break;
            case "date":
                dateValid = value.valueOf() < MINIMUM_BIRTHDAY;
                fieldValidationErrors.date = dateValid ? "" : "is not old enough";
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            nameValid,
            dateValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.nameValid && this.state.dateValid});
    }

    render() {
        const {formSchema} = this.props;
        const {guardian, formErrors} = this.state;
        return (
            <form onSubmit={this.handleSubmit} className={"container"}>
                {formSchema.name && (
                    <label className={"children"}>
                        Name:
                        <input type="text" value={this.state.name} onChange={(event) => {
                            const value = event.target.value;
                            this.setState({name: value}, () => {
                                this.validateField("name", value)
                            });
                        }}/>
                    </label>
                )}
                {formSchema.dob && (
                    <label className={"children"}>
                        Date of birth:
                        <DatePicker
                            selected={this.state.dob}
                            onChange={(date) => {
                                this.setState({dob: date}, () => {
                                    this.validateField("date", date)
                                });
                            }}
                            dateFormat="MMMM d, yyyy"
                        />
                    </label>
                )}
                {formSchema.gender && (
                    <label className={"children"}>
                        Gender:
                        <select value={this.state.gender} onChange={(event) => {
                            this.setState({gender: event.target.value});
                        }}>
                            <option value="M">M</option>
                            <option value="F">F</option>
                            <option value="undefined">Rather not say</option>
                        </select>
                    </label>
                )}
                {formSchema.contact && (
                    <div className={"children"}>
                        <label>
                            Contact Mobile:
                            <input type="text" value={this.state.contact.mobile} onChange={(event) => {
                                const value = event.target.value;
                                this.setState((prevState) => ({
                                    ...prevState,
                                    contact: {
                                        ...prevState.contact,
                                        mobile: value
                                    }
                                }));
                            }}/>
                        </label>
                        <label>
                            Contact Work:
                            <input type="text" value={this.state.contact.work} onChange={(event) => {
                                const value = event.target.value;
                                this.setState((prevState) => ({
                                    ...prevState,
                                    contact: {
                                        ...prevState.contact,
                                        work: value
                                    }
                                }));
                            }}/>
                        </label>
                        <label>
                            Contact Home:
                            <input type="text" value={this.state.contact.home} onChange={(event) => {
                                const value = event.target.value;
                                this.setState((prevState) => ({
                                    ...prevState,
                                    contact: {
                                        ...prevState.contact,
                                        home: value
                                    }
                                }));
                            }}/>
                        </label>
                    </div>

                )}
                {formSchema.guardian && (
                    <label className={"children"}>
                        Require Guardian consent:
                        <input type="checkbox" checked={this.state.guardian.consent} onChange={(event) => {
                            const checked = event.target.checked;
                            this.setState((prevState) => ({
                                ...prevState,
                                guardian: {
                                    ...prevState.guardian,
                                    consent: checked
                                }
                            }));
                        }}/>
                    </label>
                )}
                {guardian.consent && (
                    <div className={"children"}>
                        <label>
                            Guardian Name:
                            <input type="text" value={this.state.guardian.name} onChange={(event) => {
                                this.setState((prevState) => ({
                                    ...prevState,
                                    guardian: {
                                        ...prevState.guardian,
                                        name: event.target.value
                                    }
                                }));
                            }}/>
                        </label>
                        <label>
                            Guardian Contact:
                            <input type="text" value={this.state.guardian.contact} onChange={(event) => {
                                this.setState((prevState) => ({
                                    ...prevState,
                                    guardian: {
                                        ...prevState.guardian,
                                        contact: event.target.value
                                    }
                                }));
                            }}/>
                        </label>
                    </div>
                )}
                <FormErrors formErrors={formErrors}/>
                <input type="submit" value="Submit" disabled={!this.state.formValid}/>
            </form>
        )
    }
}
